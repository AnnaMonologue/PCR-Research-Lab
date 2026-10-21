## Prototype-only scope / 仅原型演示（当前决定）

**Current acceptance / 当前验收标准：** Offline synthetic role walkthrough and automated tests; Cloudflare/DeepSeek are interface reservations, **not deployment milestones**. / 只做离线虚构流程、测试和接口文档，不安装、不部署、不配置真实 API。

- [x] Offline mock participant login code and six-stage flow / 虚构编号与 A–F
- [x] B/D mock conversation, saved drafts and rating workflow / 模拟对话、草稿与评分
- [x] Original four-dimensional APIC rubric anchors / 原始四维量规锚点
- [x] Node tests: 24/24; browser injected-source E2E pass / Node 24 项和浏览器注入源码流程测试通过
- [x] Manual-only GitHub Actions; no automatic email-triggering CI / CI 只允许手动运行
- [ ] Direct double-click file-opening validation on user device / 用户设备双击运行仍需核查

**Not required for prototype / 原型不要求：** Cloudflare provisioning, live DeepSeek API, production authentication, genuine research subjects, hosted data storage. / 云端和真人研究属于未来独立项目。

# 发布闸门 / Release Checklist

> Draft — not an ethics approval / 草案，不代表伦理许可。

## Phase 0 / 当前公开演示

- [x] APIC PCR A–F protocol and bilingual glossary documented / 已记录原研究流程与双语术语
- [x] Local-only mock DeepSeek relay available / 已有本机模拟 AI
- [x] Public repository excludes actual data and provider keys / 公开代码不含研究数据与服务商密钥（持续核查）
- [ ] Confirm bilingual interface accessibility in full browser walkthrough / 完整浏览器人工测试待做

## Phase 1 / Cloudflare 沙盒开发

- [ ] Cloudflare account and isolated sandbox D1 database / 建立隔离沙盒 D1
- [ ] Write Worker backend; remove local-server assumptions / 迁移服务器逻辑
- [ ] Implement Access-protected admin issuance, revocation and audit / 管理员认证与发码撤销
- [ ] Implement code HMAC verification, short-lived scoped session / 凭证验证及短期会话
- [ ] Implement server-enforced A–F stages and frozen submissions / 阶段约束与提交锁定
- [ ] Implement mock-only B/D relay, idempotency and quotas / Mock 版 AI 请求与额度控制
- [ ] Confirm CSRF, HTTPS, XSS, CORS, brute-force and cookie protections / Web 安全测试
- [ ] Test malicious/expired/reused code, wrong-stage chat, replay, multi-tab and interruption / 边界与并发测试
- [ ] Test permission isolation and anonymised judge exports / 盲评隔离测试

## Phase 2 / 上线前审批

- [ ] Ethical approval and approved bilingual participant info/consent / 伦理与双语知情同意
- [ ] Cloudflare/DeepSeek processing and transfer reviewed / 服务商数据处理核验
- [ ] Live AI settings, token cost, hard ceilings and spend monitoring reviewed / 模型与额度
- [ ] Data retention, encrypted exports, backup/restore, deletion and access policy / 保留与删除
- [ ] Independent security review and signed-off smoke-test report / 上线安全复核
- [ ] Staging account separate from live research environment / 环境隔离

**STOP RULE / 停止原则：** Any unchecked item in Phase 1 or Phase 2 blocks real-subject deployment. / 第一、二阶段未完成的安全与伦理条件阻止真实招募。

## v0.3 mock-only code verification / v0.3 模拟沙盒验收（2026-10-09）
- [x] Cloudflare Worker mock + D1 prepared SQL / Worker Mock 与 D1 SQL
- [x] Synthetic issuance, activation, scoped cookies / 虚构发码、激活与 Cookie
- [x] Server-enforced stage progression and B/D mock chat / A–F 状态与 B/D 对话
- [x] Replay guard, per-user call quota, revocation / 重复请求处理、额度与撤销
- [x] Blinded V2 packet export (mock data only) / 匿名 V2 导出
- [x] Integration tests on Node in-memory SQLite / 内存数据库集成测试
- [ ] Cloudflare remote D1 / Wrangler staging test / 云端 D1 运行验证
- [ ] Real researcher Access identity and abuse controls / 真正管理端 Access 与限流
- [ ] Full browser walkthrough and automated accessibility checks / 浏览器全流程和无障碍核对
- [ ] Ethics and data-protection authorisation for real collection / 实施真人研究前的伦理与数据审查

## v0.4.2 — Offline synthetic demonstration sign-off / 离线虚构演示验收

- [x] Original ten-section information mapped to a bilingual disclosure page. / 原研究 10 节说明已核对
- [x] Six synthetic-only acknowledgements block advancement before A. / 6 项确认拦截
- [x] No real names, signatures, emails or phone entries in demo. / 不收集身份资料
- [x] Historical DeepSeek risks, seven-day withdrawal and five-year retention distinguished from Mock behavior. / 历史条款与演示边界分离
- [x] Removed obsolete legacy frontend scripts/styles, kept redirect aliases. / 无用代码清理
- [x] 37 automated tests passed; original-PCR checks passed. / 37 项自动化通过
- [x] Browser consent → A–F → J01/J02 synthetic walkthrough passed (injected source; 0 JS errors). / 浏览器全流程通过
- [ ] Verify Windows direct double-click opening on user's own PC. / 用户本机双击待验证

Cloudflare and real DeepSeek integrations remain out of scope. / 不部署、不调用真实模型、不导入真人材料。
