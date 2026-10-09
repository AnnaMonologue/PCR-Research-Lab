import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const schema=JSON.parse(readFileSync(new URL('../schemas/pcr-legacy-import-v1.schema.json',import.meta.url)));
const fixture=JSON.parse(readFileSync(new URL('../samples/SYNTHETIC_legacy_apic_record.json',import.meta.url)));
test('legacy fixture is explicitly synthetic and sourced to manually copied documents',()=>{
 assert.equal(fixture.dataset_kind,'synthetic');
 assert.equal(fixture.source_type,'legacy_manual_docx');
 assert.match(fixture.case_ref,/^SYNTHETIC_/);
 assert.equal(fixture.schema,'pcr-legacy-import-v1');
});
test('all A–F sections and key fields are specified',()=>{
 for(const stage of ['A','B','C','D','E','F']) assert.ok(fixture.stage_data[stage]);
 for(const stage of ['B','D']) for(const key of ['materials','rules','learning','ending','rationale']) assert.ok(Object.hasOwn(fixture.stage_data[stage],key));
 assert.equal(fixture.stage_data.C.critique_units.length,2);
 assert.equal(fixture.stage_data.E.dispositions.length,2);
});
test('legacy transcripts cannot masquerade as native API telemetry',()=>{
 for(const stage of ['B','D'])for(const turn of fixture.ai_transcript[stage]){
 assert.equal(turn.source_provenance,'participant_copied_transcript');
 assert.equal(turn.native_api_timestamp,null);
 assert.equal(turn.api_request_id,null);
 }
});
test('private case crosswalk and consent remain unverified in public example',()=>{
 assert.equal(fixture.qc.case_mapping_verified,false);
 assert.equal(fixture.qc.consent_status,'unverified');
 assert.equal(schema.properties.source_type.const,'legacy_manual_docx');
 assert.deepEqual(schema.properties.dataset_kind.enum,['synthetic','restricted_legacy']);
});
test('public fixture has no raw identifiers and every participant text is fictional',()=>{
 const serialized=JSON.stringify(fixture);
 assert.ok(!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(serialized));
 const strings=[];
 const walk=(x)=>{if(typeof x==='string')strings.push(x);else if(Array.isArray(x))x.forEach(walk);else if(x&&typeof x==='object')Object.values(x).forEach(walk)};
 walk(fixture.stage_data);
 for(const stage of ['B','D'])walk(fixture.ai_transcript[stage].map(t=>t.content));
 assert.ok(strings.filter(s=>s.length>25).every(s=>s.startsWith('SYNTHETIC:')));
});
