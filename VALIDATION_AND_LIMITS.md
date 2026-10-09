# Validation and Limits / 验证与适用边界

## Engineering checks / 工程检查

Run `npm test` from Node.js 20+. / 在 Node.js 20+ 环境运行 `npm test`。

| 检查项目 / Check | 说明 / Meaning |
|---|---|
| 阶段顺序 / Stage order | 验证 A→F 提交顺序与必填字段 / Validates phase order and required input |
| 匿名评分 / Blinded appraisal | 匿名 V2 与私有编号映射相互分离 / Separates V2 packet from confidential mapping |
| 评分有效值 / Rating bounds | 四维均为 1–5 整数 / Enforces four integer scores in the 1–5 range |
| CSV 保护 / CSV safety | 降低公式注入风险 / Mitigates spreadsheet formula injection |
| AI 阶段 / AI phase restrictions | API 仅接受 B/D，D 要求已有 B 消息 / API accepts B/D only; D requires B history |
| 去重 / Idempotency | 相同 `request_id` 不重复记录同一次完成的模型请求 / Reuses a completed request result |
| 文件与跨域限制 / File and origin restrictions | 本地静态文件白名单、拒绝其他来源的跨域请求 / Limits file exposure and blocks disallowed origins |

**Latest local automated result / 最近一次本地自动检查：** 7 server tests and protocol data-function tests passed. / 七项服务端测试及原流程数据函数检查均通过。

## Important exclusions / 不构成的保证

- Browser-side forms do not provide verified identity, server-enforced stages or tamper-proof logs. / 浏览器端不提供实名认证、服务端阶段强制或防篡改证据。
- No human-subject deployment, ethics approval, formal measurement validation or full-browser usability validation is claimed. / 尚未进行真实参与者部署、正式伦理批准、测量效度验证或完整浏览器人工测试。
- The DeepSeek API may differ from the historical web product and may change over time. / DeepSeek API 与历史网页端有差异，模型也可能更新。
- The reviewer packet limits exposure to process information but cannot automatically erase identifiers embedded in V2. / 盲评包无法自动清除 V2 文本中可能出现的身份线索。
- Participant access code issuance is **documented as a proposal**, not implemented. / 研究者手动发码登录目前只是设计文档，并未实现。

## Release gate / 正式研究上线前验收

See [`docs/SECURITY_AND_ETHICS.md`](docs/SECURITY_AND_ETHICS.md), [`docs/PARTICIPANT_ACCESS.md`](docs/PARTICIPANT_ACCESS.md) and [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for security, ethics, access, storage and human testing requirements. / 正式上线前须通过安全、伦理、访问控制、可靠存储及人员测试闸门。
