# v0.4 交互设计规范（已确认） / v0.4 Interaction Design Specification (Approved)

**Decision date / 确认日期:** 2026-10-09
**Status / 状态:** DESIGN LOCKED — IMPLEMENTATION NOT STARTED / 设计已确认，尚未按本规范实现
**Scope / 范围:** Zero-install bilingual offline **synthetic-only** research prototype. Cloudflare and DeepSeek are **adapter/implementation plans only**: do not install, deploy or call paid APIs. / 零安装、中英双语、完全虚构的离线研究原型；Cloudflare、DeepSeek 只预留接口和接入方案，不实际安装、部署或调用。

## 1. Decisions / 关键决定

1. Short study-information / consent-confirmation entry page, followed by a separate task brief. The demo displays a prominent **synthetic-only** disclaimer; it does not fabricate ethics approval or store authentic consent. / 独立简短知情说明及主动确认，再进入任务介绍；演示模式不可冒充正式研究知情同意。
2. Every A–F page explains **what to do, what may be done with AI, what to submit**, following the original APIC document. / 每个阶段先展示原任务要求及 AI 规则。
3. Field-specific required validation; incomplete required fields block progression, with inline error messages and focus to the first invalid field. Do **not** use a modal window for every input. / 字段级必填校验，不弹出大量窗口。
4. B/D use a two-column design editor (left) + independently scrollable AI conversation (right), with a composer docked in the chat pane. On mobile, stack panels without discarding the chat transcript. / B、D 桌面双栏，移动端上下排列。
5. Persist all in-app B/D participant messages and mock-model replies in order, with phase labels and timestamps. D continues B's same dialogue. **Mock traces are not DeepSeek API captures.** / B、D 同一上下文；自动记录原型内模拟对话，来源必须准确。
6. Replace manual 600–800-character declaration with deterministic **Count / 统计字数**; B and D require a counted, valid 600–800 result to submit; re-count on submit. / 删除“手填 630 字”，网页自动计算并双重核验。
7. In C, critiques 1 and 2 are mandatory: C1 addresses vocabulary learning or feedback, C2 addresses play mechanics, feasibility or rules; critique 3 is optional and all-or-none if started. No AI access. / C 前两项必填、第三项选填；无 AI。
8. In E, show each original C critique read-only; participant selects the original five-category handling status **and independently writes** what changed in V2 or why it was not adopted. Include C3 only if completed. No AI access. / E 自动引用 C 的问题，但处理说明由参与者本人填写。
9. Judge workflow: review all blinded V2 works before scoring; rate each on four original 1–5 dimensions with original 1/3/5 anchors; **per-design short rating note OPTIONAL**, not required. The judge cannot see process data, participant identities or another judge's scores. / 单份评分备注**选填**，保留原量规和盲评隔离。
10. After **all** designs are rated, show a new **Overall Rating Rationale / 总体评分说明** page. This is explicitly a **prototype extension**, not a field in the original APIC judge form. Then show the **three original judge submission confirmations** and export/finish. / 全部评分后新增总体说明页，最后保留原表三项确认。

## 2. Participant journey / 参与者页面顺序

| Screen / 页面 | Purpose and contents / 目的与内容 | Exit gate / 继续条件 |
|---|---|---|
| P0 Study information & synthetic acknowledgement / 研究说明与确认 | Short purpose, time, in-app records, optional mock AI, privacy limitations, voluntary stop; do not claim actual consent approval / 简要研究说明、模拟数据限制 | Affirmative unchecked-by-default checkbox / 参与者主动勾选 |
| P1 Task brief / 任务说明 | The original 12 Malay words, 2–4 Chinese university students without prior Malay, max 15-minute game, CNY 30 materials, active practice, explicit feedback, interactive format, approx. 1 h task / 原任务完整约束 | Confirm reading / 确认已阅读 |
| A Pre-AI ideation / 独立构思 | Original four questions: initial idea, mechanics, 12-word practice, highest priority; participant independent-work confirmation / 原四题 | Four nonblank responses + independent-work check / 四项必填及确认 |
| B AI-supported V1 / 初稿 | Left: five original design components; Right: Mock AI chat / 左侧五项设计，右侧模拟对话 | Five nonblank fields, at least one mock dialogue turn, counted 600–800 and phase check / 五项、对话和字数有效 |
| C Independent critiques / 独立批评 | Read-only V1; C1 vocabulary/feedback, C2 mechanics/feasibility/rules; optional C3; problem, reason, proposal each / V1 只读、2+1 批评 | All six mandatory C1/C2 fields + optional C3 all-or-none, independent-work check / 前两项全填、第三条整体选填 |
| D AI-supported V2 / 修订 | Left: five V2 design components; Right: **same preserved** B/D Mock AI conversation / 与 B 同一模拟聊天 | Five nonblank fields, D chat interaction, counted 600–800 / 五项、对话和字数有效 |
| E Critique disposition / 处理说明 | Read-only C problem and optionally V2 preview; choose one original status plus participant-authored evidence for each / 原问题只读，选择处理及自行说明 | Status and evidence required for each completed critique; independent-work check / 已填批评逐条说明 |
| F Post-task account / 事后解释 | Original F1 major change and why; F2 own / AI / jointly developed and why; F3 rejected AI advice and why (allow an explicit “none”) / 原三问 | All three answered (F3 can explicitly say none) + independent-work check / 三问及确认 |
| P2 Final review and export / 最后确认 | Completion A–F, actual elapsed time, counted V1/V2, record of mock turns, export fictional JSON, finish / 显示完成与导出 | Completion plus export/finish action; no automatic upload / 完成后可导出，无自动上传 |

