/* PCR pilot v0.1 — shared pure functions. No network calls. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.PCR = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const VERSION = '0.2.1';
  const PHASES = ['A','B','C','D','E','F'];
  const DIMENSIONS = [
    {key:'global_innovation',label:'整体创新表现 / Global innovation',q:'整体框架的新意及目标、玩法、互动、反馈整合 / Novelty and coherence of integrated objectives, activities, interaction and feedback'},
    {key:'originality',label:'独创性 / Originality',q:'核心玩法、规则或 12 词使用方式的区别性 / Distinctiveness of mechanics, rules or vocabulary use'},
    {key:'educational_usefulness',label:'教育用途 / Educational usefulness',q:'是否有主动词汇练习和清楚、及时的反馈 / Active vocabulary practice and clear, timely feedback'},
    {key:'feasibility_task_fit',label:'可行性与任务适配 / Feasibility and task fit',q:'是否符合 15 分钟、12 词、30 元等要求并可执行 / Practical fulfilment of time, vocabulary and cost constraints'}
  ];
  const ANCHORS = {
    global_innovation:['缺少新意，或目标、玩法、互动与反馈缺乏连贯整合 / Limited novelty or weak integration of objectives, mechanics, interaction and feedback','基本连贯且有一定新意，但整合或发展程度一般 / Some novelty and coherence, but limited integration or development','各部分有机整合为新颖、连贯、易理解的方案 / Novel, coherent and understandable integration of all elements'],
    originality:['玩法、规则或词汇使用方式缺少明显区别性 / Mechanics, rules or vocabulary use show little distinctiveness','具有一定区别性，但仍有限 / Some distinctiveness, but limited','具有明显区别性，呈现清楚的新意 / Clear distinctiveness and originality'],
    educational_usefulness:['主动练习、回忆或反馈薄弱或不清楚 / Weak or unclear active practice, recall or feedback','有一定练习和反馈，但存在明显缺口 / Some practice and feedback, with significant gaps','有主动辨认、回忆或使用词汇的机会，反馈及时清楚 / Active identification, recall or use of words with clear, timely feedback'],
    feasibility_task_fit:['明显不符合多项要求，或无法执行 / Violates multiple task constraints or cannot be implemented','基本符合要求，但有明显问题 / Mostly meets constraints but has significant issues','完全符合任务要求且流程清楚可执行 / Fully meets task constraints and can be clearly implemented']
  };
  const WORDS = [['makan','吃'],['minum','喝'],['buku','书'],['kelas','课堂／班级'],['kawan','朋友'],['rumah','家'],['kedai','商店'],['bas','公交车'],['pagi','早晨'],['malam','夜晚'],['cepat','快'],['lambat','慢']];
  function id(prefix='PCR'){const n=(typeof crypto!=='undefined' && crypto.randomUUID ? crypto.randomUUID().replace(/-/g,'').slice(0,12) : Math.random().toString(36).slice(2,14)).toUpperCase();return `${prefix}-${n}`;}
  function now(){return new Date().toISOString();}
  function start(){const timestamp=now();return {schema:'pcr-participant-v1',version:VERSION,session_id:id('S'),started_at:timestamp,phase_index:0,drafts:{},completed:{},events:[{seq:1,type:'session_created',stage:null,at:timestamp,details:{version:VERSION}}]};}
  function event(s,type,stage,details={}){s.events.push({seq:s.events.length+1,type,stage,at:now(),details});}
  function has(x){return typeof x==='string'&&x.trim().length>0;}
  function validateStage(p,d){const errors=[];
    if(p==='A') for(const k of ['idea','mechanism','vocabulary','priority'])if(!has(d[k]))errors.push(k);
    if(p==='B'||p==='D'){
      for(const k of ['materials','rules','learning','ending','rationale','transcript'])if(!has(d[k]))errors.push(k);
      if(p==='B'&&!has(d.model))errors.push('model');
      if(!Number.isInteger(Number(d.word_count))||Number(d.word_count)<600||Number(d.word_count)>800)errors.push('word_count (600–800)');
      if(!d.word_count_confirmed)errors.push('word_count_confirmed');
      if(p==='B'&&!d.settings_confirmed)errors.push('settings_confirmed');
      if(p==='D'&&!d.same_conversation)errors.push('same_conversation');
    }
    if(p==='C')for(const n of [1,2])for(const k of ['problem','reason','proposal'])if(!has(d[`crit${n}_${k}`]))errors.push(`crit${n}_${k}`);
    if(p==='E')for(const n of (d.optional_third?[1,2,3]:[1,2]))for(const k of ['handling','evidence'])if(!has(d[`crit${n}_${k}`]))errors.push(`crit${n}_${k}`);
    if(p==='F')for(const k of ['main_change','source','rejected'])if(!has(d[k]))errors.push(k);
    if(!d.confirm)errors.push('confirm');return errors;
  }
  function commit(s,p,d){if(PHASES[s.phase_index]!==p)throw Error('阶段须按顺序提交 / Stages must be submitted in order');const errors=validateStage(p,d);if(errors.length)throw Error('请补齐必填项 / Complete required fields: '+errors.join('，'));s.completed[p]=JSON.parse(JSON.stringify(d));delete s.drafts[p];event(s,'stage_submitted',p,{required_fields_valid:true,transcript_origin:(p==='B'||p==='D')?'api_captured':'not_applicable'});s.phase_index++;if(s.phase_index===PHASES.length){s.finished_at=now();event(s,'session_finished',null);}else event(s,'stage_entered',PHASES[s.phase_index]);return s;}
  function complete(s){return s?.schema==='pcr-participant-v1'&&s?.phase_index===6&&PHASES.every(k=>!!s.completed?.[k]);}
  function buildPacket(sessions){if(!Array.isArray(sessions)||!sessions.length)throw Error('No participant sessions');for(const s of sessions)if(!complete(s))throw Error('Found incomplete/invalid participant session');
    const seen=new Set();sessions.forEach(s=>{if(seen.has(s.session_id))throw Error('Duplicate session ID');seen.add(s.session_id);});
    const perm=[...sessions];for(let i=perm.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[perm[i],perm[j]]=[perm[j],perm[i]];}const items=[];const private_map=[];
    perm.forEach((s,i)=>{const rid='R'+String(i+1).padStart(2,'0');const v=s.completed.D;items.push({review_id:rid,v2:{materials:v.materials,rules:v.rules,learning:v.learning,ending:v.ending,rationale:v.rationale}});private_map.push({review_id:rid,session_id:s.session_id});});
    const packet_id=id('PACK');return {packet:{schema:'pcr-blinded-review-v1',version:VERSION,packet_id,created_at:now(),task:'为 2–4 名零基础中国大学生设计 15 分钟、覆盖 12 个马来语词汇的互动教育游戏，每组材料成本 ≤30 元。 / Design a ≤15-minute interactive game for 2–4 Chinese university beginners learning 12 Malay words; materials ≤CNY 30 per group, with active practice and feedback.',items},private_map:{schema:'pcr-private-map-v1',packet_id,created_at:now(),map:private_map}};
  }
  function scoreValid(x){return Number.isInteger(Number(x))&&Number(x)>=1&&Number(x)<=5&&String(x).trim()!=='';}
  function csvEscape(x){const s=String(x??'');const safe=/^[=+@\-\t\r]/.test(s)?"'"+s:s;return /[,"\r\n]/.test(safe)?'"'+safe.replace(/"/g,'""')+'"':safe;}
  function csv(rows){return rows.map(row=>row.map(csvEscape).join(',')).join('\r\n');}
  return {VERSION,PHASES,DIMENSIONS,ANCHORS,WORDS,id,now,start,event,validateStage,commit,complete,buildPacket,scoreValid,csv};
});
