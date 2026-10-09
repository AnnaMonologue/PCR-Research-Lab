# PCR Research Lab｜PCR 人机共创研究实验室

**Prompt–Critique–Refinement (PCR) / 提示—批评—修订流程**  
**Research instrumentation prototype / 研究装置原型 · v0.2.1**

> **研究开发演示 / DEVELOPMENT DEMO ONLY.** This public source repository includes **no actual study participants, research records, or API credentials**. It is not ready for remote recruitment or authentic data collection. / 本公开源码仓库不包含真实参与者资料、研究记录或 API 密钥；目前不能开展线上真实招募和数据采集。

## 1. Purpose / 项目目的

**中文：** 本项目源于作者 APIC 2026 论文 *Shifting Assessment Focus: Managing Behaviour and Measuring Innovation Performance in Human–AI Co-creation*，将既有的 Prompt–Critique–Refinement（PCR）流程数字化，以改善研究活动的一致性、过程记录、匿名作品评审和可复现性。当前版本仅展示研究装置的技术可行性，不主张新的学习成效、因果效应或测量效度。

**English:** Based on the author's APIC 2026 study, the prototype digitises an existing six-phase Prompt–Critique–Refinement protocol to support consistent task administration, observable event records, blinded product appraisal and reproducibility. This is an **engineering demonstration**; it makes no new empirical, causal, learning-gain or construct-validity claims.

## 2. Interfaces / 角色与界面

| 角色 Role | 页面 Interface | 功能 Function |
|---|---|---|
| 参与者 Participant | `participant.html` | A–F 阶段任务、B/D 页面内 AI 对话、保存草稿、导出结构化记录 / Staged task, in-page B/D AI chat, draft autosave and export |
| 研究者 Researcher | `researcher.html` | 检查完整案例、制作匿名 V2 评审包及独立编号映射 / Validate completed cases, create a blinded V2 packet and separate private ID map |
| 评审 Judge / rater | `judge.html` | 仅对匿名 V2 四维独立评分，导出评分 JSON / Independently rate only blinded V2 products on four dimensions |
| 服务端 Backend | `server.js` | 在本地代为调用 DeepSeek、保管密钥、记录 B/D 消息 / Locally relay DeepSeek requests, keep the key server-side and log B/D turns |

## 3. Original study procedure / 原研究 A–F 流程

| 阶段 Phase | 操作 Activity | AI |
|---|---|---|
| A | 独立构思 / Independent pre-AI ideation | 禁用 / No |
| B | 与 AI 开发初稿 V1 / AI-supported first design | 允许 / Yes |
| C | 独立提出至少两条批评 / Two required independent critiques | 禁用 / No |
| D | 继续相同对话并形成 V2 / Continue the same AI conversation and refine V2 | 允许 / Yes |
| E | 说明每条批评如何处理 / Map critique to revision decisions | 禁用 / No |
| F | 独立写出事后解释 / Independent post-task account | 禁用 / No |

**研究边界 / Interpretation boundary:** The system records only observable in-app behaviour. The interface cannot prove no other tools were used or infer private thoughts, authorship, learning gains or causal improvement. / 系统只能记录页面内可观察行为，不能证明从未使用外部工具，也不能仅凭日志推断内部认知、原创归属、学习增长或因果改善。

## 4. Local demo / 本地演示

**要求 / Requirement:** Node.js 20+; no third-party npm packages. / 需要 Node.js 20+，无第三方 npm 依赖。

```bash
# 在项目目录中 / From the repository root
cp .env.example .env
# Windows PowerShell: Copy-Item .env.example .env
npm start
# 打开 / Open http://127.0.0.1:8787/
```

**默认 Mock / Mock by default:** `AI_PROVIDER=mock` returns conspicuously fictional replies without spending API credits. / 默认响应明显标注为模拟，供调试使用，不会消耗 DeepSeek 费用。

### Optional DeepSeek API / 可选 DeepSeek API

Update only your local `.env` (never commit this file): / 只在本地 `.env` 中填写，绝不提交到 GitHub：

```dotenv
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=REPLACE_WITH_YOUR_OWN_SECRET
DEEPSEEK_MODEL=deepseek-flash
DEEPSEEK_BASE_URL=https://api.deepseek.com
PORT=8787
```

Restart `npm start`, then the B/D stages can converse through the backend. The DeepSeek service may process participant text; no human-subject use before appropriate ethics/privacy approval. The API version does **not** exactly replicate the DeepSeek website used in the APIC study. / 重启后 B、D 阶段可通过后端使用 DeepSeek；原 APIC 使用的是网页端，因此这属于方法装置改编，不能称为完全复现。实际参与者文本发往第三方模型前须完成相应伦理与数据保护审查。

