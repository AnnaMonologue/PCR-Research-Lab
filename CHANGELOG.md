# Changelog / 版本记录

## v0.4.0 — Bilingual interactive offline study / 中英双语交互研究原型 (2026-10-09)
- Added short study-information/acknowledgement and original 12-word task brief before A. / 独立说明确认页与任务页。
- Added original per-phase guidance, required-field inline checks and confirmations for A/C/E/F. / 阶段引导及必填校验。
- Built B/D two-column editor and continuous, independently scrollable Mock AI chat that automatically logs messages. / 双栏设计与同一段模拟聊天。
- Replaced manual/fabricated V1/V2 word counts with deterministic 600–800 count, explicit Count action and recheck on submit. / 真实计算并核验字数。
- Preserved two mandatory C critiques, optional third, E cross-reference to C and participant-written explanations. / C→E 自动引用与独立说明。
- Rebuilt blinded judge journey: browse all, four 1–5 scores, optional per-design note, written overall rationale based on oral feedback workflow, three original confirmations and independent JSON export. / 逐份备注选填、总体说明必填及双评审确认。
- No real historical records, DeepSeek API calls or Cloudflare deployment. / 不处理真人资料、不安装云端依赖。
- Retained GitHub Actions manual-only. / CI 仅手动。

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

## v0.3.0 Cloudflare synthetic sandbox / Cloudflare 虚构数据沙盒
- Added a separate D1-backed Worker in permanent mock-only mode; no DeepSeek API calls or live collection. / 新增永久 Mock-only 的 D1 Worker，不收集真人数据。
- Added synthetic participant invitation and one-time activation, scoped sessions, server-locked A–F, mock B/D chat, quotas, revocation and blinded packet export. / 加入发码、会话、阶段锁定、模拟 AI、额度与盲评导出。
- Added bilingual sandbox participant UI and researcher command-line script. / 中英双语网页与研究者命令行。
- Added Node 22 in-memory SQLite D1-equivalent integration tests, 17 total project node:test checks, separate core checks. / 新增 17 项自动化测试。
- No actual Cloudflare deployment, researcher Access integration, real API credential or human participants. / 未部署、未启用真实 API、未招募真人。
