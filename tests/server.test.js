'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {randomUUID}=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');
const PORT=17878;
const URL=`http://127.0.0.1:${PORT}`;
let child;
const fakeId=()=>`S-${randomUUID().replace(/-/g,'').slice(0,16).toUpperCase()}`;
const send=async(path,payload)=>{const r=await fetch(URL+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});return {status:r.status,data:await r.json()};};
test.before(async()=>{
 child=spawn(process.execPath,['server.js'],{cwd:path.resolve(__dirname,'..'),env:{...process.env,AI_PROVIDER:'mock',DEEPSEEK_API_KEY:'',PORT:String(PORT)},stdio:['ignore','pipe','pipe']});
 for(let i=0;i<35;i++){try{const r=await fetch(URL+'/api/status');if(r.ok)return;}catch{}await new Promise(resolve=>setTimeout(resolve,100));}throw Error('Test server did not start');
});
test.after(()=>{if(child)child.kill();});
test('status reports mock and no leaked API credentials',async()=>{
 const r=await fetch(URL+'/api/status');const d=await r.json();assert.equal(d.provider,'mock');assert.equal(d.live_api,false);assert.ok(!('api_key' in d));
});
test('rejects unregistered or invalid session IDs',async()=>{
 const r=await send('/api/session',{session_id:'../../.env'});assert.equal(r.status,400);
});
test('B then D reuse prior AI conversation and keep stage-specific transcripts',async()=>{
 const id=fakeId();let r=await send('/api/session',{session_id:id});assert.equal(r.status,200);
 const bPrompt='Please propose game rules with feedback';
 const req1=randomUUID();r=await send('/api/chat',{session_id:id,stage:'B',prompt:bPrompt,request_id:req1});assert.equal(r.status,200);assert.match(r.data.reply,/SYNTHETIC/);assert.match(r.data.transcript,/Please propose/);
 const repeated=await send('/api/chat',{session_id:id,stage:'B',prompt:bPrompt,request_id:req1});assert.equal(repeated.status,200);assert.equal(repeated.data.duplicate,true);
 r=await send('/api/chat',{session_id:id,stage:'D',prompt:'Revise the rules after feedback',request_id:randomUUID()});assert.equal(r.status,200);
 const hist=await fetch(URL+'/api/session/'+id).then(r=>r.json());assert.equal(hist.turns.length,4);assert.match(hist.transcripts.B,/propose game/);assert.doesNotMatch(hist.transcripts.B,/Revise the rules/);assert.match(hist.transcripts.D,/Revise the rules/);assert.equal(hist.events.filter(x=>x.type==='ai_success').length,2);
 const backwards=await send('/api/chat',{session_id:id,stage:'B',prompt:'go back',request_id:randomUUID()});assert.equal(backwards.status,409);
 assert.ok(fs.existsSync(path.join(__dirname,'..','runtime',id+'.json')));
});
test('rejects AI requests in protected non-AI phase C',async()=>{
 const id=fakeId();await send('/api/session',{session_id:id});const r=await send('/api/chat',{session_id:id,stage:'C',prompt:'help',request_id:randomUUID()});assert.equal(r.status,400);
});
test('rejects D without a previous B AI turn',async()=>{
 const id=fakeId();await send('/api/session',{session_id:id});const r=await send('/api/chat',{session_id:id,stage:'D',prompt:'help',request_id:randomUUID()});assert.equal(r.status,409);
});
test('serves participant page but blocks files outside static allowlist',async()=>{
 const home=await fetch(URL+'/');assert.equal(home.status,200);assert.match(await home.text(),/教育游戏共创/);
 const config=await fetch(URL+'/.env.example');assert.equal(config.status,404);
 const server=await fetch(URL+'/server.js');assert.equal(server.status,404);
});
test('blocks cross-origin POST calls',async()=>{
 const r=await fetch(URL+'/api/session',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:JSON.stringify({session_id:fakeId()})});assert.equal(r.status,403);
});
