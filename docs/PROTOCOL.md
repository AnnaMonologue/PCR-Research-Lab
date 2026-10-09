# APIC 2026 Protocol Mapping / 原研究协议与软件改编

**Source / 来源：** *Shifting Assessment Focus: Managing Behaviour and Measuring Innovation Performance in Human–AI Co-creation*, APIC 2026. This instrument digitises the **existing** PCR protocol and does not make new empirical claims. / 当前软件将既有 PCR 流程数字化，不代表已完成新的实证研究。

## Common educational design task / 统一教育游戏任务
**中文：** 为 2–4 名零基础中国大学生设计不超过 15 分钟、覆盖指定 12 个马来语日常词汇的互动教育游戏；包含主动练习与反馈，每组常见材料成本不超过人民币 30 元。V1/V2 均说明材料、规则、练习反馈、结束方式和设计理由。原 Word 操作材料要求 600–800 字，计数规则尚未在软件中校准。

**English:** Design a ≤15-minute interactive educational game for 2–4 Chinese university beginners learning 12 supplied Malay words, including active practice, feedback and ≤CNY 30 in common materials per group. V1/V2 each cover preparation, rules, practice and feedback, ending and rationale. The source Word-based protocol specifies 600–800 Chinese characters/words as counted there; automated counting is not yet calibrated.

| Phase | Rules | Inputs | Current software implementation |
| --- | --- | --- | --- |
| A | No GenAI | 4 pre-AI planning prompts | Browser form, frozen upon submit |
| B | AI allowed | AI interaction; structured V1 | AI chat provided by local server; transcript saved automatically; V1 entered by learner |
| C | No new AI | 2 required critique units and optional 3rd, each with issue/reason/proposal | Protected separate form, no chat control |
| D | AI allowed | Further AI interaction; revised V2 | Same server conversation as B; additional messages logged, V2 entered by learner |
| E | No AI | Critique-to-revision mapping | 5-category handling choice + evidence per critique |
| F | No AI | Explanatory self-report | Independent written reflection |
| Judge | No process disclosure | Anonymised V2 only | Four 1–5 scales with 1/3/5 anchors; raters independent |

## Changes relative to historical APIC implementation / 相对原研究的技术改动

1. **原研究 / Original:** DeepSeek 网页端，参与者手动将对话复制到提交表；participants copied website conversations to document forms. **软件版 / v0.2.1:** 内嵌服务器代理的 DeepSeek API 聊天，自动记录消息和时间戳 / embedded API chat records messages and timestamps. **属于工具改编，非完全复现 / Instrument adaptation, not identical replication.**
2. The server model and its configuration are logged; the official DeepSeek API can update the underlying model. Document actual requested and returned model names.
3. In-browser stage lock and server-stage restrictions do not prevent external AI, time manipulation, browser inspection or deliberate protocol violations. See `SECURITY_AND_ETHICS.md`.
4. Scoring dimensions assess final product quality, **not** student learning, cognition, AI trust, or innovation improvement caused by AI.
5. Current v0.2 is an engineering demonstration using fictional data, not a ready-to-recruit experiment.

## Data relationship / 数据关联

`session_id` links participant A–F export with server-side B/D conversation log. `review_id` maps to anonymous V2 through a **private** local mapping exported by the researcher; judges do not receive `session_id`, dialogue, stage timestamps, or critique text. Manually review all V2 artefacts for embedded names before distributing.

## Participant access / 参与者身份管理

当前 v0.2.1 允许仅本地演示时自建会话，不具备研究者发码或安全身份校验。下一阶段拟采用独立参与者编号加临时访问码，详见 [`PARTICIPANT_ACCESS.md`](PARTICIPANT_ACCESS.md)。 / v0.2.1 creates unauthenticated sessions for localhost demonstration. Researcher-issued pseudonymous IDs and expiring codes are specified for a future release, not implemented.
