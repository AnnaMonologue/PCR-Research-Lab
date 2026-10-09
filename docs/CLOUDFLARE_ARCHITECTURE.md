# Cloudflare 架构方案 / Cloudflare Research Architecture

**v0.3 design only / v0.3 设计阶段；NOT deployed / 尚未部署。**

## Decision / 架构决定

| 部件 / Component | 中文说明 | English |
|---|---|---|
| Cloudflare Workers Static Assets | 托管参与者网页，不直接公开无认证的研究者/评审管理界面 | Host participant UI; do not expose unprotected admin/rater tools |
| Cloudflare Worker | 服务端访问验证、A–F 阶段状态、B/D 模型中转、日志、额度 | Authenticate, enforce A–F, relay B/D model calls, log and meter |
| D1 | 假名化参与记录、交互、会话和配额；身份映射另存 | Pseudonymous study data, sessions and quotas; separate identity map |
| Workers Secrets | 仅服务端保管 DeepSeek 密钥及验证机密 | Server-side API credential and authentication secrets |
| Cloudflare Access | 保护研究者专用的发码/撤销后台，并在 Worker 端验证身份 | Protect researcher administration; verify identity server-side |
| R2 (optional) | 以后有大文件、加密导出才加入 | Add later only if large private exports are needed |

**禁止 / Prohibited:** 给参与者加密的 DeepSeek API Key 和解密密码。客户端能解密就能复制凭证。/ Never give participants an encrypted provider key and its decryption password.

## Enrollment / 人工发放访问码

1. 研究者通过获批渠道邀请成年人，提供研究说明。/ Researcher invites eligible adults with an approved information sheet.
2. 管理端生成 P001 等无个人含义编号和高熵随机访问码（建议 192 bits）。/ Generate a pseudonymous ID and high-entropy 192-bit invitation code.
3. 数据库仅存 HMAC-SHA-256 访问码摘要，HMAC 密钥在 Workers Secrets。/ Store only an HMAC digest; keep the pepper as a Worker secret.
4. 研究者**私下**发送编号与访问码；不用姓名、邮箱或微信号作编号。/ Send the code privately; never encode identity in the ID.
5. 服务端验证限速、过期与状态，创建短期、作用域受限的会话 Cookie：Secure、HttpOnly、SameSite=Strict。/ Enforce expiry/rate-limits and issue a short-lived scoped cookie.
6. 获批同意版本确认后才能提交 A–F；仅 B、D 开放模型请求。/ Permit A–F after approved consent; only B/D may call AI.
7. 完成、超额、被撤销或退出后停止访问；数据保留/删除按获批方案执行。/ Revoke access on completion, exhaustion or withdrawal; honour approved retention rules.

## Endpoint plan / 接口规划

| API | 用途 / Purpose | Gate / 前置验证 |
|---|---|---|
| POST /api/activate | 编号+临时码换会话 / Redeem code | 限速、HMAC、未使用、未过期 |
| GET /api/state | 恢复本人进度 / Resume | scoped session cookie |
| POST /api/consent | 记录同意版本 / Consent | affirmative consent, session |
| POST /api/stage | 提交且封存当前阶段 / Commit stage | server-authoritative A→F transition |
| POST /api/chat | 调用 DeepSeek / Model relay | B/D only, quota, idempotency, input limits |
| POST /api/withdraw | 终止并记录撤回 / Withdraw | session or separately verified request |
| /admin/* | 研究者发码、撤销、导出 / Researcher controls | Cloudflare Access + server-side verification |

每次 AI 调用在发送上游前预留额度，并记录 request_id、模型、成功/错误、token 与费用估计；同时设全局停机开关和预算上限。/ Reserve quota before upstream calls; log idempotency, vendor model, status and token usage; implement a global circuit breaker.

**Server-side security gates / 服务端安全：** exact-origin validation, CSRF protection, secure cookies, replay protection, per-person restrictions, safe errors, injection/XSS checks, access audit and offline backups. A participant ID alone is never authentication. / 仅有编号不可视为登录成功。

## Data and encryption / 数据与加密

The draft D1 schema is in [cloudflare/schema.sql](../cloudflare/schema.sql). D1 has Cloudflare-managed AES-256 encryption at rest and TLS encryption in transit; this is **not end-to-end encryption**. Both Cloudflare and DeepSeek are third parties and require processing and transfer review. / D1 提供托管静态和传输加密，但这不代表端到端保密；需要单独核查 Cloudflare 与 DeepSeek 的数据处理和跨境要求。

Keep actual contact details, identifiable consent, real submissions and private mappings out of this public repository and out of judges' packets. / 真实身份、同意书、数据和映射不能进入公开仓库或评审包。

## Gates / 阶段闸门

- **0 GitHub demo / 公开演示:** local Mock, synthetic records only. / 本地 Mock + 合成记录。
- **1 Cloudflare sandbox / 云端沙盒:** mock-only Worker, isolated D1, researcher auth, session and quota tests. / 模拟研究者账号和自动化测试。
- **2 Simulated E2E / 全链路测试:** expiry, multiple tabs, duplicate requests, loss of connection, withdrawal, backup/restore, review-packet isolation. / 中断与并发、撤回和盲评测试。
- **3 Ethics-approved collection / 获批真实研究:** supervisor/institution approvals, bilingual consent, third-party risk review, tested backup and budget, live model key. / 伦理、数据、财务与安全验收后方可开放。

**Do not deploy the earlier localhost Node server publicly. / 不得将旧版无身份验证的本地 Node 服务器直接上线。**

## Official documentation / 官方资料

- https://developers.cloudflare.com/workers/configuration/secrets/
- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/d1/reference/data-security/
- https://developers.cloudflare.com/d1/configuration/data-location/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/


## Implementation note (2026-10-09) / 实现进度

**中文：** v0.3 模拟沙盒已在 `cloudflare/src/worker.mjs`、`cloudflare/public/` 与 `cloudflare/migrations/` 实现基本发码、会话、A–F、B/D Mock 对话及匿名 V2 包；对应 Node 22 内存 SQLite 自动化测试已经通过。这里的测试管理密钥 **仅供沙盒 CLI 使用**，还没有接入 Cloudflare Access。尚未部署到真实 Cloudflare D1。

**English:** The v0.3 mock sandbox implements synthetic issuance/session handling, staged submissions, B/D mock AI and blinded V2 exports. Node 22 in-memory SQLite tests pass. The CLI demonstration bearer token is **not** Cloudflare Access-based identity verification; a live Cloudflare D1 deployment has not been performed.

See [cloudflare/README.md](../cloudflare/README.md). / 详见沙盒运行文档。
