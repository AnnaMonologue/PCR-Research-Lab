/** Researcher CLI (synthetic sandbox only) / 研究者虚构测试命令行 */
const base=(process.env.PCR_SANDBOX_URL||'').replace(/\/$/,'');
const token=process.env.RESEARCHER_DEMO_TOKEN||'';
const action=process.argv[2]||'help';
if(!base.startsWith('https://')||token.length<32){
 console.error('Provide HTTPS sandbox URL and >=32-character researcher demo token / 需要 HTTPS 地址及长度至少 32 的测试管理密钥');
 process.exit(2);
}
const commands={
 issue:['POST','/api/admin/issue',{max_ai_calls:12}],
 summary:['GET','/api/admin/summary'],
 packet:['GET','/api/admin/packet'],
 revoke:['POST','/api/admin/revoke',{participant_id:process.argv[3]}]
};
if(!commands[action]){console.error('issue | summary | packet | revoke SYNTHETIC_P...');process.exit(2);}
const [method,path,payload]=commands[action];
const response=await fetch(base+path,{method,headers:{Authorization:'Bearer '+token,...(payload?{'Content-Type':'application/json'}:{})},body:payload?JSON.stringify(payload):undefined});
const result=await response.json();
if(!response.ok){console.error('Sandbox request failed:',response.status,result.code||'error');process.exit(1);}
console.log(JSON.stringify(result,null,2));
