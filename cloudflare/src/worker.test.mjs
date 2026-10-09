import assert from 'node:assert/strict';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import worker from './worker.mjs';
const schema=readFileSync(new URL('../schema.sql',import.meta.url),'utf8');
const origin='https://sandbox.example.test';
const tstamp=new Date();
function makeDB(){
 const db=new DatabaseSync(':memory:');db.exec(schema);
 return {
  prepare(sql){return {bind(...args){return {
   async first(){return db.prepare(sql).get(...args)||null},
   async all(){return {results:db.prepare(sql).all(...args)}},
   async run(){const r=db.prepare(sql).run(...args);return {meta:{changes:r.changes},success:true}}
  }}}},
  async batch(stmts){db.exec('BEGIN');try{const r=[];for(const s of stmts)r.push(await s.run());db.exec('COMMIT');return r;}catch(err){db.exec('ROLLBACK');throw err;}},
  _db:db
 };
}
const env=()=>({ENVIRONMENT:'sandbox',AI_PROVIDER:'mock',REAL_PARTICIPANT_COLLECTION_ENABLED:'false',DB:makeDB(),ACCESS_CODE_HMAC_SECRET:'TEST-only-pepper-should-be-at-least-32-chars',RESEARCHER_DEMO_TOKEN:'TEST-only-researcher-token-longer-than-32-chars'});
async function hit(e,path,{method='GET',data,cookie,admin,originHeader=origin}={}){
 const headers={};if(data!==undefined)headers['Content-Type']='application/json';if(originHeader)headers.Origin=originHeader;if(cookie)headers.Cookie=cookie;if(admin)headers.Authorization='Bearer '+e.RESEARCHER_DEMO_TOKEN;
 const r=await worker.fetch(new Request(origin+path,{method,headers,body:data===undefined?undefined:JSON.stringify(data)}),e);
 const result=await r.json();return {status:r.status,result,cookie:r.headers.get('Set-Cookie')?.split(';')[0]};
}
async function enroll(e){let r=await hit(e,'/api/admin/issue',{method:'POST',admin:true,data:{max_ai_calls:3}});assert.equal(r.status,201,JSON.stringify(r));const code=r.result; r=await hit(e,'/api/activate',{method:'POST',data:{participant_id:code.participant_id,access_code:code.access_code}});assert.equal(r.status,200,JSON.stringify(r));return {...code,cookie:r.cookie};}
const posted=(e,path,cookie,data)=>hit(e,path,{method:'POST',cookie,data});
const demoAnswers={
 A:{idea:'SYNTHETIC: card matching concept',mechanism:'SYNTHETIC: group card draws',vocabulary:'SYNTHETIC: recall and correction',priority:'SYNTHETIC: feedback'},
 B:{materials:'SYNTHETIC: paper',rules:'SYNTHETIC: timed cards',learning:'SYNTHETIC: recognition',ending:'SYNTHETIC: end after timer',rationale:'SYNTHETIC: novice friendly',word_count:650},
 C:{crit1_problem:'SYNTHETIC: unclear feedback',crit1_reason:'SYNTHETIC: errors persist',crit1_proposal:'SYNTHETIC: answer key',crit2_problem:'SYNTHETIC: timing',crit2_reason:'SYNTHETIC: class constraints',crit2_proposal:'SYNTHETIC: shorter rounds'},
 D:{materials:'SYNTHETIC: paper and answer keys',rules:'SYNTHETIC: timed cards',learning:'SYNTHETIC: recall and answer verification',ending:'SYNTHETIC: end after timer',rationale:'SYNTHETIC: better feedback',word_count:670},
 E:{crit1_handling:'SYNTHETIC: accepted',crit1_evidence:'SYNTHETIC: answer keys',crit2_handling:'SYNTHETIC: revised',crit2_evidence:'SYNTHETIC: shorter rounds',optional_third:false},
 F:{main_change:'SYNTHETIC: feedback',source:'SYNTHETIC: critique',rejected:'SYNTHETIC: none'}
};
test('status is always non-research and mock only',async()=>{const r=await hit(env(),'/api/status');assert.equal(r.status,200);assert.equal(r.result.research_ready,false);assert.equal(r.result.mock_only,true);});
test('fail closed without D1, secret, or wrong environment',async()=>{for(const mode of ['wrong_env','missing_db','live_ai','missing_pepper']){const e=env();if(mode==='wrong_env')e.ENVIRONMENT='production';if(mode==='missing_db')delete e.DB;if(mode==='live_ai')e.AI_PROVIDER='deepseek';if(mode==='missing_pepper')delete e.ACCESS_CODE_HMAC_SECRET;const r=await hit(e,'/api/admin/issue',{method:'POST',admin:true,data:{}});assert.equal(r.status,503,mode);}});
test('admin issue uses a secret and cannot be accessed anonymously',async()=>{const e=env();const bad=await hit(e,'/api/admin/issue',{method:'POST',data:{}});assert.equal(bad.status,401);const good=await hit(e,'/api/admin/issue',{method:'POST',admin:true,data:{}});assert.equal(good.status,201);assert.match(good.result.participant_id,/^SYNTHETIC_P/);assert.equal(good.result.access_code.length,48);});
test('synthetic invitation is one-time; other codes are rejected',async()=>{const e=env();const c=await enroll(e);const duplicate=await posted(e,'/api/activate',null,{participant_id:c.participant_id,access_code:c.access_code});assert.equal(duplicate.status,401);const bad=await posted(e,'/api/activate',null,{participant_id:c.participant_id,access_code:'WRONG-CODE'});assert.equal(bad.status,401);});
test('same-origin required for participant POST, cross-origin rejected',async()=>{const e=env();const r=await hit(e,'/api/activate',{method:'POST',data:{},originHeader:'https://attacker.invalid'});assert.equal(r.status,403);const r2=await hit(e,'/api/activate',{method:'POST',data:{},originHeader:null});assert.equal(r2.status,403);});
test('A-F mock run retains D1 state, enforces order, blocks premature AI, and exports blinded V2',async()=>{
 const e=env(),c=await enroll(e),cookie=c.cookie;
 let r=await hit(e,'/api/state',{cookie});assert.equal(r.result.stage,'A');assert.equal(r.result.consented,false);
 r=await posted(e,'/api/chat',cookie,{stage:'A',request_id:'mock-request-01',message:'SYNTHETIC: hello'});assert.equal(r.status,403);
 r=await posted(e,'/api/consent',cookie,{version:'SANDBOX-SYNTHETIC-ACK-v1',synthetic_ack:true});assert.equal(r.status,200);
 r=await posted(e,'/api/stage',cookie,{stage:'B',answers:demoAnswers.B});assert.equal(r.status,409);
 r=await posted(e,'/api/stage',cookie,{stage:'A',answers:{idea:'short'}});assert.equal(r.status,422);
 r=await posted(e,'/api/stage',cookie,{stage:'A',answers:demoAnswers.A});assert.equal(r.status,200);
 r=await posted(e,'/api/stage',cookie,{stage:'A',answers:demoAnswers.A});assert.equal(r.status,409);
 r=await posted(e,'/api/stage',cookie,{stage:'B',answers:demoAnswers.B});assert.equal(r.status,422,'B requires chat');
 r=await posted(e,'/api/chat',cookie,{stage:'B',request_id:'mock-request-01',message:'SYNTHETIC: make a game'});assert.equal(r.status,200);assert.match(r.result.reply,/MOCK RESPONSE/);
 const collision=await posted(e,'/api/chat',cookie,{stage:'B',request_id:'mock-request-01',message:'SYNTHETIC: change message'});assert.equal(collision.status,409);
 const replay=await posted(e,'/api/chat',cookie,{stage:'B',request_id:'mock-request-01',message:'SYNTHETIC: make a game'});assert.equal(replay.status,200);assert.equal(replay.result.replayed,true);
 r=await posted(e,'/api/stage',cookie,{stage:'B',answers:demoAnswers.B});assert.equal(r.status,200);
 r=await posted(e,'/api/chat',cookie,{stage:'C',request_id:'mock-request-02',message:'SYNTHETIC: outside B/D'});assert.equal(r.status,409);
 r=await posted(e,'/api/stage',cookie,{stage:'C',answers:demoAnswers.C});assert.equal(r.status,200);
 r=await posted(e,'/api/chat',cookie,{stage:'D',request_id:'mock-request-02',message:'SYNTHETIC: update feedback'});assert.equal(r.status,200);assert.equal(r.result.context_turn_count,2);
 r=await posted(e,'/api/stage',cookie,{stage:'D',answers:demoAnswers.D});assert.equal(r.status,200);
 r=await posted(e,'/api/stage',cookie,{stage:'E',answers:demoAnswers.E});assert.equal(r.status,200);
 r=await posted(e,'/api/stage',cookie,{stage:'F',answers:demoAnswers.F});assert.equal(r.status,200);assert.equal(r.result.next_stage,'done');
 r=await hit(e,'/api/state',{cookie});assert.equal(r.result.stage,'done');assert.equal(Object.keys(r.result.completed).length,6);assert.equal(r.result.turns.length,2);
 r=await hit(e,'/api/admin/packet',{admin:true});assert.equal(r.status,200);assert.equal(r.result.items.length,1);assert.deepEqual(Object.keys(r.result.items[0].v2),['materials','rules','learning','ending','rationale']);assert.doesNotMatch(JSON.stringify(r.result),/SYNTHETIC_P[0-9A-F]{12}/);
 r=await hit(e,'/api/admin/summary',{admin:true});assert.equal(r.result.items[0].status,'completed');
});
test('mock AI quota is enforced server-side',async()=>{const e=env(),c=await enroll(e);await posted(e,'/api/consent',c.cookie,{version:'SANDBOX-SYNTHETIC-ACK-v1',synthetic_ack:true});await posted(e,'/api/stage',c.cookie,{stage:'A',answers:demoAnswers.A});for(let i=0;i<3;i++){const r=await posted(e,'/api/chat',c.cookie,{stage:'B',request_id:'mockrequest'+i,message:'SYNTHETIC: query '+i});assert.equal(r.status,200);}const last=await posted(e,'/api/chat',c.cookie,{stage:'B',request_id:'mockrequest4',message:'SYNTHETIC: over quota'});assert.equal(last.status,429);});
test('revoked access blocks reuse and participant data access',async()=>{const e=env(),c=await enroll(e);const r=await hit(e,'/api/admin/revoke',{method:'POST',admin:true,data:{participant_id:c.participant_id}});assert.equal(r.status,200);assert.equal((await hit(e,'/api/state',{cookie:c.cookie})).status,401);});
test('unknown endpoints deny and do not expose admin or raw data',async()=>{const e=env();assert.equal((await hit(e,'/api/admin/packet')).status,401);assert.equal((await hit(e,'/api/raw')).status,401);});