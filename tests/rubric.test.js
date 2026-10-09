'use strict';
/** 原 APIC 2026 评分量规回归测试 / Regression checks for the original APIC 2026 rating anchors. */
const test = require('node:test');
const assert = require('node:assert/strict');
const {ANCHORS,DIMENSIONS} = require('../core.js');

const expected = {
  global_innovation: [
    '整体方案缺少新意，或学习目标、玩法、互动与反馈之间缺少连贯整合。',
    '整体方案基本连贯并有一定新意，但各部分的整合或发展程度一般。',
    '学习目标、玩法、互动与反馈被有机整合为一个整体上新颖、连贯且易理解的方案。'
  ],
  originality: [
    '核心玩法、规则设计或 12 个词的使用方式缺少明显区别性。',
    '核心玩法、规则设计或 12 个词的使用方式具有一定区别性，但仍较有限。',
    '核心玩法、规则设计或 12 个词的使用方式具有明显区别性，呈现出清楚的新意。'
  ],
  educational_usefulness: [
    '主动练习、回忆或反馈机制薄弱或不清楚。',
    '提供了一定练习与反馈，但存在明显缺口。',
    '清楚提供主动辨认、回忆或使用词汇的机会，并有及时、可理解的反馈。'
  ],
  feasibility_task_fit: [
    '明显不符合多项任务要求，或无法按所述流程执行。',
    '基本符合任务要求，但仍存在一项或多项明显问题。',
    '完全符合任务要求，并能按所述流程清楚执行。'
  ]
};
test('四维 1/3/5 分锚点保留原文 / original four 1/3/5 anchors are preserved',()=>{
 assert.equal(DIMENSIONS.length,4);
 for(const [key,anchors] of Object.entries(expected)){
  assert.equal(ANCHORS[key].length,3,key);
  for(let i=0;i<3;i++){
   const parts=ANCHORS[key][i].split(' / ');
   assert.equal(parts[0],anchors[i],`${key} anchor ${i}`);
   assert.ok(parts[1]?.trim(),`Missing English translation: ${key} ${i}`);
  }
 }
});
