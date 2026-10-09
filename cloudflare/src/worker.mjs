/**
 * PCR Research Lab / PCR 人机共创研究工具
 * v0.3 Cloudflare D1 sandbox. Synthetic identities + mock AI ONLY.
 * THIS IS NOT a production research service, consent system, or API proxy.
 * v0.3 Cloudflare D1 沙盒：仅限虚构参与者和模拟 AI，严禁真实研究。
 */
const PHASES = ['A', 'B', 'C', 'D', 'E', 'F'];
const MAX_BODY_BYTES = 32_000;
const COOKIE_NAME = 'pcr_sandbox_session';
const CONSENT_VERSION = 'SANDBOX-SYNTHETIC-ACK-v1';
const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};
const now = () => new Date().toISOString();
const json = (data, status = 200, extraHeaders = {}) => new Response(JSON.stringify(data), {status, headers:{...JSON_HEADERS, ...extraHeaders}});
const fail = (status, code, zh, en) => json({ok:false, code, error:`${zh} / ${en}`}, status);
const id = (prefix, bytes = 12) => `${prefix}${hex(crypto.getRandomValues(new Uint8Array(bytes)))}`;
const hex = bytes => [...bytes].map(x => x.toString(16).padStart(2, '0')).join('');
const rand = (n = 32) => hex(crypto.getRandomValues(new Uint8Array(n)));
const sha = async value => hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))));
async function hmac(value, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name:'HMAC', hash:'SHA-256'}, false, ['sign']);
  return hex(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))));
}
function eq(a,b){ if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false; let v=0;for(let i=0;i<a.length;i++)v|=a.charCodeAt(i)^b.charCodeAt(i);return v===0; }
function safeOrigin(request){
  const origin=request.headers.get('Origin');
  if(origin && origin!==new URL(request.url).origin)return false;
  return request.headers.get('Sec-Fetch-Site')!=='cross-site';
}
async function body(request){
  if(!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))throw new Error('media');
  const raw=await request.text();if(raw.length>MAX_BODY_BYTES)throw new Error('size');
  const obj=JSON.parse(raw);if(!obj||typeof obj!=='object'||Array.isArray(obj))throw new Error('format');return obj;
}
const validText = (s,max=8_000)=>typeof s==='string'&&s.trim().length>0&&s.length<=max;
function validStage(phase, data){
  if(!data||typeof data!=='object'||Array.isArray(data)||JSON.stringify(data).length>20_000)return false;
  const all = (keys) => keys.every(k=>validText(data[k],6_000));
  if(phase==='A')return all(['idea','mechanism','vocabulary','priority']);
  if(phase==='B'||phase==='D')return all(['materials','rules','learning','ending','rationale'])&&data.word_count>=600&&data.word_count<=800&&Number.isInteger(data.word_count);
  if(phase==='C')return [1,2].every(n=>['problem','reason','proposal'].every(k=>validText(data[`crit${n}_${k}`],3000))) && (![3].some(n=>['problem','reason','proposal'].some(k=>data[`crit${n}_${k}`]))||['problem','reason','proposal'].every(k=>validText(data[`crit3_${k}`],3000)));
  if(phase==='E')return [1,2].every(n=>['handling','evidence'].every(k=>validText(data[`crit${n}_${k}`],3000)))&&(!data.optional_third||['handling','evidence'].every(k=>validText(data[`crit3_${k}`],3000)));
  if(phase==='F')return all(['main_change','source','rejected']);
  return false;
}
function cookie(request){return (request.headers.get('Cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE_NAME+'='))?.split('=')[1]||'';}
function setCookie(t){return `${COOKIE_NAME}=${t}; Path=/; Max-Age=14400; HttpOnly; Secure; SameSite=Strict`;}
function clearCookie(){return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;}
function dbOK(env){return env.DB&&typeof env.DB.prepare==='function';}
async function query(env, sql,...params){return env.DB.prepare(sql).bind(...params).first();}
async function exec(env,sql,...params){return env.DB.prepare(sql).bind(...params).run();}
async function authenticate(request,env){
  const raw=cookie(request);if(!/^[0-9a-f]{64}$/.test(raw))return null;
  const key=await sha(raw);const row=await query(env, `SELECT s.participant_id, e.status, e.max_ai_calls, e.used_ai_calls, r.current_stage, r.consented_at
    FROM participant_sessions s JOIN enrolments e ON e.participant_id=s.participant_id
    JOIN runs r ON r.participant_id=s.participant_id
    WHERE s.session_hash=? AND s.revoked_at IS NULL AND s.expires_at>? AND e.status IN ('active','completed')`,key,now());
  return row||null;
}
async function admin(request,env){
  const supplied=request.headers.get('Authorization')||'';
  if(!env.RESEARCHER_DEMO_TOKEN||env.RESEARCHER_DEMO_TOKEN.length<32) return false;
  return eq(supplied,`Bearer ${env.RESEARCHER_DEMO_TOKEN}`);
}
function anonymizeV2(payload){
  const fields=['materials','rules','learning','ending','rationale'];return Object.fromEntries(fields.map(k=>[k,payload[k]]));
}
function decodeJson(raw){try{return JSON.parse(raw);}catch{return null;}}
async function api(request,env){
  const path=new URL(request.url).pathname;
  if(path==='/api/status'&&request.method==='GET')return json({status:'sandbox',mock_only:true,live_collection:false,research_ready:false,version:'0.3.0'});
  // This is deliberately NEVER enabled for an actual research study.
  if(env.ENVIRONMENT!=='sandbox'||env.AI_PROVIDER!=='mock'||String(env.REAL_PARTICIPANT_COLLECTION_ENABLED)!=='false')return fail(503,'disabled','沙盒配置不安全','Sandbox config is not safe');
  if(!dbOK(env)||typeof env.ACCESS_CODE_HMAC_SECRET!=='string'||env.ACCESS_CODE_HMAC_SECRET.length<32)return fail(503,'config','沙盒数据库或密钥未配置','Sandbox bindings missing');
  if(!safeOrigin(request))return fail(403,'origin','跨来源请求被拒绝','Cross-origin request denied');
  if(request.method==='POST' && request.headers.get('Origin')!==new URL(request.url).origin && !path.startsWith('/api/admin/'))return fail(403,'origin_required','缺少同源请求来源','Same-origin POST required');
  if(path==='/api/admin/issue'&&request.method==='POST'){
    if(!await admin(request,env))return fail(401,'admin','研究者测试授权失败','Researcher demo authorization required');
    const data=await body(request);
    const max=Math.min(30,Math.max(1,Number.isInteger(data.max_ai_calls)?data.max_ai_calls:12));
    const pid=id('SYNTHETIC_P',6).toUpperCase(),code=rand(24),digest=await hmac(`${pid}:${code}`,env.ACCESS_CODE_HMAC_SECRET);
    const timestamp=now(),expire=new Date(Date.now()+24*3600_000).toISOString();
    await exec(env,'INSERT INTO enrolments(participant_id, access_code_hmac, status, issued_at, expires_at, max_ai_calls) VALUES(?,?,?,?,?,?)',pid,digest,'issued',timestamp,expire,max);
    return json({ok:true,participant_id:pid,access_code:code,expires_at:expire,max_ai_calls:max,warning:'SYNTHETIC DEMO ONLY / 仅限虚构测试'},201);
  }
  if(path==='/api/admin/summary'&&request.method==='GET'){
    if(!await admin(request,env))return fail(401,'admin','需要研究者测试授权','Researcher demo authorization required');
    const rows=await env.DB.prepare(`SELECT e.participant_id,e.status,e.used_ai_calls,e.max_ai_calls,r.current_stage
      FROM enrolments e LEFT JOIN runs r ON e.participant_id=r.participant_id ORDER BY e.issued_at DESC LIMIT 100`).bind().all();
    return json({ok:true,synthetic:true,items:rows.results||[]});
  }
  if(path==='/api/admin/revoke'&&request.method==='POST'){
    if(!await admin(request,env))return fail(401,'admin','需要研究者测试授权','Researcher demo authorization required');
    const d=await body(request);
    if(!/^SYNTHETIC_P[0-9A-F]{12}$/.test(d.participant_id||''))return fail(422,'participant','编号无效','Invalid synthetic participant');
    const r=await exec(env,"UPDATE enrolments SET status='revoked' WHERE participant_id=? AND status IN ('issued','active')",d.participant_id);
    await exec(env,"UPDATE participant_sessions SET revoked_at=? WHERE participant_id=? AND revoked_at IS NULL",now(),d.participant_id);
    return json({ok:true,revoked:r.meta?.changes===1});
  }
  if(path==='/api/admin/packet'&&request.method==='GET'){
    if(!await admin(request,env))return fail(401,'admin','需要研究者测试授权','Researcher demo authorization required');
    const r=await env.DB.prepare(`SELECT s.payload_json FROM stage_submissions s JOIN runs r ON r.participant_id=s.participant_id
      WHERE s.stage='D' AND r.status='completed' ORDER BY s.submitted_at`).bind().all();
    const items=[];
    for(const row of (r.results||[])){
      const d=decodeJson(row.payload_json);
      if(d)items.push({review_id:'R'+String(items.length+1).padStart(2,'0'),v2:anonymizeV2(d)});
    }
    return json({schema:'pcr-blinded-review-v1',synthetic:true,version:'0.3.0',packet_id:id('SYNTHETIC_PACKET_'),created_at:now(),
      task:'虚构马来语词汇游戏 / Synthetic Malay vocabulary game design',items});
  }
  if(path==='/api/activate'&&request.method==='POST'){
    const d=await body(request),pid=d.participant_id,code=d.access_code;
    if(typeof pid!=='string'||!/^SYNTHETIC_P[0-9A-F]{12}$/.test(pid)||!validText(code,100))return fail(400,'input','测试编号或访问码格式错误','Invalid synthetic ID/code');
    const digest=await hmac(`${pid}:${code}`,env.ACCESS_CODE_HMAC_SECRET);
    const timestamp=now();
    const updated=await exec(env,`UPDATE enrolments SET status='active', activated_at=? WHERE participant_id=? AND access_code_hmac=? AND status='issued' AND expires_at>?`,timestamp,pid,digest,timestamp);
    if(updated.meta?.changes!==1)return fail(401,'code','测试访问码无效、已使用或过期','Invalid/expired/used test code');
    const token=rand(32),hash=await sha(token),expires=new Date(Date.now()+4*3600_000).toISOString();
    await env.DB.batch([
      env.DB.prepare('INSERT INTO runs(participant_id,status,started_at) VALUES(?,?,?)').bind(pid,'pending',timestamp),
      env.DB.prepare('INSERT INTO participant_sessions(session_hash,participant_id,created_at,expires_at) VALUES(?,?,?,?)').bind(hash,pid,timestamp,expires)
    ]);
    return json({ok:true,participant_id:pid,stage:'A',synthetic:true},200,{'Set-Cookie':setCookie(token)});
  }
  const user=await authenticate(request,env);
  if(!user)return fail(401,'session','需要有效的测试会话','Valid synthetic session required');
  if(path==='/api/state'&&request.method==='GET'){
    const submissions=await env.DB.prepare('SELECT stage, payload_json FROM stage_submissions WHERE participant_id=? ORDER BY submitted_at').bind(user.participant_id).all();
    const turns=await env.DB.prepare("SELECT stage, request_id, user_text, assistant_text, model_id FROM ai_turns WHERE participant_id=? AND outcome='success' ORDER BY id").bind(user.participant_id).all();
    return json({ok:true,participant_id:user.participant_id,stage:user.current_stage,consented:!!user.consented_at,used_ai_calls:user.used_ai_calls,max_ai_calls:user.max_ai_calls,completed:Object.fromEntries((submissions.results||[]).map(r=>[r.stage,decodeJson(r.payload_json)])),turns:turns.results||[],synthetic:true});
  }
  if(path==='/api/consent'&&request.method==='POST'){
    const d=await body(request);
    if(d.version!==CONSENT_VERSION||d.synthetic_ack!==true)return fail(400,'ack','请确认仅使用虚构数据测试','Acknowledge synthetic-only testing');
    await exec(env,`UPDATE runs SET consent_version=?, consented_at=?, status='in_progress' WHERE participant_id=? AND status='pending'`,CONSENT_VERSION,now(),user.participant_id);
    return json({ok:true,note:'Synthetic-only acknowledgement, not human research consent / 仅为虚构测试确认'});
  }
  if(path==='/api/stage'&&request.method==='POST'){
    if(!user.consented_at)return fail(403,'ack','请先确认虚构测试','Synthetic acknowledgement required');
    const d=await body(request);
    if(!PHASES.includes(d.stage)||d.stage!==user.current_stage)return fail(409,'stage','阶段顺序不匹配','Stage order mismatch');
    if(!validStage(d.stage,d.answers))return fail(422,'answers','请填写完整且有效的阶段答案','Invalid required stage answers');
    if((d.stage==='B'||d.stage==='D')){
      const turns=await query(env,"SELECT COUNT(*) AS n FROM ai_turns WHERE participant_id=? AND stage=? AND outcome='success'",user.participant_id,d.stage);
      if(!turns?.n)return fail(422,'chat','请先完成该阶段的模拟 AI 对话','Mock AI dialogue required for this phase');
    }
    const next=PHASES[PHASES.indexOf(d.stage)+1]||'done',timestamp=now();
    // A conditional insert prevents replay and the update is part of the same D1 transaction.
    const res=await env.DB.batch([
      env.DB.prepare(`INSERT INTO stage_submissions(participant_id,stage,version,submitted_at,payload_json)
        SELECT participant_id, ?,1,?,? FROM runs WHERE participant_id=? AND current_stage=? AND status='in_progress'`)
        .bind(d.stage,timestamp,JSON.stringify(d.answers),user.participant_id,d.stage),
      env.DB.prepare(`UPDATE runs SET current_stage=?, status=CASE WHEN ?='done' THEN 'completed' ELSE status END,
        ended_at=CASE WHEN ?='done' THEN ? ELSE ended_at END WHERE participant_id=? AND current_stage=? AND status='in_progress'`)
        .bind(next,next,next,timestamp,user.participant_id,d.stage)
    ]);
    if(res[0].meta?.changes!==1||res[1].meta?.changes!==1)return fail(409,'concurrent','记录可能已提交，请刷新进度','Possible concurrent submission; refresh');
    if(next==='done')await exec(env,"UPDATE enrolments SET status='completed' WHERE participant_id=?",user.participant_id);
    return json({ok:true,submitted:d.stage,next_stage:next});
  }
  if(path==='/api/chat'&&request.method==='POST'){
    if(!user.consented_at)return fail(403,'ack','请先确认虚构测试','Synthetic acknowledgement required');
    const d=await body(request);
    if(!['B','D'].includes(d.stage)||d.stage!==user.current_stage)return fail(409,'stage','只有 B、D 阶段允许 AI','AI permitted only in current B/D');
    if(!/^[A-Za-z0-9_-]{8,64}$/.test(d.request_id||'')||!validText(d.message,4000))return fail(422,'chat_input','请求编号或文本无效','Invalid request ID/message');
    const existing=await query(env,'SELECT outcome,assistant_text,model_id,user_text FROM ai_turns WHERE participant_id=? AND request_id=?',user.participant_id,d.request_id);
    if(existing && existing.user_text!==d.message)return fail(409,'idempotency_collision','同一请求编号的内容不能改变','Request ID cannot be reused with different text');
    if(existing)return existing.outcome==='success'?json({ok:true,reply:existing.assistant_text,model:existing.model_id,replayed:true}):fail(409,'pending','请求已处理或待完成','Request already processed/pending');
    const timestamp=now();
    const ins=await exec(env,`INSERT OR IGNORE INTO ai_turns(participant_id,stage,request_id,user_text,requested_at,outcome)
       VALUES(?,?,?,?,?,'reserved')`,user.participant_id,d.stage,d.request_id,d.message,timestamp);
    if(ins.meta?.changes!==1)return fail(409,'duplicate','重复提交','Duplicate request');
    const reserved=await exec(env,`UPDATE enrolments SET used_ai_calls=used_ai_calls+1 WHERE participant_id=? AND status='active' AND used_ai_calls<max_ai_calls`,user.participant_id);
    if(reserved.meta?.changes!==1){await exec(env,"UPDATE ai_turns SET outcome='failed', completed_at=? WHERE participant_id=? AND request_id=?",now(),user.participant_id,d.request_id);return fail(429,'quota','模拟 AI 调用额度已用完','Mock AI quota exceeded');}
    const transcript=await env.DB.prepare("SELECT user_text FROM ai_turns WHERE participant_id=? AND outcome='success' ORDER BY id").bind(user.participant_id).all();
    const prior=(transcript.results||[]).length;
    const mock=`【模拟回复 / MOCK RESPONSE】这是虚构的第 ${prior+1} 轮回应。请自行判断并修改设计；此文本不来自 DeepSeek。 / Fictional turn ${prior+1}. Evaluate and refine your design independently. No provider request was made.`;
    await exec(env,"UPDATE ai_turns SET assistant_text=?, model_id='mock-pcr-v0.3', completed_at=?, outcome='success' WHERE participant_id=? AND request_id=?",mock,now(),user.participant_id,d.request_id);
    return json({ok:true,reply:mock,model:'mock-pcr-v0.3',replayed:false,context_turn_count:prior+1});
  }
  if(path==='/api/withdraw'&&request.method==='POST'){
    await env.DB.batch([
      env.DB.prepare("UPDATE enrolments SET status='withdrawn' WHERE participant_id=? AND status='active'").bind(user.participant_id),
      env.DB.prepare("UPDATE runs SET status='withdrawn' WHERE participant_id=?").bind(user.participant_id),
      env.DB.prepare("UPDATE participant_sessions SET revoked_at=? WHERE participant_id=? AND revoked_at IS NULL").bind(now(),user.participant_id)
    ]);
    return json({ok:true,note:'Sandbox access revoked. Records retained for synthetic QA / 测试会话已撤销'},200,{'Set-Cookie':clearCookie()});
  }
  return fail(404,'not_found','接口不存在','Endpoint not found');
}
export default {
  async fetch(request,env={}){
    const path=new URL(request.url).pathname;
    try{
      if(path.startsWith('/api/'))return await api(request,env);
      if(env.ENVIRONMENT==='sandbox'&&env.ASSETS?.fetch)return env.ASSETS.fetch(request);
      return fail(503,'no_assets','沙盒页面未配置','Sandbox assets not configured');
    }catch(e){
      if(['media','size','format','SyntaxError'].includes(e.message)||e instanceof SyntaxError)return fail(400,'json','无效 JSON 或请求过大','Invalid or oversized JSON request');
      // Deliberately do not expose database or operational exception details.
      return fail(503,'internal','沙盒服务暂时不可用','Sandbox temporarily unavailable');
    }
  }
};