# Development Plan / 开发计划与验收标准

## Completed for v0.2.1 / 已完成

- [x] 原 APIC A–F 实验任务流程数字化 / Digital mapping of original APIC A–F stages.
- [x] 原文四维评分量规及评审隔离 / Four-dimension source rubric and separate blinded appraisal packet.
- [x] 本地 Node.js DeepSeek 代理，密钥只在后端 / Local Node.js DeepSeek relay, server-only key.
- [x] B/D 阶段同一段 AI 对话 / B/D stages share an AI conversation.
- [x] 标注为 SYNTHETIC 的模拟数据和模拟模型 / Explicitly fictional samples and mock provider.
- [x] 中英术语表、界面字段和核心操作按钮 / Bilingual glossary, form labels and principal interface controls.
- [x] 研究者发放参与者编号的协议草案 / Researcher-issued participant access design specification.
- [x] 结构化导出、数据字典和本地自动测试 / Structured exports, data dictionary and local automated tests.

## Next stage v0.3 / 下一阶段（优先级顺序）

- [ ] **P0 安全 / Security:** Implement researcher-issued enrollment, salted code hashes, expiring participant session tokens, revocation, budget/quota tracking and security tests. / 研究者人工发码、哈希存储、会话时效、撤销、预算限制和安全测试。
- [ ] **P0 流程 / Protocol:** Make phase order and B/D-only model access authoritative on the server, then test interrupted sessions and retries. / 服务端控制阶段、模型权限、断线恢复及重试。
- [ ] **P0 隐私 / Privacy:** Ethics-approved consent, access roles, private data store, retention/deletion and third-party AI notice. / 伦理批准后的同意流程、分权、私有存储与数据处理说明。
- [ ] **P1 翻译 / Translation:** Complete two-language source anchors and review each phrase against `TERMINOLOGY.md` with change history. / 完成双语量规逐项核对并维护翻译记录。
- [ ] **P1 验证 / Validation:** Browser walkthrough, keyboard accessibility, error handling and real-time use tests with synthetic accounts. / 使用模拟账号验证浏览器、键盘可访问性及异常处理。
- [ ] **P2 研究扩展 / Research:** Introduce experimental conditions or AI guardrails **only after** a new scientific study design is defined. / 新研究设计确定之后再引入护栏条件与干预组。

## Non-goals / 当前不做

No publication claim, no new RP hypotheses, no experimental recruitment, no model fine-tuning, no public API keys, no promise of external-AI compliance. / 当前不宣称新的实证成果、不代拟 RP 假设、不招募真人、不微调模型、不公开密钥、不声称能检测所有外部 AI 使用。

## Submission checklist / 提交前检查

- [ ] 改动是否同时更新中英内容？ / Is each new user-facing statement bilingual?
- [ ] 是否先更新专业术语表？ / Are technical terms registered in the glossary first?
- [ ] 是否重新核对原 APIC 任务与量规？ / Does the change preserve the source task/rubric intent?
- [ ] `npm test` 是否通过？ / Do tests pass?
- [ ] 是否检查 Git 暂存区无密钥、真实记录或身份信息？ / Are staged files free of secrets, real records and identifiers?
