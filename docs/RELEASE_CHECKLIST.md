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
