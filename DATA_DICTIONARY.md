# Data Dictionary / 数据字典

**v0.2.1 / 技术演示版** · 字段名在中英版本中保持不变 / Field identifiers are stable across Chinese and English.

Browser timestamps use the user's device clock; AI events use the local server clock. Neither clock is authenticated. / 表单时间来自参与者设备；AI 日志时间来自本地服务器。两种时钟均非可信时间戳服务。

## 1. Participant export / 参与者导出 `pcr-participant-v1`

| Key / 字段 | 中文定义 | English definition |
|---|---|---|
| `schema` | 数据类型标识 | Schema discriminator |
| `version` | 软件版本 | Software version |
| `session_id` | 随机生成的假名会话号；不代表实名 | Random pseudonymous session identifier, not a real name |
| `started_at`, `finished_at` | 会话起止时间字符串 | Start and finish time strings |
| `phase_index` | 完成阶段索引，6 表示结束 | Stage progress: 6 indicates completion |
| `drafts` | 未提交、可修改的浏览器草稿 | Editable unsubmitted browser drafts |
| `completed.A` | 独立构思、机制、词汇练习及设计重点 | Independent idea, mechanism, vocabulary plan and priorities |
| `completed.B` | V1 五部分文本、B 阶段对话、模型标签、自报字数 | V1 sections, B transcript, model label, self-reported length |
| `completed.C` | 两条必填、一条选填的批评单元（问题、理由、建议） | Two required and one optional critique units (problem, reason, proposal) |
| `completed.D` | V2 五部分文本、D 阶段对话及同一对话确认 | V2, D transcript, same-conversation confirmation |
| `completed.E` | 批评的处理选择及对应证据说明 | Handling decision and stated evidence per critique |
| `completed.F` | 最终变化、来源判断及未采纳建议的事后解释 | Post-task explanation of changes, perceived sources and rejected suggestions |
| `events[]` | `{seq,type,stage,at,details}` 页面事件日志 | Browser event list with ordered event metadata |
| `events[].details.transcript_origin` | B/D 采用 `api_captured`；其他为 `not_applicable` | Provenance of transcript field in the client export |

**Interpretation / 解释边界：** Client-side stage locking and timestamps can be modified. B/D conversation copies exported through the browser are *not* authoritative server logs. / 浏览器导出的锁定状态与时间可被用户改动；导出内的 B/D 对话副本不能代替服务端原始日志。

## 2. Blinded review packet / 匿名评审包 `pcr-blinded-review-v1`

| Field | 中文 | English |
|---|---|---|
| `packet_id`, `created_at`, `task` | 评审包编号、制作时间与公共任务说明 | Packet ID, creation time and common task specification |
| `items[]` | 匿名设计列表 | Blinded design items |
| `items[].review_id` | 评审用随机编号，例如 R01 | Blind review ID, e.g., R01 |
| `items[].v2` | V2 材料、规则、词汇练习、结束方式、理由 | V2 materials, rules, learning/feedback, ending and rationale |

The packet excludes the participant ID, A/B/C/E/F fields, transcripts and private mapping. Free text must still be checked for identifiers. / 不含参与者编号、过程数据及私有映射，但 V2 自由文本仍需人工核查潜在身份信息。

## 3. Private mapping / 私有编号映射 `pcr-private-map-v1`

`packet_id`, `created_at`, `map[]` (`review_id` → `session_id`). Confidential to the researcher; do not provide this mapping to judges or upload to GitHub. / 记录评审编号到会话编号的对应关系，仅限研究者使用，禁止交给评审或公开上传。

## 4. Judge scores / 评审评分 `pcr-judge-scores-v1`

| Key | 中文固定译名 | English canonical label |
|---|---|---|
| `packet_id`, `judge_id`, `completed_at` | 评审包编号、评审编号、完成时间 | Packet, judge and completion metadata |
| `scores[]` | 含匿名作品编号、四项 1–5 分及选填备注 | Each review ID, four 1–5 ratings and optional notes |
| `global_innovation` | 整体创新表现 | Global innovation |
| `originality` | 独创性 | Originality |
| `educational_usefulness` | 教育用途 | Educational usefulness |
| `feasibility_task_fit` | 可行性与任务适配 | Feasibility and task fit |

**Boundary / 边界：** These assess the V2 **product** only. They do not establish how much a student learned or whether a human or AI authored individual elements. / 评分只针对最终作品，不能直接推断学习结果或人类与 AI 的贡献比例。

## 5. Local AI log / 本地 AI 日志 `pcr-ai-session-v1`

Stored privately in `runtime/S-*.json` (ignored by Git). / 存于 Git 排除的私有本地目录。

| Field | 中文 | English |
|---|---|---|
| `session_id`, `created_at`, `provider`, `model`, `thinking` | 会话及模型配置 | Session identifiers and model settings |
| `turns[]` | 按序保存 `{role,stage,content,at,request_id}`；AI 消息附 `model`, `usage`, `finish_reason` | Ordered turns and AI response metadata |
| `events[]` | 服务端 `ai_success` / `ai_error` 事件及请求编号 | Server-side model-request events and IDs |
| `transcripts.B`, `transcripts.D` | 按阶段提取的文字记录；D 请求会使用 B 的上文 | Stage-filtered transcripts; D uses previous B context |

Do not upload raw prompts. Match browser export and server log by `session_id` before analysis, and inspect omissions or retries. / 原始提示词可能包含敏感信息。分析前必须核对会话编号与缺失、重试情况，不得公开上传原始对话。

## 6. Future enrollment data / 未来访问码数据（未实现）

The proposed design adds `participant_id`, a **salted hash** of a one-time code, code expiry, scoped session metadata and usage counters. It will not export the plaintext access code or DeepSeek API key. / 未来登记册拟增加参与者编号、一次性码盐化哈希、有效期、会话权限与配额；绝不导出访问码明文或 DeepSeek 密钥。详见 [`docs/PARTICIPANT_ACCESS.md`](docs/PARTICIPANT_ACCESS.md)。


## 7. Legacy APIC source mapping / 历史材料映射

The historical submission format is distinct from future in-app API telemetry. / 原 APIC 人工 Word 提交资料与未来 API 原生日志严格分开。

| 来源 / Original source | 字段 / Structured field | 关键限制 / Boundary |
|---|---|---|
| A–F Word submissions / 参与者提交表 | `stage_data.A`–`stage_data.F` | Blank fields remain `null`; missing optional third critique is `not_applicable`. / 缺失不得填造 |
| Dialogue template “A. 形成 V1” | `ai_transcript.B` | Manually copied, not API captured. / 参与者手动复制，映射到 PCR B |
| Dialogue template “B. 修订 V2” | `ai_transcript.D` | Manually copied, not API captured. / 参与者手动复制，映射到 PCR D |
| Original product ratings / 原评审评分 | independent judge record / 独立评审记录 | Only blinded V2; no private crosswalk. / 禁止评审获取身份映射 |

See [bilingual legacy import specification](docs/LEGACY_APIC_IMPORT_SPEC.md) and [synthetic fixture](samples/SYNTHETIC_legacy_apic_record.json). / 详见双语字段规范与虚构样例。
