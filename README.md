# PCR Research Lab｜PCR 人机共创研究实验室

**Prompt–Critique–Refinement (PCR) / 提示—批评—修订流程**  
**Research instrumentation prototype / 研究装置原型 · v0.2.1**

> **研究开发演示 / DEVELOPMENT DEMO ONLY.** This public source repository includes **no actual study participants, research records, or API credentials**. It is not ready for remote recruitment or authentic data collection. / 本公开源码仓库不包含真实参与者资料、研究记录或 API 密钥；目前不能开展线上真实招募和数据采集。

- [QA / 测试报告](docs/DEMO_QA_REPORT.md)

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

## 11. Cloudflare v0.3 mock sandbox / Cloudflare v0.3 模拟沙盒（本地实现，未上线）

**中文：** 已建立独立 Cloudflare Worker + D1 数据模型，包含随机虚构访问码签发、单次激活、HttpOnly Cookie、服务端 A–F 阶段锁定、B/D Mock AI 对话、调用额度、撤销和匿名 V2 包导出。参与者测试网页位于 `cloudflare/public/`。**不需要原 APIC 真实参与者记录，不调用真实 DeepSeek，不允许真实受试者进入。**

**English:** A separate mock-only Cloudflare Worker + D1 sandbox now implements synthetic invitation issuance, single-use activation, scoped HttpOnly sessions, server-validated A–F steps, B/D mock chat, quotas, revocation and blinded V2 export. The standalone participant UI lives in `cloudflare/public/`. **No authentic APIC records, actual DeepSeek calls or real human participants.**

This is **locally tested code**, not a deployed Cloudflare application or a secure production study. / 目前是**已通过本地自动测试的代码**，尚未部署到 Cloudflare，也不构成正式研究系统。

- [Cloudflare v0.3 README / 本地模拟沙盒使用说明](cloudflare/README.md)
- [Mock Worker / 模拟服务器](cloudflare/src/worker.mjs)
- [Integration tests / SQLite 内存集成测试](cloudflare/src/worker.test.mjs)
- [Synthetic test webpage / 虚构参与者网页](cloudflare/public/index.html)

To run current automated checks / 运行自动化检查：`npm test`.

**Release blocker / 上线阻断项：** Cloudflare Access researcher identity, durable abuse protection, backup/recovery, Cloudflare-hosted D1 validation, formal privacy and ethics approval. / 研究者身份校验、滥用防护、备份、真实 Cloudflare D1 验证及伦理审查尚未完成。


## v0.4 locked interaction design / v0.4 已确认交互设计（尚未实现）

**中文：** 2026-10-09 已确认 v0.4 的界面设计。包括：简短研究说明和确认、独立任务介绍、A–F 每阶段说明与字段校验、B/D 双栏作品编辑和模拟 AI 对话、600–800 字自动统计、C→E 逐项对应、匿名 V2 评审。**每份设计的简短评分备注选填**；全部评分后新增**总体评分说明（原型扩展）**，最后保留原表的三项评审确认。

**English:** The owner approved the v0.4 interface design on 2026-10-09: study-information acknowledgement, task brief, bilingual A–F guidance and required-field checks, two-pane B/D mock AI and artefact editor, deterministic 600–800 length validation, critique dispositions, and blinded V2 review. **Per-design rating notes remain optional**, while a **prototype-only overall rating rationale** follows completion of all scores, before the original three final confirmations.

**Status / 状态:** Requirements are fixed; the v0.4 UI **is not yet implemented**. This remains an offline synthetic-only prototype; Cloudflare and DeepSeek are documented extension points only. / 当前仅确认设计并记录实施任务，不代表完成新版功能、云端部署或真实 AI 调用。

- [Approved v0.4 bilingual spec / 已确认的 v0.4 设计规范](docs/V0_4_INTERACTION_DESIGN.md)
- [Implementation checklist Issue #6 / 实现与验收任务](https://github.com/AnnaMonologue/PCR-Research-Lab/issues/6)
- [Canonical terminology / 双语术语库](docs/TERMINOLOGY.md)

**Testing policy / 测试策略:** Implement first, then execute one consolidated test-and-fix cycle; leave GitHub Actions manual-only. / 全部修改完成后再集中测试与修复，Actions 保持手动。
