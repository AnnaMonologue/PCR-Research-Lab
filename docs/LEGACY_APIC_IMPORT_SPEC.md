# 原 APIC 字段到 PCR Research Lab 的映射 / Legacy APIC Import Specification

**设计规范 v0.3 / Design specification v0.3** · **NO ACTUAL PARTICIPANT DATA IN THIS REPOSITORY / 本仓库不含真实参与者数据**.

## Evidence provenance / 证据来源

**中文：**原 APIC 2026 的材料为参与者填写的 Word 表格、由参与者复制保存的 DeepSeek 网页对话，以及两名评审独立填写的评分表。这些是历史研究文档。未来 PCR Research Lab 的真实 API 日志来自新系统，必须与历史 Word 材料分开保存和解释。

**English:** Original APIC evidence consisted of participant-submitted Word forms, participant-copied DeepSeek website transcripts, and separate judge rating forms. Future native API telemetry must remain distinct from these historical submissions.

| 原始文档区段 / Legacy source | 新规范字段 / Target | 限制 / Limitation |
|---|---|---|
| 提交表 A：独立构思 / Independent ideation | `stage_data.A.idea, mechanism, vocabulary, priority` | 只有原表回答 / Submitted answers only |
| 提交表 B：形成 V1 / First design | `stage_data.B.materials, rules, learning, ending, rationale` | Word 自报字数须另核 / Word-reported length needs checking |
| 提交表 C：独立批评 / Independent critique | `stage_data.C.critique_units[]` containing problem, reason, proposed_response | 两条必填，第三条可选；缺失不可补写 / Two required, third optional; never reconstruct |
| 提交表 D：形成 V2 / Final design | `stage_data.D.*` same five keys | 不能推断实际页面事件 / Cannot infer actual browser actions |
| 提交表 E：逐条处理说明 / Critique handling | `stage_data.E.dispositions[]` | 必须核实**已勾选**选项，印刷选项文字不算选择 / Verify marked choice, not printed options |
| 提交表 F：事后解释 / Post-task account | `stage_data.F.main_change, source, rejected` | 自述与实际版本变化须分开 / Self-report distinct from observed change |
| AI 对话模板 “A. 形成 V1” | `ai_transcript.B[]` | **对话表 A = PCR B** / Dialogue-form A maps to PCR B |
| AI 对话模板 “B. 修订 V2” | `ai_transcript.D[]` | **对话表 B = PCR D** / Dialogue-form B maps to PCR D |
| 知情同意/身份登记 / Consent/identity | 研究者独立私有记录 / Separate restricted registry | 不进入公开示例或评审包 / Never publish or send to judges |
| J01/J02 评分表 / Judge records | 独立 `pcr-judge-scores-v1` 数据通道 | 只评价匿名 V2 / Appraise blinded V2 only |

## Source checks / 原始材料检查

- 必须核实来源版本、案例映射与原始 Word 表格布局 / Verify document version and private case mapping.
- 允许 2 条或 3 条批评单元；结构变体应保留 / Allow 2 or 3 critique units.
- AI 表格合并、换行及截图可能改变文字解析结果；人工核对 B/D 边界 / Review merged cells, line breaks and screenshots.
- 使用 `present`, `missing`, `not_applicable`, `unreadable`, `unverified` 字段状态 / Preserve explicit field-quality states.
- 历史资料不存在 API request ID、token usage 或服务端逐轮时间戳；不得自动填充这些字段 / Never fabricate native API metadata.
- 同意书存在不等于同意已核实 / Consent-form existence is not verified consent.
- **严禁**由 AI 对话反向补写原提交表缺失答案 / Never fill missing form answers from the transcript.
- 审查完成前不转换真实参与者数据，不进行重编码或改变已发表统计结果 / No real-data conversion, recoding or alteration of published counts before review.

## Public demonstration / 公开样例

- [Schema / 数据结构](../schemas/pcr-legacy-import-v1.schema.json)
- [SYNTHETIC example / 完全虚构样例](../samples/SYNTHETIC_legacy_apic_record.json)
- [Automated structure checks / 结构校验测试](../tests/legacy-import.test.js)

**Conversion status / 转换状态:** specification and synthetic sample only. / 当前仅完成规范和虚构样例；未把历史 Word 批量导入 Cloudflare。