**Phase lock / 阶段锁定:** Autosave drafts but do not silently commit; progression only after synchronous validation and explicit submit. C must be submitted before entering D; previous submitted evidence is read-only, with any corrective reopening designed separately and logged. / 草稿自动保存，提交需明确确认；C 锁定后才可进入 D。

## 3. B/D two-panel layout / 作品与 AI 双栏布局

- Header contains phase-specific instructions and source task constraints. / 页头展示本阶段说明。
- Left editor contains five **distinct textareas**, with field-specific labels and required indicators: materials/preparation/cost; flow/rules/≤15 minutes and all 12 words; vocabulary practice/feedback; scoring/ending; rationale. / 左侧五项设计字段。
- Right chat contains role-labelled message bubbles, independently scrollable message list, persistent input composer, Send action, response status and a clear **MOCK AI / 模拟 AI** marker. / 右侧聊天独立滚动，发送栏固定。
- Keep original B chat visible when entering D; do not reset context; phase-tag new turns as D. / D 续接 B。
- Disable AI composer entirely in A/C/E/F; a read-only dialogue in those phases is optional only if it does not undermine the original instructions (C specifically displays V1 only). / 禁用阶段不能发 AI 消息，C 默认只展示 V1。
- Editor content is participant-owned: AI response is never automatically inserted into V1/V2. / AI 回复不得自动覆盖设计。
- Event log captures visible in-app prompt, response, stage, time and mock/provider provenance; no fabricated upstream API identifiers, costs or tokens. / 不伪造真实 API 信息。

## 4. Word-count design / 字数校验与定义

**Source constraint / 原约束:** V1 and V2 must each be 600–800 Chinese-language characters/words as checked manually with Word in the original APIC task. The redesigned prototype calculates this from submitted content rather than asking the participant or AI to report a number. / 原研究为使用 Word 人工核对 600–800 字；新原型以程序计算替代自报。

**Recommended deterministic demo counter / 建议原型算法（需用样例与 Word 对照核验后定稿）:**
- Count individual Han-script characters as one; count each consecutive Latin-letter/number token as one; ignore punctuation and whitespace; do not count labels, prompts or chat. / 汉字逐字计，连续英文及数字按词计，排除标点、空格、界面标签和 AI 对话。
- Concatenate the **five V1** fields for B, the **five V2** fields for D; show result and interpretation, e.g. “583 / 600–800 · 需补充 17 / 17 fewer than minimum.” / 只统计各自五个作品字段。
- Pressing **Count / 统计字数** reports count and updates validation state; editing any field marks the previous result stale; pressing **Submit** always re-counts and blocks if outside inclusive range. / 点击统计后显示结果，修改自动使旧结果失效，提交再核验。
- This is a new documented measurement convention; **not automatically identical to Microsoft Word counting** in mixed-language text. Version the algorithm and document any residual differences. / 和 Word 混合语言字数可能不一致，必须标注计算规则。
- No fabricated “word_count: 630” for an actually shorter sample. The synthetic test generator should produce genuinely valid-length fictional text or explicitly bypass only within a test harness, never in the normal UI. / 虚构样例也必须真的达到范围，界面不得虚报。

## 5. E original handling options / E 原始处理选项

