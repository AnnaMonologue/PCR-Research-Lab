'use strict';
/** Local-only DeepSeek API relay for the PCR engineering demonstration. NOT internet-deployable. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {randomUUID} = require('node:crypto');

const ROOT = __dirname;
function loadDotEnv(file=path.join(ROOT,'.env')) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file,'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || Object.prototype.hasOwnProperty.call(process.env,match[1])) continue;
    let value=match[2];
    if ((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'")))value=value.slice(1,-1);
    process.env[match[1]]=value;
  }
}
loadDotEnv();
const PORT=Number(process.env.PORT||8787);
const HOST='127.0.0.1'; // never bind externally in prototype
const PROVIDER=(process.env.AI_PROVIDER||'mock').toLowerCase();
const MODEL=process.env.DEEPSEEK_MODEL||'deepseek-flash';
const API_BASE=(process.env.DEEPSEEK_BASE_URL||'https://api.deepseek.com').replace(/\/$/,'');
const KEY=process.env.DEEPSEEK_API_KEY||'';
const STORE=path.join(ROOT,'runtime');
const MAX_TURNS=60;
const MAX_PROMPT=8000;
const VALID_ID=/^S-[A-Z0-9]{12,28}$/;
const FILES=new Set(['participant.html','participant.js','core.js','styles.css','researcher.html','researcher.js','judge.html','judge.js']);
const ACTIVE=new Set();
if(!['mock','deepseek'].includes(PROVIDER))throw Error('AI_PROVIDER must be mock or deepseek');
if(PROVIDER==='deepseek'&&!KEY)throw Error('DEEPSEEK_API_KEY required with AI_PROVIDER=deepseek');
if(!Number.isInteger(PORT)||PORT<1||PORT>65535)throw Error('无效 PORT / Invalid PORT');

function respond(res,status,data){
 const body=JSON.stringify(data);
 res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(body),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 res.end(body);
}
function sessionPath(id){if(!VALID_ID.test(id))throw Object.assign(Error('无效会话编号 / Invalid session_id'),{status:400});return path.join(STORE,id+'.json');}
function readSession(id){const file=sessionPath(id);if(!fs.existsSync(file))throw Object.assign(Error('未知会话，请重新打开参与者页面 / Unknown session. Reopen the participant page.'),{status:404});return JSON.parse(fs.readFileSync(file,'utf8'));}
function saveSession(s){fs.mkdirSync(STORE,{recursive:true,mode:0o700});const file=sessionPath(s.session_id),tmp=file+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,JSON.stringify(s,null,2),{mode:0o600});fs.renameSync(tmp,file);}
function createSession(id){if(fs.existsSync(sessionPath(id)))return readSession(id);const s={schema:'pcr-ai-session-v1',session_id:id,created_at:new Date().toISOString(),provider:PROVIDER,model:MODEL,thinking:'disabled',turns:[],events:[]};saveSession(s);return s;}
function appendEvent(s,type,details={}){s.events.push({id:randomUUID(),at:new Date().toISOString(),type,details});}
function transcript(turns,stage){return turns.filter(t=>t.stage===stage).map(t=>`[${t.role.toUpperCase()} | ${t.at}]\n${t.content}`).join('\n\n');}
const SYSTEM_MESSAGE=`You are assisting with an educational game design task. The participant is creating a <=15 minute vocabulary game for 2-4 beginner Chinese university learners of 12 Malay words (makan, minum, buku, kelas, kawan, rumah, kedai, bas, pagi, malam, cepat, lambat). The game must have interaction, active retrieval or recognition, feedback, common materials costing no more than CNY 30 per group, and describe setup, gameplay, learning feedback, an ending and rationale. Respond to the participant's instructions. Do not claim to have measured learning. This is an instrument engineering demonstration; all interactions are logged.`;
async function callModel(messages){
 if(PROVIDER==='mock')return {content:'[SYNTHETIC MOCK RESPONSE — NOT DEEPSEEK] 请根据任务要求检查词汇覆盖、互动规则及及时反馈。此回应仅用于测试，不用于研究结论。',usage:{},model:'mock-pcr',finish_reason:'stop'};
 const ac=new AbortController();const timer=setTimeout(()=>ac.abort(),60000);
 try{
  const resp=await fetch(API_BASE+'/chat/completions',{method:'POST',signal:ac.signal,headers:{'Authorization':`Bearer ${KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:MODEL,messages,thinking:{type:'disabled'},stream:false,max_tokens:2048})});
  const body=await resp.text();let data;try{data=JSON.parse(body)}catch{throw Error('Provider returned non-JSON');}
  if(!resp.ok)throw Error('Provider HTTP '+resp.status+' ('+String(data.error?.message||'request failed').slice(0,160)+')');
  if(typeof data.choices?.[0]?.message?.content!=='string')throw Error('No text response from provider');
  return {content:data.choices[0].message.content,usage:data.usage||{},model:data.model||MODEL,finish_reason:data.choices[0].finish_reason||null};
 }finally{clearTimeout(timer);}
}
async function bodyJson(req){let bytes=0,parts=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>64000)throw Object.assign(Error('请求过大 / Request too large'),{status:413});parts.push(chunk);}let obj;try{obj=JSON.parse(Buffer.concat(parts).toString('utf8'))}catch{throw Object.assign(Error('无效 JSON / Invalid JSON'),{status:400})}if(!obj||typeof obj!=='object'||Array.isArray(obj))throw Object.assign(Error('需要 JSON 对象 / JSON object required'),{status:400});return obj;}
function sendFile(res,name){if(!FILES.has(name)){respond(res,404,{error:'文件不可访问 / File not available'});return;}const ext=path.extname(name);const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};const buf=fs.readFileSync(path.join(ROOT,name));res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Content-Length':buf.length,'X-Content-Type-Options':'nosniff','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; object-src 'none'; frame-ancestors 'none'"});res.end(buf);}
async function route(req,res){
 const target=new URL(req.url,'http://localhost');const url=target.pathname;
 if(req.headers.origin&&!['http://127.0.0.1:'+PORT,'http://localhost:'+PORT].includes(req.headers.origin))return respond(res,403,{error:'来源不允许 / Origin not allowed'});
 if(req.method==='GET'&&url==='/api/status')return respond(res,200,{provider:PROVIDER,model:PROVIDER==='mock'?'mock-pcr':MODEL,thinking:'disabled',ready:true,local_only:true,live_api:PROVIDER==='deepseek'});
 if(req.method==='POST'&&url==='/api/session'){
  const b=await bodyJson(req);const s=createSession(b.session_id);return respond(res,200,{session_id:s.session_id,turn_count:s.turns.length,provider:s.provider,model:s.model});
 }
 if(req.method==='GET'&&url.startsWith('/api/session/')){
  const id=url.slice('/api/session/'.length);const s=readSession(id);return respond(res,200,{session_id:s.session_id,turns:s.turns,events:s.events,provider:s.provider,model:s.model,transcripts:{B:transcript(s.turns,'B'),D:transcript(s.turns,'D')}});
 }
 if(req.method==='POST'&&url==='/api/chat'){
  const b=await bodyJson(req);const {session_id,stage,request_id}=b;const prompt=b.prompt;
  if(!VALID_ID.test(session_id||'')||!['B','D'].includes(stage)||typeof prompt!=='string'||!prompt.trim()||prompt.length>MAX_PROMPT||typeof request_id!=='string'||!/^[a-f0-9-]{36}$/.test(request_id))throw Object.assign(Error('无效消息、阶段或请求编号 / Invalid message, stage or request ID'),{status:400});
  if(ACTIVE.has(session_id))throw Object.assign(Error('该会话正在处理请求 / Session already processing a request'),{status:409});
  let s=readSession(session_id);
  if(s.model!==MODEL&&PROVIDER==='deepseek')throw Object.assign(Error('会话期间模型变更，请新建演示会话 / Server model changed during session. Start a new demo.'),{status:409});
  if(s.provider!==PROVIDER)throw Object.assign(Error('会话期间服务商发生变更 / Provider changed during session'),{status:409});
  const previous=s.events.find(x=>x.type==='ai_success'&&x.details.request_id===request_id);
  if(previous)return respond(res,200,{reply:previous.details.reply,transcript:transcript(s.turns,stage),model:previous.details.model,provider:PROVIDER,duplicate:true});
  if(s.turns.length>=MAX_TURNS)throw Object.assign(Error('达到会话消息上限 / Session message limit reached'),{status:429});
  if(stage==='B'&&s.turns.some(t=>t.stage==='D'))throw Object.assign(Error('D 开始后不能返回 B / Cannot return to stage B after D has begun'),{status:409});
  if(stage==='D'&&!s.turns.some(t=>t.stage==='B'))throw Object.assign(Error('D 前须完成 B 阶段 AI 对话 / Stage B AI dialogue required before stage D'),{status:409});
  ACTIVE.add(session_id);
  try{
   const messages=[{role:'system',content:SYSTEM_MESSAGE},...s.turns.map(t=>({role:t.role,content:t.content})),{role:'user',content:prompt.trim()}];
   const response=await callModel(messages);const at=new Date().toISOString();
   s.turns.push({role:'user',stage,content:prompt.trim(),at,request_id});s.turns.push({role:'assistant',stage,content:response.content,at:new Date().toISOString(),request_id,model:response.model,usage:response.usage,finish_reason:response.finish_reason});
   appendEvent(s,'ai_success',{request_id,stage,model:response.model,usage:response.usage,reply:response.content});saveSession(s);
   return respond(res,200,{reply:response.content,transcript:transcript(s.turns,stage),model:response.model,provider:PROVIDER,duplicate:false});
  }catch(err){appendEvent(s,'ai_error',{request_id,stage,error:String(err.message).slice(0,180)});saveSession(s);throw Object.assign(Error('AI 请求失败 / AI request failed: '+err.message),{status:502});}
  finally{ACTIVE.delete(session_id);}
 }
 if(req.method==='GET')return sendFile(res,url==='/'?'participant.html':decodeURIComponent(url.slice(1)));
 respond(res,404,{error:'未找到路由 / Route not found'});
}
const server=http.createServer((req,res)=>{route(req,res).catch(e=>respond(res,e.status||500,{error:e.message||'服务器异常 / Unexpected server error'}));});
if(require.main===module)server.listen(PORT,HOST,()=>console.log(`PCR local demo http://${HOST}:${PORT}/ — provider=${PROVIDER} model=${MODEL}`));
module.exports={server,transcript,VALID_ID,loadDotEnv};
