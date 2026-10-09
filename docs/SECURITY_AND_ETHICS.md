# Security, Privacy and Ethics / 安全、隐私与研究伦理

**Status / 状态:** Development demonstration only. Local server listens on `127.0.0.1`. It has **no participant authentication**, HTTPS, authoritative stage state, verified consent workflow, remote deployment security or formal research data governance. **Do not deploy for real participants yet.** / 目前仅本机技术演示；无参与者认证、HTTPS、服务端强制阶段状态、正式知情同意或完整数据治理。禁止直接用于真人线上实验。

## 1. Secrets / 密钥

- Keep `DEEPSEEK_API_KEY` only in local `.env` or protected server-side deployment secrets; never in GitHub, browser HTML, client JS, issue descriptions, screenshots or participant messages. / API Key 仅保存在受控服务端环境。
- `.gitignore` excludes `.env`, local logs and research exports. Check the **actual commit tree** before each push; a Git ignore rule alone does not remove previously committed secrets. / 每次提交前检查暂存区；忽略规则不能清除旧提交历史中的秘密。
- Revoke/rotate any key accidentally leaked. / 发现泄漏立即撤销并轮换。
- Future participants receive only a scoped, expiring **access code**; see [`PARTICIPANT_ACCESS.md`](PARTICIPANT_ACCESS.md). / 未来参与者只领取有时间和用途限制的访问码。

## 2. Data boundaries / 数据范围

AI server logs contain raw prompts and responses, phase labels, timestamps, model identifiers and reported usage. Browser drafts/exports live separately and are editable; neither constitutes tamper-proof evidence. / AI 服务端日志包括原始消息、阶段、时间戳、模型及用量；浏览器保存的表单可被用户修改，二者都不是不可篡改证据。

Published GitHub content is limited to software, documentation, blank protocols and conspicuously fictional `SYNTHETIC_` examples. Do not publish identifiable texts, signed consents, real participant submissions, actual judge scores/identity, or private identifier mappings. / 公开仓库只存放源码、文档、空白流程和明确虚构的数据，不公开真实参与者/评审的身份信息、评分、对话或编号映射。

## 3. Research ethics / 研究伦理

Before recruitment obtain applicable ethics approval and confirm informed-consent language, withdrawal period, third-party AI text processing, privacy and international data transfers, retention/deletion terms and independent judge access restrictions. Institutional and regional rules govern implementation. / 招募前需要完成适用的伦理审批，明确知情同意、撤回、第三方模型数据处理、跨境数据、保存期限和评审权限；以实际机构法规为准。

## 4. Threats / 已知风险

- Public source is **not** a participant-facing production website. / 公开源码不代表正式实验网站。
- Session IDs in v0.2.1 are self-generated and not authenticated; never expose the local API to a network. / 当前会话编号可由页面自建，没有认证，禁止联网开放。
- Client UI restrictions cannot prove A/C/E/F were completed without external AI. / 前端阶段控制无法证明没有用外部 AI。
- Review packets exclude process data, but V2 free text can still identify people; researcher must inspect it. / V2 自由文本仍可能含可识别信息，需人工检查。
- Cost limits, access limits, authoritative storage, rollback/retries and consent are **future work**. / 费用控制、身份验证、可靠存储、重试与同意流程仍待开发。
- API implementation changes the platform relative to the original DeepSeek website study; reproducibility requires model-version records and reporting of this difference. / API 与网页端存在差异，须作为研究协议变更记录。

## 5. Current release gate / 当前上线闸门

**Not cleared:** identity and access management; TLS deployment; storage lifecycle; participant disclosure and consent; budget guard; server-state controls; vulnerability assessment; supervised rehearsal and human-subject authorisation. / 未通过身份认证、HTTPS、数据治理、知情同意、预算限额、服务端流程控制、安全检查、演练和伦理审批等闸门。当前只能进行合成数据技术测试。
