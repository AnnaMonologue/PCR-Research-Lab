# 发布闸门 / Release Checklist

**Planning document only / 仅为计划文档；不代表已获伦理许可。**

## Stage 0: GitHub demo / 公开演示
- [x] APIC A–F process documented / 已整理原研究流程
- [x] Bilingual terminology and public code / 公开双语术语
- [x] Mock-only local demonstration / 本地模拟 AI
- [ ] Full manual browser walkthrough / 完整浏览器人工测试

## Stage 1: Cloudflare sandbox / Cloudflare 沙盒
- [x] Architecture and D1 schema drafted / 已完成设计稿
- [x] Fail-closed Worker bootstrap drafted / 已有默认关闭真实端点的骨架
- [ ] Isolated D1 development database created / 创建 D1 开发库
- [ ] Researcher Access-protected issuance and revocation / 研究者管理认证和发码
- [ ] HMAC invitation validation, scoped sessions, cookies / 访问码验证与会话
- [ ] Server-side A–F locking and consent version / 阶段锁定及同意版本
- [ ] Mock B/D chat quota, replay and global billing guard / AI 额度和幂等性
- [ ] Permission, CSRF, XSS, rate-limit and multi-tab tests / 安全与并发测试

## Stage 2: Approved research / 获批后正式研究
- [ ] Ethics approval, bilingual consent, data retention / 伦理、同意和保留策略
- [ ] Cloudflare and DeepSeek processing / jurisdiction review / 第三方数据处理审核
- [ ] Secure exports, recovery and deletion tested / 导出、恢复与删除测试
- [ ] Live provider key and budget monitor activated / 正式密钥和预算限制
- [ ] Independent security review before public recruitment / 独立安全验收

**STOP / 停止条件：** Until Stages 1–2 are complete, no real participant or API Key should enter the internet-facing sandbox. / 第一、二阶段未完成前，不得在线收集真实参与者数据，也不得给测试沙盒配置可用于公开调用的模型密钥。


## Compatibility and functional QA / 历史参考与功能测试

- [x] Cancelled legacy Word importer / 已取消真实 Word 导入器（Issue #4）
- [x] Documented private read-only field/rubric cross-check / 已制定私有只读字段与量规核对方案
- [x] Documented fully synthetic workflow testing / 已制定虚构全流程测试方案
- [x] Existing mock localhost tests: 8 passed, 0 failed (2026-10-09) / 已有本地 Mock 自动化检查通过
- [x] Existing Cloudflare sandbox fail-closed tests: 2 passed, 0 failed (2026-10-09) / 云端沙盒关闭状态测试通过
- [ ] Full manual A–F browser walkthrough using only fictional records / 待完成全流程浏览器测试
- [ ] Cross-check historical protocol privately against UI; report only aggregate pass/fail / 待完成私有逐项核对
- [ ] Cloudflare login/quotas/persistence E2E after implementation / 线上认证、额度、持久化功能待实现

**STOP / 限制：** Original participant documents are read-only reference material, never Cloudflare test fixtures. / 真实原件不充当云端测试输入。See [QA strategy / 测试策略](TEST_STRATEGY.md).


## v0.3 code completion / v0.3 代码完成情况（2026-10-09）
- [x] Synthetic random enrolment and single activation / 虚构发码与一次激活
- [x] Scoped, short-lived session cookies / 受限会话
- [x] D1-shaped SQL and server-side A–F checks / D1 SQL 与阶段状态
- [x] Mock B/D AI, context continuity, quotas, replay guard / 模拟 AI 对话、额度与防重复
- [x] Revoke and blinded V2 export / 撤销与匿名导出
- [x] Bilingual interface and automated Node 22 tests / 双语界面与自动化测试
- [ ] Actual Cloudflare Wrangler + hosted D1 verification / 真实 Cloudflare 环境验证
- [ ] Researcher identity via Cloudflare Access (current demo bearer token is insufficient) / 正式管理端认证
- [ ] Brute-force protection, backups, privacy review, real-study consent / 安全与研究伦理
- [ ] Full browser end-to-end and accessibility testing / 浏览器流程与无障碍测试

**The current Worker fails closed if configured for live provider/research. / 如果启用真人研究或真实 AI 模式，当前 Worker 会拒绝执行。**
