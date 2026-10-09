(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.PCR_DEMO=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const PHASES=['A','B','C','D','E','F'];
const SCHEMA='pcr-offline-synthetic-demo-v1';
const REQUIRED={
A:['idea','mechanism','vocabulary','priority'],
B:['materials','rules','learning','ending','rationale'],
C:['crit1_problem','crit1_reason','crit1_proposal','crit2_problem','crit2_reason','crit2_proposal'],
D:['materials','rules','learning','ending','rationale'],
E:['crit1_handling','crit1_evidence','crit2_handling','crit2_evidence'],
F:['main_change','source','rejected']
};
const text=x=>typeof x==='string'&&x.trim().length>0;
const copy=x=>JSON.parse(JSON.stringify(x));
function fresh(){return{schema:SCHEMA,mode:'synthetic-only',next:1,people:{},active:null,packet:null,ratings:{},events:[]};}
function check(s){if(!s||s.schema!==SCHEMA||s.mode!=='synthetic-only')throw Error('仅支持虚构演示数据 / Synthetic demo only');return s;}
function issue(s,nonce){check(s);const id='SYNTHETIC_P'+String(s.next++).padStart(3,'0');const code='DEMO-'+String(nonce||'').replace(/[^a-zA-Z0-9]/g,'').slice(0,20);if(code.length<12)throw Error('Random demo code must be provided');s.people[id]={id,code,activated:false,confirmed:false,phaseIndex:0,completed:{},drafts:{},turns:[],used:0,maxCalls:10,createdAt:new Date().toISOString()};s.events.push({type:'issued',id});return{id,code};}
function activate(s,id,code){check(s);const p=s.people[id];if(!p||!text(code)||p.code!==code)throw Error('模拟编号或访问码错误 / Invalid demo code');if(p.phaseIndex===PHASES.length)throw Error('本案例已完成 / Session already complete');p.activated=true;s.active=id;return p;}
function active(s){check(s);const p=s.people[s.active];if(!p||!p.activated)throw Error('请先激活模拟编号 / Activate a demo ID');return p;}
function ack(s){const p=active(s);p.confirmed=true;return p;}
function validate(p,stage,answers){if(PHASES[p.phaseIndex]!==stage)throw Error('必须按 A–F 顺序提交 / Strict stage order');if(!p.confirmed)throw Error('请先确认虚构测试 / Confirm synthetic test');const missing=REQUIRED[stage].filter(k=>!text(answers?.[k]));if(missing.length)throw Error('缺少必填项 / Missing: '+missing.join(', '));
if(stage==='C'){const optional=['crit3_problem','crit3_reason','crit3_proposal'];if(optional.some(k=>text(answers[k]))&&!optional.every(k=>text(answers[k])))throw Error('第三条批评必须完整填写 / Complete optional critique');}
if(stage==='E'&&text(p.completed.C?.crit3_problem)&&(!text(answers.crit3_handling)||!text(answers.crit3_evidence)))throw Error('第三条批评也需要回应 / Respond to critique 3');
if(stage==='B'||stage==='D'){const n=Number(answers.word_count);if(!Number.isInteger(n)||n<600||n>800)throw Error('字数必须在 600–800 / Word count 600–800');}
return true;}
function submit(s,stage,answers){const p=active(s);validate(p,stage,answers);p.completed[stage]=copy(answers);delete p.drafts[stage];p.phaseIndex++;s.events.push({type:'stage_submitted',id:p.id,stage,at:new Date().toISOString()});return p;}
function chat(s,message){const p=active(s);const stage=PHASES[p.phaseIndex];if(!p.confirmed||!['B','D'].includes(stage))throw Error('只有 B/D 阶段可以使用模拟 AI / Mock AI only in B/D');if(!text(message))throw Error('请输入问题 / Enter a prompt');if(p.used>=p.maxCalls)throw Error('已达到模拟调用次数上限 / Mock quota exceeded');
const turn={stage,prompt:message.trim(),reply:'【模拟回复 / MOCK】可考虑明确任务目标、互动规则与反馈方式；请独立检查建议是否适合你的设计。 / Consider goals, mechanics and feedback; evaluate the suggestion independently.',at:new Date().toISOString(),provider:'mock',real_api:false};p.turns.push(turn);p.used++;s.events.push({type:'mock_ai_turn',id:p.id,stage});return turn;}
function buildPacket(s){check(s);const done=Object.values(s.people).filter(p=>p.phaseIndex===PHASES.length);if(!done.length)throw Error('还没有完成的模拟案例 / No completed synthetic case');const packet={schema:'pcr-synthetic-blinded-v1',mode:'synthetic-only',items:done.map((p,i)=>({reviewId:'R'+String(i+1).padStart(2,'0'),v2:copy(p.completed.D)}))};s.packet=packet;return packet;}
function score(s,judge,rid,values){check(s);if(!['J01','J02'].includes(judge))throw Error('评审编号限定 J01 / J02');if(!s.packet?.items.some(x=>x.reviewId===rid))throw Error('Unknown review ID');const keys=['global_innovation','originality','educational_usefulness','feasibility_task_fit'];for(const k of keys)if(!Number.isInteger(Number(values[k]))||Number(values[k])<1||Number(values[k])>5)throw Error('四个维度均需 1–5 分 / Four integer ratings required');s.ratings[judge]??={};s.ratings[judge][rid]=Object.fromEntries(keys.map(k=>[k,Number(values[k])]));return s.ratings[judge][rid];}
return{SCHEMA,PHASES,REQUIRED,fresh,check,issue,activate,active,ack,validate,submit,chat,buildPacket,score};
});
