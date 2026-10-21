'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

// The source participant-information sheet has exactly 10 sections and 6 checks.
// 原研究知情说明书 10 节；独立签署页含 6 项确认。
test('historical consent information covers all ten source sections',()=>{
 const source=read('demo/consent.js');
 const titles=['研究目的','邀请与参加条件','任务流程','收集材料','DeepSeek 与第三方隐私',
 '风险与应对','收益与报酬','自愿参加与撤回','保密、保存和匿名引用','研究摘要与联系方式'];
 for(const title of titles)assert.ok(source.includes(title),'Missing consent section: '+title);
 assert.equal((source.match(/title: '/g)||[]).length,10);
 assert.match(source,/7 个自然日/);
 assert.match(source,/保存五年/);
 assert.match(source,/不提供参与报酬/);
 assert.match(source,/年满 18 岁/);
});

test('six synthetic checks preserve source topics without claiming actual consent',()=>{
 const source=read('demo/consent.js');
 const checks=source.split('const confirmations = [')[1].split('];')[0];
 assert.equal((checks.match(/'我/g)||[]).length,6);
 assert.match(checks,/原研究.*DeepSeek/);
 assert.match(checks,/7 日撤回/);
 assert.match(checks,/虚构/);
 assert.match(source,/不提供正式研究联系人/);
});

test('UI requires all six acknowledgements and loads the consent module; old dead scripts are removed',()=>{
 const html=read('demo/index.html'),app=read('demo/app.js'),server=read('server.js');
 assert.match(html,/<script src="consent\.js">\s*<\/script>/);
 assert.match(app,/globalThis\.PCR_CONSENT\.sections/);
 assert.match(app,/globalThis\.PCR_CONSENT\.confirmations/);
 assert.match(app,/if\(!control\.checked\)missing\['consent'/);
 assert.match(app,/D\.ack\(s\)/);
 assert.match(server,/demo\/consent\.js/);
 for(const obsolete of ['participant.js','researcher.js','judge.js','styles.css']){
  assert.ok(!fs.existsSync(path.join(root,obsolete)),obsolete+' should be removed');
 }
});
