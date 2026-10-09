# 术语与翻译规范 / Terminology and Translation Standard

> Status / 状态：v0.2 bilingual baseline. This glossary governs interface text, documentation, and research descriptions. / 本术语库统一界面、文档与研究叙述的用词。
>
> **Authority / 依据：** APIC 2026 manuscript and original A–F participant/judge instructions for terms specific to the study; commonly accepted research-methods usage for other terms. These translations are for consistent communication; they do **not** constitute validated research instruments. / APIC 原论文和正式操作材料优先；其他词使用常见研究方法学译名。术语翻译本身不构成经过验证的测量工具。

## A. Original APIC study terminology / 原研究核心术语

| 中文（固定译名） | English (canonical) | 界定与用法 / Definition and usage | Data key / 数据字段 |
|---|---|---|---|
| 提示—批评—修订流程 | Prompt–Critique–Refinement (PCR) protocol | 原实验 A–F 分阶段的证据组织流程；不等于学习成效干预已经得到验证。 / Staged evidence protocol, not a validated learning-gain intervention. | `completed.A`–`completed.F` |
| 人机共创 | Human–AI co-creation | 人与 AI 共同参与生成和修改作品的任务情境。 / Task setting involving human and AI contributions to an artefact. | — |
| 独立构思 | Independent pre-AI ideation | A 阶段独立记录构想；强调当时无新 AI 互动，不能证明参与者从未在外部使用 AI。 / Independent initial record; the interface cannot verify external use. | `completed.A` |
| 初稿（第一版设计） | First design (V1) | B 阶段完成的游戏方案。 / First design submitted after AI-supported development. | `completed.B` |
| 独立批评 | Independent critique | C 阶段本人提出问题、任务相关理由和建议，不开展新的 AI 交互。 / Participant-authored problem, reason and proposal without new in-app AI interaction. | `completed.C` |
| 修改建议／批评单元 | Critique unit | 单项“具体问题—理由—初步处理办法”的分析单位。 / One problem–reason–proposed response unit. | `critN_*` |
| 修订 | Refinement / revision | D 阶段与 AI 继续讨论并形成 V2。 / Further work with AI to produce V2. | `completed.D` |
| 最终设计（第二版） | Final design (V2) | 提交给独立评审的游戏设计文本。 / Final product supplied for independent judging. | `completed.D` |
| 批评—修订关联 | Critique-to-revision linkage | 对 C 中的每条建议核对 E 的处理解释及 V1–V2 变化；不能仅凭自报确认实际执行。 / Trace critique through response and observable change. | `completed.E` |
| 事后解释 | Post-task explanation | F 阶段参与者对变化和来源的自述；与过程数据分开核验。 / Participant report, cross-checked against process evidence. | `completed.F` |
| 过程证据 | Process evidence | 关于提出问题、讨论与修改的可观察记录；不直接证明内部认知。 / Observable task records, not direct evidence of internal cognition. | `events`, `transcript` |
| 产品层面评价 | Product-level appraisal | 仅评价匿名 V2 的四个评分维度，不推断 AI 贡献比例或学习效果。 / Ratings of final V2, not learning gain or contribution attribution. | `scores` |
| 整体创新表现 | Global innovation | 评估设计整体的新意、连贯性及学习目标与互动反馈的整合。 / Overall novelty, coherence, and integration. | `global_innovation` |
| 独创性 | Originality | 评估玩法、规则和词汇运用的区别性。 / Distinctiveness of game mechanics and vocabulary use. | `originality` |
| 教育用途 | Educational usefulness | 评估主动词汇练习及及时清晰的反馈。 / Opportunities for active practice and intelligible feedback. | `educational_usefulness` |
| 可行性与任务适配 | Feasibility and task fit | 评估方案的可实施程度及任务约束满足情况。 / Practical executability and alignment with stated constraints. | `feasibility_task_fit` |
| 评分量规 | Analytic rating rubric | 四维 1–5 分，以 1、3、5 分的描述性锚点指导独立判断；软件未验证量规效度。 / Four 1–5 dimensions, with descriptive anchors at 1, 3, 5. | `PCR.ANCHORS` |
| 评分者／评审 | Judge / rater | 独立评价匿名 V2 的人员；界面统一使用“评审／Judge”。 / Independent scorer of V2 only. | `judge_id` |
| 匿名评审包 | Blinded review packet | 仅包含随机评审编号和 V2；自由文本仍需手工检查识别信息。 / Packet with review codes and final products only; manual review still necessary. | `pcr-blinded-review-v1` |
| 私有编号映射 | Private ID mapping | 评审编号与会话编号之间的对应，绝不能传给评审。 / Confidential review-to-session identifier mapping. | `pcr-private-map-v1` |

