# Participant Access and Researcher-Issued Codes / 参与者访问码与研究者发放机制

**Status / 状态:** PROPOSED FOR v0.3 — **NOT IMPLEMENTED in v0.2.1**. / 本文是下一版本的设计说明，当前程序尚未实现这些安全控制。

## 1. Design decision / 核心决定

**中文：** 研究者只向参与者发放实验编号（Participant ID）和短期访问码（Access Code），绝不发放 DeepSeek API 密钥。密钥仅保存在受控的服务端运行环境内。参与者通过研究者指定的 HTTPS 网页访问实验，B/D 阶段的 AI 请求由后端统一转发、计量和记录。

**English:** The researcher issues only a **participant ID** and an **expiring access code**. The DeepSeek API key remains on a protected backend, never in browser JavaScript, enrollment messages, GitHub or participant-facing API responses. The approved HTTPS service relays, meters and records model calls in phases B/D.

## 2. Planned roles / 角色边界

| 角色 Role | 知道什么 / Receives | 不能访问 / Must not access |
|---|---|---|
| 研究者 Researcher | 代码登记册、独立数据对应表、费用情况 / Issuance registry, private mapping, usage dashboard | 不应通过公开网页泄露密钥 / Must not expose credentials in public pages |
| 参与者 Participant | `P001` 类型编号及专属临时码 / Pseudonymous ID and code | 主 API Key、他人会话、评分材料 / Main API credential, other sessions, judge material |
| 评审 Judge | `R01` 类型匿名设计编号及 V2 / Blinded review ID and V2 only | P 编号、对话、批评、个人身份 / P IDs, transcripts, critique data or personal identifiers |

## 3. Human workflow / 人工发放流程

1. **Invitation / 邀请：** 研究者通过私人渠道向潜在成人参与者提供研究说明。招募渠道由已获批研究方案决定。 / Researcher provides the approved information sheet privately to potential adult volunteers.
2. **Enrollment / 登记：** 参与者确认有兴趣后，研究者在**私有**登记册内记录发放状态，生成无个人含义的编号（如 `P001`）与随机码；**不要用微信号、邮箱、生日或姓名编码**。 / Researcher issues a pseudonymous ID and cryptographically random code; never derives identifiers from personal details.
3. **Delivery / 发放：** 编号和临时代码通过安全的私有渠道发送，避免公开群聊。 / Send the ID and code through a private channel, not a public group.
4. **In-app consent / 页面同意：** 网页呈现经过伦理批准的详细说明，参与者主动选择同意后才开始记录研究任务。 / Show an approved information sheet and collect explicit consent before task logging.
5. **Access / 身份验证：** 受保护的服务端验证访问码、有效期及剩余额度，并设置一个有效期短、仅限本人的会话。 / Server validates enrollment and creates a short-lived, scoped session.
6. **Control / 过程限制：** 服务端仅允许完成 A→B→C→D→E→F 的合法顺序，B/D 可调用模型。 / Backend enforces stage progression and authorises AI only in B/D.
7. **Revocation / 终止：** 完成、退出、超额或研究者撤销时，访问码立即失效。 / Completion, withdrawal, exhaustion or researcher revocation invalidates access.

## 4. Planned credential and rate controls / 凭证与额度控制

- **Code / 访问码：** 至少 128 位随机熵；仅存密码学哈希及盐值，不保存明文。 / Use a cryptographically random enrollment secret with a salted password hash.
- **One participant = one code / 一人一码：** 代码应一次激活，并限制绑定的会话、设备重新验证与并发请求；不把编号本身当密码。 / Participant ID is not an authentication secret.
- **Expiration / 过期：** 设置有效期和允许重新发放规则；以预先批准的任务窗口为准。 / Enforce expiry and an explicit reissue policy.
- **Quota / 费用限制：** 每人最大请求次数、每次上下文与 token 上限、每日总预算、错误重试上限；全局熔断。 / Per-participant request/token limits, total budget, bounded retry and a global circuit breaker.
- **Provider / 模型：** 固定模型标识和关键生成参数，保存实际返回模型名；模型供应商更新时标记协议变更。 / Pin documented settings and log provider-returned identifiers; report provider drift.
- **Security / 安全：** HTTPS、同源策略、认证 cookie 的 Secure/HttpOnly/SameSite 属性、CSRF 保护、针对凭证猜测的速率限制和安全错误响应。 / HTTPS, secure session cookies, CSRF defenses, brute-force protection and non-leaking errors.
- **State / 状态：** 服务端记录经验证的阶段状态，禁止客户端凭修改 JSON 绕过 A/C/E/F。 / Server-authoritative phase state; do not trust browser JSON for authorisation.
- **Data / 数据：** 加密存储、权限隔离、备份、删除与撤回策略，并核实向 DeepSeek 跨境传输文本的伦理及法律适配。 / Encrypted storage, least privilege, backups, retention, withdrawal/deletion process and cross-border model transfer review.

## 5. Planned API contract (illustrative, not implemented) / 拟定接口（示意，尚未开发）

| Method/Path | 中文用途 | English meaning |
|---|---|---|
| `POST /api/admin/issue` | 研究者认证后创建登记及访问码 | Authenticated researcher enrollment issuance |
| `POST /api/participant/activate` | 验证编号+访问码、建立会话 | Redeem participant ID and code for a scoped session |
| `GET /api/participant/state` | 安全恢复本人研究阶段 | Resume authenticated participant state |
| `POST /api/participant/stage` | 服务端验证并保存阶段提交 | Server-validated phase commit |
| `POST /api/participant/chat` | 仅 B/D 经授权调用模型 | Authorised in-phase AI relay |
| `POST /api/participant/withdraw` | 停用凭证并执行撤回流程 | Revoke session and initiate withdrawal handling |

**Do not implement an endpoint that returns the DeepSeek API key. / 不应设计任何返回 DeepSeek API Key 的接口。**

## 6. Practical deployment phases / 实施阶段

| Stage | 中文 | English |
|---|---|---|
| v0.2.1 | 可公开的本地演示；没有登录 | Public source, localhost demonstration; no authentication |
| v0.3 | 本地模拟研究者发码、参与者登录及额度限制 | Local mocked issuance, login and quota tests |
| Pilot candidate | 获批后上线 HTTPS、受保护服务器、持久数据库、运维监控 | Ethics-reviewed HTTPS deployment with secure storage and monitoring |
| Live study | 完成书面伦理许可、试运行和撤回机制后招募成年人 | Begin adult recruitment only after all approvals and operational gates |

## 7. Research interpretation / 研究解释边界

An access code proves only that a session used a researcher-issued credential. It **cannot prove the actual person's identity**, their independence from outside AI, or their cognitive engagement. An in-app guardrail constrains *this system only*. / 访问码仅说明某次会话使用了研究者发放的凭证；无法证明实际操作者身份、没有使用外部 AI 或其内部认知活动。页面护栏只能约束本系统。