| 中文（原表） | English | Meaning / 含义 |
|---|---|---|
| 按原想法落实 | Implemented as proposed | Claims the critique's preferred response was implemented / 声称按原处理 |
| 换一种方式落实 | Implemented differently | Different implementation than first proposed / 采用不同方式 |
| 有理由未采用 | Not adopted with reason | State the reason / 说明未采纳原因 |
| 没有处理 | Not addressed | Explicitly acknowledge not handled / 明确未处理 |
| 说不清 | Unclear | Participant cannot determine disposition / 自报无法判断 |

Show C critique verbatim as read-only reference. Required free-text evidence remains **the participant's own words**, even if “not addressed” or “unclear” is selected. The system does not claim that choosing a category proves the V2 actually changed. / 状态选择不构成客观证据，后续仍需核对 V2。

## 6. Judge journey / 评审工作流

| Step / 步骤 | UI and requirements / 界面与要求 |
|---|---|
| J0 Judge instructions / 评审说明 | Judge ID, independent/confidentiality instructions, original task constraints and target vocabulary / 评审须知和任务要求 |
| J1 Browse all blinded V2 / 先通读 | Scrollable list/read-only designs; only V2, no process materials or other judges' scores. / 先通读匿名作品 |
| J2 Rate each / 逐份评分 | Four independent integer ratings 1–5; show the **original** 1/3/5 anchors and 2/4 intermediate interpretation. **Optional** `rating_note` per design. / 四项必须打分，单份简短备注选填 |
| J3 Audit all scores / 评分核查 | Summary table of all blinded IDs, four rating status columns, ability to revisit before final lock. / 漏评阻断提交 |
| J4 Overall rating rationale / 总体评分说明（原型新增） | **Required concise free-text** response describing main cross-design scoring criteria, what patterns/features most influenced judgments, and any uncertainty or difficult decisions (allow “none” for uncertainty). No model-generated explanation. / 全部评分后填写总体评分依据、重点和不确定性（无可写“无”） |
| J5 Original final confirmations / 原表提交确认 | Three independent checks: reviewed all works and rated independently; did not discuss or view other judge's scores; verified all four dimensions are integers 1–5. Then export and finish. / 原始三项确认后结束 |

**Method note / 方法备注:** Original APIC judge forms require four scores per design and have a `简短备注（选填）` column, followed by three submission checks; they **do not contain** an overall rating-rationale page. The latter is explicitly added for prototype demonstration and should not be retroactively described as an APIC measurement. / 新增总体评分说明仅属于新版原型。

## 7. Implementation and QA acceptance / 实施与验收标准

- [ ] Works by opening `demo/index.html` directly, with **no installations**, Cloudflare account, API key or server. / 本地 HTML 双击可运行。
- [ ] Full flow P0→P1→A→B→C→D→E→F→P2 with bilingual guidance and save/resume. / 全程双语、草稿恢复。
- [ ] Each required empty field prevents next-phase submission; visible inline error and focus; C3 optional/conditional E3. / 字段级校验。
- [ ] B/D split view and keyboard-accessible, independently scrollable mock chat; B transcript continues in D. / 双栏与对话连续。
- [ ] Real calculated V1/V2 600–800, including re-check on submit; all sample fills produce valid actual lengths. / 真正的字数核验。
- [ ] No AI prompts may be sent from A/C/E/F; C locked before D; E written by participant. / AI 禁用与阶段锁定。
- [ ] Judge reviews all works, scores all four dimensions, per-design rating note **optional**, overall rationale **required**, three original confirmations. / 评分备注选填，总体说明必填。
- [ ] Blinded reviewer packet hides all process logs, participant ID and private crosswalk; reviewer cannot inspect another judge's scores within its assigned view. / 盲评隔离。
- [ ] Export JSON marks data SYNTHETIC, Mock AI, UI-defined count algorithm and any prototype-only fields; no genuine APIC cases. / 来源明示。
- [ ] Run complete tests **once after all code changes**, fix failures and re-run until green; GitHub Actions stays manual-only to prevent notification spam. / 全部修改完成再集中测试、修错到通过，不恢复自动 Actions 通知。

## 8. Boundaries / 适用限制

- Do **not** import or convert real APIC 2026 records. They remain private reference documents only. / 不转换真实旧数据。
- Do **not** pretend prototype confirmation constitutes approved human-subject informed consent. / 演示确认不是正式伦理同意。
- No paid DeepSeek API, real credential delivery, Cloudflare installation/deployment or actual human-subject recruitment in v0.4. Only document extension points. / 不接入真实 API、Cloudflare 或真人数据。
- Preserve terminology from [TERMINOLOGY.md](TERMINOLOGY.md) and task/rubric from [PROTOCOL.md](PROTOCOL.md). / 统一双语术语。
