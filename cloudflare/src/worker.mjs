/** v0.3 sandbox bootstrap / Cloudflare 沙盒引导。No live authentication, data collection or AI. */
const HEADERS = {
  'Content-Type':'application/json; charset=utf-8',
  'Cache-Control':'no-store',
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'no-referrer',
  'Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'"
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:HEADERS});}
export default {
  async fetch(request){
    const url=new URL(request.url);
    if(request.method==='GET'&&url.pathname==='/api/status'){
      return json({status:'sandbox',mock_only:true,live_collection:false,research_ready:false});
    }
    return json({error:'Research features are disabled. / 研究接口尚未开放。',research_ready:false},503);
  }
};
