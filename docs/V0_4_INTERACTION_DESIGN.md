# v0.4 Interaction Design / v0.4 交互设计基线

**Confirmed / 设计已确认：2026-10-09**  
**Implementation / 实现范围：** `demo/` 零安装中英双语离线原型，全部为虚构数据；Cloudflare 和 DeepSeek 仅预留可选接口，不实际连接。

## Participant / 参与者

1. Short information and demo acknowledgement → original task brief → A–F → final review. / 简短说明确认→完整任务介绍→A–F→完成页面。
2. Original phase instructions and independent confirmations for A/C/E/F. / 保留原始阶段说明及独立确认。
3. Every required field must be filled, with inline errors and blocked submission. / 必填校验，未填不可提交。
4. B and D: left-hand five-part V1/V2 editor; right-hand separately scrollable mock AI chat; automatic in-app log; D retains the B thread. / 双栏输入与共用聊天记录。
5. V1/V2 each require 600–800 by the documented deterministic counter. Count button checks the five design fields; edits invalidate the result; submit re-counts. / 自动核验实际字数。
6. C requires two full critiques and optionally a third; E quotes those problems read-only and asks for participant-authored dispositions and evidence. / C 两条必填、一条选填，E 原文引用并自主说明。
7. F retains the original three post-task explanations, including an explicit “none” response for any unadopted AI advice. / F 原三问。

## Judge / 评审

1. Review all blinded V2 designs, then score each design independently on four original 1–5 dimensions with the original 1/3/5 anchors. / 先浏览全部匿名作品，再四维评分。
2. **Per-design short rating note is optional**. / 每份作品的简短备注为选填。
3. After all designs, **overall rating rationale is required**: summary criteria, most influential features, and uncertainties. / 全部评分后填写总体评分依据、影响判断的设计特点和不确定因素。
4. The researcher states original judges shared overall impressions orally, but not in the rating form. The v0.4 interface records a similar step in writing and does not fabricate historical quotations. / 原研究曾有口头总体感受，v0.4 规范其书面记录，不伪造原话。
5. Preserve three final judge confirmations before export. / 保留原表最后三项确认。

## Privacy & validity / 数据与方法边界

No genuine participant records, identities, consent or real provider credentials. The synthetic acknowledgement is not formal approved consent, and Mock AI traces are not DeepSeek logs. Browser storage is intentionally local and insecure for actual research. / 不使用真人数据，不冒充伦理批准或 API 日志。

## Future integrations / 未来接口

`cloudflare/` and `server.js` remain independent *optional* engineering references. No installation, deployment or API calls are needed for the offline walkthrough. / 云端与模型仅预留处理方案。

## v0.4.2 source-consent parity note / v0.4.2 原知情同意书补齐

The provisional information page was replaced with ten collapsible bilingual sections based on the original APIC 2026 participant information sheet, plus six synthetic-only acknowledgements. Historical DeepSeek privacy, eligibility, 7-day withdrawal, five-year retention, quotations and contact provisions are distinguished from the capabilities of this offline mock. No signature or contact details are requested. / 十节说明按原研究材料补齐，六项仅属演示确认，历史条款不冒充模拟系统服务。

See `demo/consent.js` and `docs/DEMO_QA_REPORT.md`.
