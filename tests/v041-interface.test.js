'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const root=path.join(__dirname,'..');const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const html=read('demo/index.html'),ui=read('demo/app.js'),css=read('demo/style.css');
test('legacy role entrypoints all point to one offline demo / 旧版三个入口统一跳转',()=>{
 for(const f of ['participant.html','researcher.html','judge.html']){const t=read(f);assert.match(t,/location\.replace\('demo\/index\.html'\)/);assert.ok(!t.includes('participant.js')&&!t.includes('researcher.js')&&!t.includes('judge.js'));}
});
test('short participant heading and hoverable pinned phase navigation / 简洁标题与左侧阶段导航',()=>{
 assert.match(html,/教育游戏共创/);assert.ok(!html.includes('v0.2.1'));assert.ok(!html.includes('DEMONSTRATION ONLY'));assert.match(html,/id="phase-sidebar"/);assert.match(html,/id="sidebar-pin"/);assert.match(css,/\.phase-sidebar:hover/);assert.match(css,/\.phase-sidebar\.pinned/);
});
test('information before A, task banner, and C reference / 知情说明和 C 左右对照',()=>{
 assert.match(ui,/if\(!p\.consentAck\)\{information\(p\);return;\}/);assert.match(ui,/taskBanner\(\)/);assert.ok(ui.includes("classList.add('reference-panel')"));assert.match(ui,/readonlyDesign\(ref,stage==='C'\?'B':'D'/);
});
test('live length revalidation and offline mock AI fallback / 自动字数及离线对话无需密钥',()=>{
 assert.match(ui,/function countLength\(/);assert.match(ui,/if\(countPanel\)countLength\(true\)/);assert.match(ui,/form\.addEventListener\('input',[^\n]*if\(countPanel\)countLength\(false\)/);assert.match(ui,/MODEL_LABEL='DeepSeek-V4\.1-Flash'/);assert.match(ui,/发送示例提问（无需 API）/);assert.match(ui,/D\.chat\(s,/);assert.ok(!ui.includes('fetch('));
});
