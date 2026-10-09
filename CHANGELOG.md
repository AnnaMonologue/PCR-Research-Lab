# Changelog / 版本记录

## v0.2.1 — Bilingual public-source preparation / 双语公开源码整理

- Added a canonical bilingual terminology glossary and strict preservation rules for source-study rubric concepts. / 增加中英专业术语库与原始评分量规的翻译纪律。
- Updated the participant, researcher and judge interfaces with paired Chinese/English labels and key descriptions. / 三类界面加入双语标签、提示与操作说明。
- Added a researcher-issued participant ID and expiring access-code **design specification**; explicitly marked not implemented. / 新增研究者发放编号与一次性访问码的设计规范，明确目前未实现。
- Revised security and ethics disclosures for a public GitHub repository. / 完善公开仓库的密钥、日志、身份及伦理边界。
- Maintained localhost-only server and synthetic mock mode; API keys are excluded from Git. / 保持本机服务与模拟测试，密钥不提交。

## v0.2.0 — Local DeepSeek demonstration / 本地 DeepSeek 演示

- Added Node.js relay, B/D in-page conversation, server logs and synthetic API provider. / 增加 Node.js 服务端代理、B/D 页面聊天、日志及模拟响应。
- Preserved A–F process controls and independent product appraisal. / 保留 A–F 阶段控制及独立产品评分。

## v0.1.0 — Original prototype / 初始原型

- Digitised the APIC 2026 PCR task, data export and blinded judge packet. / 将 APIC 2026 原实验流程、数据导出和匿名评审包转为网页工具。

### Scoring-rubric preservation / 原始量规复核

- Replaced earlier abbreviated anchors with the twelve original Chinese 1/3/5 descriptors, followed by faithful English translations; added regression tests for all four dimensions. / 将早期界面中缩写的十二条评分锚点恢复为原始中文全文并配上英文译文，新增四维量规回归测试。


## Cloudflare v0.3 architecture draft / Cloudflare v0.3 架构草案（未部署）

- Documented Cloudflare Workers + D1 + Secrets and admin/participant separation. / 新增 Cloudflare 云端架构、密钥和角色隔离方案。
- Added D1 schema draft, fail-closed mock-only Worker, bilingual governance and release checklist. / 新增 D1 草案、默认拒绝真实接口的 Worker、数据治理与验收清单。
- Kept actual recruitment, server-backed auth and live AI relay disabled pending implementation and review. / 真实招募、服务端认证和在线 AI 调用仍未开放。


## v0.3.0 — Cloudflare mock-only sandbox / Cloudflare 虚构沙盒
- Added D1-backed staged researcher-issued synthetic invitations, one-time activation and short-lived Secure/HttpOnly session cookies. / 新增虚构发码、一次激活及安全会话。
- Server-authoritative A–F progression, B/D mock chat, quotas and replay checks. / 服务端控制阶段、模拟 AI、额度和重复请求。
- Separate bilingual synthetic participant UI, CLI administration, anonymised V2 packet. / 双语参与者端、研究者命令行与盲评包。
- Integration tests in Node 22 in-memory SQLite; Github Actions Node test workflow. / 内存 SQLite 自动化测试与 CI。
- **Not deployed, no real data, no real DeepSeek provider calls. / 尚未部署、没有真实资料或模型调用。**
