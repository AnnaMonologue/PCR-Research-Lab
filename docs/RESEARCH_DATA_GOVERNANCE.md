# 研究数据与保密边界 / Research Data Governance

> Draft for planning only / 仅供规划，**not approved consent material / 非已获批的知情同意文件**。

## Limitations / 需要如实披露的局限

- 使用 Cloudflare 第三方托管，不拥有自建的物理服务器；可减少运维负担，但不能声称“只有我能够接触数据”。/ Third-party hosting reduces maintenance, but does not guarantee researcher-exclusive access.
- D1 静态加密和 TLS 传输加密不能自动成为端到端加密。/ D1 encryption at rest and TLS do not constitute end-to-end encryption.
- 浏览器日志仅覆盖站内行为；不能证明参与者没有访问站外 AI，也不能直接解释认知。/ In-app logs cannot prove absence of external AI use or infer private cognition.
- DeepSeek API 与原 APIC 论文的网页端操作可能使用不同模型设置和用户界面；记录这些协议差异。/ The API may differ from the original study's browser interface; document deviations.
- Cloudflare 和 DeepSeek 可能故障或限流；必须准备断点恢复、退出和中断处理。/ Account for outages, retries and interrupted participation.

## Data tiers / 数据分级

| 数据 / Data | 位置 / Storage | 允许访问 / Access |
|---|---|---|
| 真实姓名、联系方式、身份对应 / Real identity map | 单独加密的研究者登记册 / Separate encrypted registry | 研究者 / Researcher |
| 邀请码 / Invitation code | 明文只发送给本人；D1 仅存 HMAC / Participant receives code; D1 hash only | Worker + participant |
| A–F 作答及 AI 对话 / Study text and AI turns | D1 受控库（按许可保存）/ Controlled database | Authorized researcher only |
| 同意记录 / Consent evidence | 单独的受控记录 / Separate restricted record | Authorized researcher |
| V2 盲评包 / Blinded V2 packet | 去识别化独立导出 / De-identified separate export | Assigned judges |
| SYNTHETIC_ 数据 / Synthetic fixtures | GitHub 可公开 / Public repository | Public |

## Before involving real people / 开始真实参与者研究前

1. 完成学校伦理审核，明确招募、补偿、撤回、删除与保存期限。/ Obtain ethics approval and fix recruitment, compensation, withdrawal and retention.
2. 核查 Cloudflare 和 DeepSeek 的数据处理条款、所在地与跨境传输；D1 地域限制不自动限制 DeepSeek。/ Verify each provider and transfer; D1 locality does not constrain model processing.
3. 使用经过审核的中英双语研究说明和知情同意文案。/ Use approved bilingual participant information and consent.
4. 防范自由文本出现真实身份、他人资料；测试评分包去标识化。/ Check free-text PII and rater packet de-identification.
5. 做最小权限配置、备份/恢复演练、撤销、服务中断与账单阈值测试。/ Test permissions, backup/restore, revocation, outages and cost limits.
6. 不承诺撤回后可以同步删除 DeepSeek 已经接收到的内容，除非服务商条款支持。/ Do not promise upstream deletion without contractual evidence.

## Accurate supervisor-facing statement / 向导师如实说明

**中文：**考虑到独立研究者的运维条件，我将项目区分为公开可复现的工程演示和受访问控制的研究环境。API Key 只放在服务端密钥管理中，参与者领取临时访问码。研究环境通过服务端记录阶段、限定额度并审计交互。Cloudflare 与 DeepSeek 的第三方处理、跨境传输和学校伦理审批是正式实施的前置条件；系统无法控制站外行为。

**English:** Given the infrastructure constraints of an independent researcher, I separate a public, reproducible engineering demonstration from an access-controlled research environment. Provider credentials remain in server-side secrets; participants receive expiring access codes. The research service will enforce staged tasks, quotas and auditable logs. Third-party processing, international data transfers and institutional ethics approval remain release conditions. The system cannot verify off-platform behaviour.