[Official API documentation / 官方接口文档](https://api-docs.deepseek.com/)

## 5. Participant access design / 参与者领取编号方案

**Current v0.2.1 status / 当前状态：** Researcher-issued access codes are **specified but not implemented**. The current application is bound to `127.0.0.1`, has no participant authentication or server-enforced access quota, and **must not be exposed to the internet**. / “向研究者领取实验编号和临时访问码”已形成设计说明，但尚未写成可安全上线的认证系统；当前仅监听本机，不能直接对外部署。

**Planned researcher-mediated workflow / 拟定发放流程：**

1. Researcher privately invites eligible adults and distributes a **participant ID + one-time access code**; never shares a DeepSeek API key. / 研究者单独招募合格成年人，发放**参与者编号与一次性访问码**；不发放 API Key。
2. Participant reads an approved information sheet, chooses whether to consent, and enters the access code through HTTPS. / 参与者先阅读经批准的研究说明，自主确认同意，再通过 HTTPS 输入访问码。
3. Backend verifies a hashed code, time-to-live, remaining calls and usage budget; creates a scoped session without revealing the AI credential. / 服务端检查访问码摘要、有效期、调用次数和预算，建立受限会话。
4. B and D requests go to the researcher-operated backend, which holds the DeepSeek key and records permitted AI turns. / B、D 请求通过研究者维护的后端调用并记录。
5. On completion or withdrawal, access is revoked; exports and the re-identification map are restricted to the researcher. / 完成或退出后撤销访问，研究记录与编号对应表分别管理。

For threat model, proposed endpoints, issuance procedure and release blockers, see [`docs/PARTICIPANT_ACCESS.md`](docs/PARTICIPANT_ACCESS.md). / 威胁模型、接口规范、发放步骤和上线闸门见访问方案文档。

## 6. Documentation / 项目文档

| 文件 File | 说明 / Description |
|---|---|
| [`docs/TERMINOLOGY.md`](docs/TERMINOLOGY.md) | 中英术语库与翻译维护原则 / Canonical bilingual terminology and translation rules |
| [`docs/PROTOCOL.md`](docs/PROTOCOL.md) | 原始 APIC 与软件改编的区别 / Source study protocol versus engineering adaptations |
| [`docs/PARTICIPANT_ACCESS.md`](docs/PARTICIPANT_ACCESS.md) | 研究者发放编号与访问码的设计 / Researcher-issued enrollment architecture |
| [`DATA_DICTIONARY.md`](DATA_DICTIONARY.md) | 数据字段及证据解释边界 / Data fields and interpretation boundaries |
| [`docs/SECURITY_AND_ETHICS.md`](docs/SECURITY_AND_ETHICS.md) | 隐私、数据、平台和伦理风险 / Privacy, model provider, data and ethics limitations |
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | 已实现与待实现的功能 / Delivered features and acceptance gates |
| [`VALIDATION_AND_LIMITS.md`](VALIDATION_AND_LIMITS.md) | 测试证据及适用范围 / Tests, evidence and limitations |
| [`CHANGELOG.md`](CHANGELOG.md) | 版本变更记录 / Change history |

## 7. Tests / 自动化测试

```bash
npm test
```

Tests check protocol stage order, export schema and blinded packet separation, ratings bounds, CSV handling and local mock API restrictions. A passing test suite is **not** proof of production security or research validity. / 测试覆盖阶段顺序、导出格式、盲评隔离、评分范围、CSV 安全和本地模拟 API；通过测试不代表具备正式上线安全性或学术效度。

## 8. Public repository and provenance / 公开仓库与资料出处

**May be public / 可公开：** Source code, bilingual documentation, approved protocol abstractions, blank rating rubric, fictional `SYNTHETIC_` fixtures, non-sensitive test output. / 源码、双语文档、经核准的方法概述、空白量规、虚构测试数据及非敏感测试结果。

**Must remain private / 必须私密：** DeepSeek API keys, `.env`, live server logs, individual participant submissions, identifiable text, signed consent, judge identity/contact details, authentic scores and ID mapping. / 密钥、配置、真实交互日志、被试资料、知情同意签署记录、评审身份与联系方式、真实评分和编号映射等。

The publicly visible repository does not automatically grant reuse rights; no open-source license has been chosen. / 公开可见不代表自动授予自由复用许可；尚未选定开源许可证。

**Citation / 研究依据：** Shen, Y. (2026). *Shifting Assessment Focus: Managing Behaviour and Measuring Innovation Performance in Human–AI Co-creation* (APIC 2026). / 本项目采用作者已完成的研究设计作为原型依据，任何新增实证结论需另行验证。


## 9. Cloudflare v0.3 proposal / Cloudflare v0.3 设计（尚未部署）

**中文：** 计划将本地技术演示与未来线上研究隔离。Cloudflare Workers + D1 + Workers Secrets 将支持有权限的研究者发码、参加者 A–F 阶段验证、B/D 的 DeepSeek 调用、用量限制和数据审计；目前这些线上研究功能还没有实现。绝不向参与者提供主 API Key 或解密密码，参与者只领取本人编号及临时访问码。Cloudflare 和 DeepSeek 属于第三方服务，正式研究前必须审查伦理、保留和跨境处理要求。

**English:** A future Cloudflare Workers + D1 + Workers Secrets deployment would provide researcher-issued expiring participant codes, server-enforced A–F stages, B/D model relay, quotas and audit trails. These features are **design-stage only**. Participants never receive a provider key or its decryption password. Cloudflare and DeepSeek are third parties; ethics, retention, access controls and data transfers require review before real recruitment.

- [Cloudflare architecture / 云端架构](docs/CLOUDFLARE_ARCHITECTURE.md)
- [Research data governance / 研究数据治理](docs/RESEARCH_DATA_GOVERNANCE.md)
- [Release checklist / 发布验收闸门](docs/RELEASE_CHECKLIST.md)
- [D1 design schema / 数据库结构草案](cloudflare/schema.sql)
- [Fail-closed sandbox Worker / 默认关闭研究接口的沙盒骨架](cloudflare/src/worker.mjs)

**Local scaffold tests / 沙盒骨架测试：** `node --test cloudflare/src/worker.test.mjs`. A successful test does not authorise deployment with human participants. / 测试通过不代表已经具备真实研究条件。


## 10. Compatibility check and synthetic E2E / 历史材料兼容性与虚构全流程测试

**中文：** 已取消真实 APIC Word 数据导入器。历史研究资料仅在私有本地环境中只读参照，用于核对网页 A–F 阶段、任务指令与评分量规是否保留原意。**真实数据不转换、不上传、不回放成新系统日志**。实际运行测试使用虚构参与者、模拟 AI 回应和虚构作品，避免重用原研究中的个人资料。

**English:** The historical Word importer has been **cancelled**. Original APIC documents serve as private, read-only reference material for interface/protocol checks. No authentic records are converted, uploaded or replayed as new telemetry. Synthetic participants and mock AI responses drive functional tests.

- [QA Strategy / 测试策略](docs/TEST_STRATEGY.md)
- [Original source field reference (archive only) / 原始字段对照（仅供参考）](docs/LEGACY_APIC_IMPORT_SPEC.md)
- [Fictional test fixture / 完全虚构的测试案例](samples/SYNTHETIC_legacy_apic_record.json)
- [QA tracking Issue #5 / 测试任务](https://github.com/AnnaMonologue/PCR-Research-Lab/issues/5)

**Status / 当前状态：** Existing local mock tests pass; full browser end-to-end and Cloudflare enrollment tests are outstanding. / 本地 Mock 自动化检查已通过，但完整浏览器测试、云端发码和权限测试仍待实现。


## 11. Cloudflare v0.3 mock sandbox / v0.3 Cloudflare 虚构实验沙盒

**中文：** 新增独立的 Cloudflare Worker + D1 研究装置演示，包含**虚构参与者**临时访问码发放、一次性激活、HttpOnly 会话、服务端 A–F 阶段校验、B/D Mock AI 对话及跨阶段上下文、调用额度、撤销与匿名 V2 评审包。中英双语参与者页面位于 `cloudflare/public/`。

**English:** A separate Cloudflare Worker + D1 sandbox implements researcher-issued codes for **synthetic participants**, single-use activation, short-lived HttpOnly sessions, server-enforced A–F progression, B/D mock AI dialogue across stages, per-person quotas, revocation and blinded V2 packet export. The bilingual participant interface is in `cloudflare/public/`.

**Verified locally / 本地验证：** 17 Node tests passed; original PCR structural checks passed. These run against Node 22's in-memory SQLite adapter and **have not been validated against Cloudflare-hosted D1**. / 通过 Node 22 内存 SQLite 的 17 项自动化检查，尚未验证远程 Cloudflare D1。

**Release conditions / 上线边界：** No DeepSeek API calls, no genuine participant materials, no real recruitment. Cloudflare Access researcher authentication, resilient rate limiting, approved privacy/ethics arrangements and browser E2E tests remain outstanding. / 不调用真实模型、不处理真人资料、不开展真人招募；正式权限与伦理验收尚未完成。

- [Cloudflare sandbox runbook / 沙盒部署与操作说明](cloudflare/README.md)
- [Sandbox Worker / 沙盒 Worker](cloudflare/src/worker.mjs)
- [Bilingual participant UI / 双语参与者界面](cloudflare/public/index.html)
- [Integration tests / 服务端集成测试](cloudflare/src/worker.test.mjs)
- [GitHub Actions CI / 自动化测试](.github/workflows/tests.yml)
- [Implementation tracker / v0.3 开发跟踪](https://github.com/AnnaMonologue/PCR-Research-Lab/issues/2)

**Stage distinction / 状态区别：** Code committed to GitHub ≠ Cloudflare deployment ≠ approved human-subject study. / GitHub 源码提交、Cloudflare 部署和获批正式研究是三个不同阶段。
