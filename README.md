# PCR Research Lab｜PCR 人机共创研究实验室

**Prompt–Critique–Refinement (PCR) / 提示—批评—修订流程 · v0.4.0**

**Start here / 从这里开始：** 解压后直接打开 **[`demo/index.html`](demo/index.html)**。无需软件安装、服务器、Cloudflare 或 DeepSeek API。/ Unzip and open `demo/index.html` directly in your browser. No installation or API keys.

> **RESEARCH PROTOTYPE · SYNTHETIC ONLY / 研究原型，仅供完全虚构数据演示。** 项目基于作者 APIC 2026 的既有实验方法，展示六阶段任务、页面内 Mock AI 对话、匿名 V2 评审和结构化输出。不能用于真实招募、知情同意或正式数据收集。/ Demonstrates staged research instrumentation, not approved recruitment, live model use or empirical findings.

## v0.4 interactive demonstration / v0.4 交互原型

| 页面 / Screen | 操作 / Function |
|---|---|
| 研究者 / Researcher | 虚构编号与访问码发放；进度概览、匿名 V2 评审包、JSON 导出 / Mock issuance, progress, blind packet, JSON export |
| 参与者入口 / Participant entry | 简短研究说明和虚构模式确认，12 词任务介绍 / Information, acknowledgement and task brief |
| A、C、E、F | 独立填写，逐字段必填校验，AI 禁用 / Independent responses, required checks, no AI |
| B、D | 左侧 V1/V2 五项作品编辑，右侧可滚动的 Mock AI 对话，完整聊天自动记录且同一上下文 / Two-panel design editor + continuous mock chat |
| V1/V2 字数 / Text length | 页面核算五项总长度，600–800 才可继续；文本变更后重新核验 / Deterministic count, validates again on submit |
| 评审 / Judge | 先通读全部匿名 V2；四维 1–5 分；单份备注选填；总体评分说明必填；三项最终确认 / Browse, rate, optional notes, overall rationale and confirmations |

**详细操作 / Instructions:** [`demo/README.md`](demo/README.md)。
**实现测试 / QA report:** [`docs/DEMO_QA_REPORT.md`](docs/DEMO_QA_REPORT.md)。
**已确认的原型规范 / Approved design:** [`docs/V0_4_INTERACTION_DESIGN.md`](docs/V0_4_INTERACTION_DESIGN.md)（GitHub 版本亦可查看）。

## Original research boundary / 原研究边界

原 APIC 实验的 A–F 任务包括：A AI 前构思；B AI 辅助 V1；C 独立批评（两条必填、一条选填）；D 在同一 AI 会话中完成 V2；E 独立解释每条批评的处理；F 独立事后说明。V1、V2 分别限制在 600–800 字。作品任务为 2–4 名零基础中国大学生设计覆盖 12 个马来语词汇、≤15 分钟、≤人民币 30 元材料且有主动练习与明确反馈的互动游戏。

The original APIC procedure separates process evidence from independently rated V2 products. The v0.4 implementation is a **software demonstration** and makes no new learning-gain, causal, construct-validity or authorship claims. / 新版网页产生的 Mock 轨迹不能追认为原实验的自动 API 日志。

原匿名评分表包含四个维度：整体创新表现、独创性、教育用途、可行性与任务适配。每份作品的简短备注**选填**；原研究评审曾口头给出总体感受而没有写在原评分表中。v0.4 将总体评分说明书面化，但不追认历史记录。/ Per-design comments remain optional; written overall rationale formalises oral feedback as reported by the researcher without inventing historical quotations.

## Integration stubs / 可选预留接口

`cloudflare/` 保存 Cloudflare Workers、D1 的独立模拟代码与配置说明；`server.js`、`.env.example` 为可选的本地 DeepSeek 接入参考。**无需安装、部署或实际连接任何服务。** The offline `demo/` never loads keys or invokes provider APIs. / 当前无需配置任何真实模型密钥。

## Tests & access / 测试与数据安全

开发者可运行 `npm test`（需 Node.js 22+ 执行全套包含 SQLite 测试的检查；普通用户不用安装 Node）。/ Developers may run the automated tests; ordinary users need no tools.

All demo IDs, prompts, AI turns and scores are fictional. No authentic APIC 2026 records, consent forms, identity mappings, API keys or private judges' data are included. Browser `localStorage` is not secure research storage; never enter real participant information. / 演示编号只是交互样例，绝非真实身份验证。

**GitHub Actions:** Manual trigger only (`workflow_dispatch`) to avoid repeated emails on small commits. / 自动检查保持手动触发。

**License / 许可：** `UNLICENSED`。公开可见不自动授予复用许可。/ Public visibility does not imply reuse rights.

**Source work / 源研究：** Shen (2026), *Shifting Assessment Focus: Managing Behaviour and Measuring Innovation Performance in Human–AI Co-creation* (APIC 2026).