## B. Research software and methodological terminology / 研究软件与方法术语

| 中文（固定译名） | English (canonical) | 界定与用法 / Definition and usage |
|---|---|---|
| 参与者 | Participant | 执行 A–F 的用户；研究者与评审是不同角色。 / User performing staged activity, distinct from researcher and judge. |
| 研究者 | Researcher | 导入和检查记录、准备匿名评分包的操作人员。 / Operator validating records and preparing blinded packets. |
| 实验原型／研究装置 | Research prototype / instrument | 旨在展示可运行研究流程的软件；尚未获伦理许可用于正式收集。 / Functioning study-process demonstration, not authorised for recruitment. |
| 行为事件日志 | Behavioural event log | 记录软件可观察事件；日志不证明人的真实动机。 / Logged observable software events, not proof of intent. |
| 对话记录 | Conversation transcript | 按顺序保存的参与者与 AI 消息。 / Ordered user–AI utterances. |
| 应用程序接口 | Application programming interface (API) | 页面通过本地后端调用 DeepSeek。 / Integration point between application backend and model provider. |
| 服务端 | Server-side / backend | 保管密钥并向 DeepSeek 发起请求；浏览器代码不含密钥。 / Trusted relay for model requests and credentials. |
| 接口密钥 | API key | 访问 DeepSeek 的机密凭据，不上传 GitHub。 / Secret credential; must not be committed. |
| 模拟响应／合成测试数据 | Mock response / synthetic test data | 用于工程和测试；不得声称来自真人或等于有效实证证据。 / Fictional fixtures for engineering tests only. |
| 去标识化／假名化 | De-identification / pseudonymisation | 删除直接标识或以代码替代；不保证绝对匿名。 / Remove identifiers or replace names with codes; re-identification risk remains. |
| 数据字典 | Data dictionary | 对 JSON 字段、取值与来源的说明。 / Schema documentation for recorded fields. |
| 研究协议 | Research protocol | 任务、程序及可允许操作的详细规则。 / Study task and procedure specification. |
| 自动保存草稿 | Draft autosave | 本地浏览器的可修改缓存；非防篡改审计记录。 / Editable local draft, not a tamper-evident audit trail. |
| 阶段锁定 | Stage locking | 页面限制修改已提交内容，无法证明外部工具未被使用。 / UI constraint, not proof of compliance. |
| 伦理审批 | Ethics approval | 真实招募和研究收集的必要前置审核。 / Review required before authentic human-subject collection. |
| 复现性／可复现性 | Reproducibility | 他人能检查流程、实现和数据处理步骤；并不保证重现相同研究结果。 / Ability to inspect and rerun implementation and analysis. |
| 构念效度 | Construct validity | 测量或推断是否真正对应欲研究的理论构念。 / Whether observations support interpretation about intended constructs. |
| 评分者间一致性 | Inter-rater agreement | 不同评审评分的一致程度；不等于量规的构念效度。 / Agreement across judges, not equivalent to construct validity. |
| 随机化 | Randomisation | 明确的随机分配程序；本工具当前只对匿名评审项目显示顺序进行打乱。 / Formal random assignment; current tool only shuffles review-item ordering. |
| 个性化脚手架 | Adaptive scaffolding | 可能的后续研究概念，当前没有实施或检验。 / Future research concept; not implemented or tested. |
| 护栏 | Guardrail | AI 帮助方式/内容约束。当前仅固定任务系统提示，不代表有效的教育护栏干预。 / Constraints on AI assistance; not a validated intervention here. |

## C. Translation / terminology rules · 翻译维护规则

1. Original APIC task instructions and rating anchors are **frozen conceptual references**. Translate faithfully; log substantive changes under `docs/PROTOCOL.md` and `CHANGELOG.md`. / 原研究任务和评分锚点为概念基线；忠实翻译，实质性修改须记录。
2. Keep **code identifiers, JSON schema names, API field names, and A–F / V1 / V2 / J01 / J02** unchanged in both languages. / 技术字段名与编号跨语言保持一致。
3. Avoid translating **critique** as “批判性思维能力” and **judgement** as “真实认知能力”: these are stronger constructs than logged behaviour warrants. / 不将可观察“批评行为”偷换成心理能力。
4. Distinguish *blinded* (评审看不到过程与会话编号) from guaranteed *anonymous* (绝对无法识别); software can only enforce packet-level separation. / 区分盲评与绝对匿名。
5. Distinguish *mock/synthetic* (测试数据) from actual participant observations. / 测试数据与真实实证记录必须分开。
6. For new technical or methodological terms, update this glossary **before** updating bilingual UI or documentation; record contested alternatives explicitly. / 新增专业术语，先入库再进入界面或文档。

