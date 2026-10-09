/* PCR Research Lab v0.4 — synthetic-only offline research prototype. / 仅限虚构离线研究演示。 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.PCR_DEMO=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const SCHEMA='pcr-offline-synthetic-demo-v2',PHASES=['A','B','C','D','E','F'];
const DESIGN=['materials','rules','learning','ending','rationale'];
const REQUIRED={A:['idea','mechanism','vocabulary','priority'],B:DESIGN,C:['crit1_problem','crit1_reason','crit1_proposal','crit2_problem','crit2_reason','crit2_proposal'],D:DESIGN,E:['crit1_handling','crit1_evidence','crit2_handling','crit2_evidence'],F:['main_change','source','rejected']};
const DIMENSIONS=['global_innovation','originality','educational_usefulness','feasibility_task_fit'];
const HANDLING=['implemented_as_proposed','implemented_differently','reasoned_not_adopted','unaddressed','unclear'];
const has=x=>typeof x==='string'&&x.trim().length>0;
const clone=x=>JSON.parse(JSON.stringify(x));
function countText(x){return ((String(x??'')).match(/\p{Script=Han}|[A-Za-z0-9]+/gu)||[]).length;}
function countDesign(data){return DESIGN.reduce((n,k)=>n+countText(data?.[k]||''),0);}
function fresh(){return{schema:SCHEMA,mode:'synthetic-only',next:1,people:{},active:null,packet:null,ratings:{},judgeState:{},events:[]};}
function check(s){if(!s||s.schema!==SCHEMA||s.mode!=='synthetic-only'||!s.people)throw Error('旧演示数据与本版不兼容，请重新生成虚构编号 / Use a fresh synthetic demo record');return s;}
function event(s,type,id,stage=null){s.events.push({type,id,stage,at:new Date().toISOString()});}
function issue(s,nonce){check(s);const code='DEMO-'+String(nonce||'').replace(/[^a-zA-Z0-9]/g,'').slice(0,36);if(code.length<22)throw Error('模拟随机码长度不足 / Random demo code too short');const id='SYNTHETIC_P'+String(s.next++).padStart(3,'0');s.people[id]={id,code,activated:false,consentAck:false,taskBriefAck:false,phaseIndex:0,completed:{},drafts:{},turns:[],used:0,maxCalls:20,createdAt:new Date().toISOString(),startedAt:null,finishedAt:null};event(s,'demo_code_issued',id);return{id,code};}
function activate(s,id,code){check(s);const p=s.people[id];if(!p||p.code!==code||!has(code))throw Error('虚构编号或模拟访问码错误 / Invalid demo code');if(p.phaseIndex===6)throw Error('此案例已完成 / This case is complete');p.activated=true;s.active=id;event(s,'demo_activated',id);return p;}
function active(s){check(s);const p=s.people[s.active];if(!p||!p.activated)throw Error('先登录虚构编号 / Activate a synthetic ID');return p;}
function ack(s){const p=active(s);p.consentAck=true;event(s,'synthetic_acknowledgement',p.id);return p;}
function acknowledgeTask(s){const p=active(s);if(!p.consentAck)throw Error('请先阅读研究说明 / Read the study information first');p.taskBriefAck=true;p.startedAt??=new Date().toISOString();event(s,'task_brief_acknowledged',p.id);return p;}
function inspect(p,stage,answers={}){
 const errors={};const required=REQUIRED[stage]||[];
 if(PHASES[p.phaseIndex]!==stage)errors.__stage='必须按 A–F 顺序提交 / Stages must be sequential';
 if(!p.consentAck||!p.taskBriefAck)errors.__stage='请完成说明和任务确认 / Complete the information and task brief';
 for(const k of required)if(!has(answers[k]))errors[k]='此项必填 / Required';
 if(stage==='C'){
  const optional=['crit3_problem','crit3_reason','crit3_proposal'];
  if(optional.some(k=>has(answers[k])))for(const k of optional)if(!has(answers[k]))errors[k]='第三条已开始，请填写完整 / Complete optional critique 3';
 }
 if(stage==='E')for(const n of [1,2,3]){
  if(n===3&&!has(p.completed.C?.crit3_problem))continue;
  const key='crit'+n+'_handling',e='crit'+n+'_evidence';
  if(!HANDLING.includes(answers[key]))errors[key]='请选择处理方式 / Choose a disposition';
  if(!has(answers[e]))errors[e]='请自行说明 V2 变化或原因 / Describe the revision or reason';
 }
 if(['A','C','E','F'].includes(stage)&&answers.independent_confirm!==true)errors.independent_confirm='请确认独立完成 / Confirm independent work';
 if(stage==='B'||stage==='D'){
  if(!p.turns.some(t=>t.stage===stage))errors.__chat='本阶段至少进行一轮模拟 AI 讨论 / Send one mock AI message in this phase';
  const n=countDesign(answers);if(n<600||n>800)errors.__count=`当前作品 ${n} 字，要求 600–800 / Design length ${n}; required 600–800`;
 }
 return errors;
}
function submit(s,stage,answers){const p=active(s),errors=inspect(p,stage,answers);if(Object.keys(errors).length){const error=new Error('请检查高亮项目 / Please correct highlighted fields');error.fields=errors;throw error;}
 const data=clone(answers);if(stage==='B'||stage==='D'){delete data.word_count;data.verified_character_count=countDesign(answers);data.count_algorithm='pcr-han-latin-v1';}
 p.completed[stage]=data;delete p.drafts[stage];p.phaseIndex++;if(p.phaseIndex===6)p.finishedAt=new Date().toISOString();event(s,'stage_submitted',p.id,stage);return p;
}
function chat(s,message){const p=active(s),stage=PHASES[p.phaseIndex];if(!p.consentAck||!p.taskBriefAck||!['B','D'].includes(stage))throw Error('仅 B/D 阶段可使用模拟 AI / Mock AI available only in B/D');if(!has(message))throw Error('请输入提示 / Enter a message');if(p.used>=p.maxCalls)throw Error('本次虚构测试的模拟调用已达上限 / Mock call quota exhausted');
 const turn={stage,prompt:message.trim(),reply:'【模拟回复 / MOCK AI】请核对 12 个词的覆盖方式、学习者的主动练习、反馈规则、15 分钟内的可执行性和材料成本。最终内容由你自行判断并填写。 / Check all twelve words, active practice, feedback, time and cost. You remain responsible for the final design.',at:new Date().toISOString(),provider:'mock',real_api:false};p.turns.push(turn);p.used++;event(s,'mock_ai_turn',p.id,stage);return turn;}
function buildPacket(s){check(s);const done=Object.values(s.people).filter(p=>p.phaseIndex===6);if(!done.length)throw Error('没有已完成的虚构案例 / No completed synthetic designs');s.packet={schema:'pcr-synthetic-blinded-v2',mode:'synthetic-only',task:'Design a ≤15-minute interactive game for 2–4 novice Chinese university students to practise all twelve Malay words, with ≤CNY30 common materials and clear feedback.',items:done.map((p,i)=>({reviewId:'R'+String(i+1).padStart(2,'0'),v2:Object.fromEntries(DESIGN.map(k=>[k,p.completed.D[k]]))}))};s.ratings={};s.judgeState={};return s.packet;}
function judgeRecord(s,judge){check(s);if(!['J01','J02'].includes(judge))throw Error('评审编号仅限 J01/J02 / Demo judges only');return s.judgeState[judge]??={browsedAll:false,overall:null,confirmations:[],finalizedAt:null};}
function markBrowsed(s,judge){if(!s.packet)throw Error('先生成匿名评审包 / Create blinded packet');const x=judgeRecord(s,judge);x.browsedAll=true;return x;}
function score(s,judge,rid,values){check(s);if(!s.packet?.items.some(x=>x.reviewId===rid))throw Error('未知评审编号 / Unknown review ID');const record=judgeRecord(s,judge);if(!record.browsedAll)throw Error('请先通读所有作品 / Read all blinded designs first');if(record.finalizedAt)throw Error('评审结果已提交 / Ratings already finalized');
 const out={};for(const k of DIMENSIONS){const raw=values[k];if(raw==null||String(raw).trim()===''||!Number.isInteger(Number(raw))||Number(raw)<1||Number(raw)>5)throw Error('四维评分必须为 1–5 整数 / Four integer scores 1–5 required');out[k]=Number(raw);}out.rating_note=typeof values.rating_note==='string'?values.rating_note.trim():'';s.ratings[judge]??={};s.ratings[judge][rid]=out;return out;}
function completeRatings(s,judge){const record=judgeRecord(s,judge);return !!s.packet&&record.browsedAll&&s.packet.items.every(item=>DIMENSIONS.every(k=>Number.isInteger(s.ratings[judge]?.[item.reviewId]?.[k])));}
function saveOverall(s,judge,overall){const record=judgeRecord(s,judge);if(record.finalizedAt)throw Error('已结束 / Already finalized');if(!completeRatings(s,judge))throw Error('请先完成全部评分 / Rate every design first');for(const k of ['criteria','features','uncertainty'])if(!has(overall?.[k]))throw Error('请填写总体评分说明三项 / Complete the overall rationale');record.overall=clone({criteria:overall.criteria,features:overall.features,uncertainty:overall.uncertainty});return record;}
function finalizeJudge(s,judge,checks){const record=judgeRecord(s,judge);if(!completeRatings(s,judge)||!record.overall)throw Error('请完成全部评分与总体说明 / Complete scores and overall rationale');if(!Array.isArray(checks)||checks.length!==3||checks.some(x=>x!==true))throw Error('请勾选全部三项独立评分确认 / Confirm all three statements');record.confirmations=[true,true,true];record.finalizedAt=new Date().toISOString();return record;}
function judgeExport(s,judge){const record=judgeRecord(s,judge);if(!record.finalizedAt)throw Error('评审尚未完成最终确认 / Judge has not finalized');return{schema:'pcr-synthetic-judge-scores-v2',mode:'synthetic-only',judge,ratings:clone(s.ratings[judge]),overall:clone(record.overall),confirmations:clone(record.confirmations),finalizedAt:record.finalizedAt,provenance:'prototype-written-summary-of-previously-oral-feedback'};}
function safeExport(s){check(s);return{schema:SCHEMA,mode:'synthetic-only',records:Object.values(s.people).map(p=>({id:p.id,completed:clone(p.completed),mock_ai_turns:clone(p.turns),used:p.used,startedAt:p.startedAt,finishedAt:p.finishedAt})),packet:clone(s.packet),ratings:clone(s.ratings),judgeState:clone(s.judgeState),events:clone(s.events)};}
return{SCHEMA,PHASES,DESIGN,DIMENSIONS,HANDLING,REQUIRED,countText,countDesign,fresh,check,issue,activate,active,ack,acknowledgeTask,inspect,submit,chat,buildPacket,judgeRecord,markBrowsed,score,completeRatings,saveOverall,finalizeJudge,judgeExport,safeExport};
});
