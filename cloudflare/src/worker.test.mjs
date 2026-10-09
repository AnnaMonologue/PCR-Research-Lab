import assert from 'node:assert/strict';
import test from 'node:test';
import worker from './worker.mjs';
test('sandbox status is available and marked not ready',async()=>{
  const r=await worker.fetch(new Request('https://example.test/api/status'));
  assert.equal(r.status,200);
  assert.equal((await r.json()).research_ready,false);
});
test('authentication/chat/admin endpoints fail closed',async()=>{
  for(const path of ['/api/activate','/api/chat','/api/admin/issue','/participant.html']){
    const r=await worker.fetch(new Request('https://example.test'+path,{method:'POST'}));
    assert.equal(r.status,503,path);
    assert.equal((await r.json()).research_ready,false);
  }
});
