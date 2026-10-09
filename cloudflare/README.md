# Cloudflare v0.3 Mock Sandbox / Cloudflare v0.3 模拟沙盒

> **Only synthetic participants and mock AI / 仅限虚构参与者与模拟 AI。** No DeepSeek calls, no actual APIC case data, no real recruitment. / 不调用 DeepSeek、不导入真实 APIC 原始记录、不招募真人。

## Implemented / 已实现

- Researcher-issued random codes through a CLI guarded by a sandbox-only bearer credential. / 研究者通过测试管理凭证发放随机访问码。
- One-time activation and short-lived Secure, HttpOnly, SameSite session cookies. / 一次激活与安全会话 Cookie。
- D1 persistence of stage records and mock AI turns. / D1 保存阶段答案及虚构 AI 对话。
- Server-enforced A→B→C→D→E→F order; AI only in B and D; continued conversation. / 服务器控制阶段，B/D 续接对话。
- Per-participant mock call quotas, replay protection, revoke, blinded V2 packet. / 调用额度、防重复请求、撤销和匿名 V2 评审包。
- Bilingual participant interface in `public/`. / 中英双语参与者网页。

## Local setup / 本地配置

1. Install Node 22+ and Cloudflare Wrangler in your own environment. / 安装 Node 22+ 与 Cloudflare Wrangler。
2. In `cloudflare/`, copy `wrangler.example.jsonc` to `wrangler.jsonc`. Create an **isolated synthetic-only** D1 database and replace its database ID. / 创建独立 D1 测试库并填写 ID。
3. Copy `.dev.vars.example` to `.dev.vars`, replacing BOTH placeholders with independent random secrets (at least 32 characters). / 为 HMAC 与管理端创建独立高熵密钥。
4. From `cloudflare/` / 在该目录执行：

```bash
npx wrangler d1 migrations apply pcr-research-lab-sandbox --local
npx wrangler dev --local
```

5. Issue a synthetic code via the CLI, using a privately controlled HTTPS sandbox endpoint. / 通过研究者命令行在受控 HTTPS 测试环境中发码：

```bash
PCR_SANDBOX_URL=https://YOUR-SANDBOX-URL RESEARCHER_DEMO_TOKEN=YOUR_PRIVATE_TOKEN node cloudflare/scripts/admin.mjs issue
PCR_SANDBOX_URL=https://YOUR-SANDBOX-URL RESEARCHER_DEMO_TOKEN=YOUR_PRIVATE_TOKEN node cloudflare/scripts/admin.mjs summary
PCR_SANDBOX_URL=https://YOUR-SANDBOX-URL RESEARCHER_DEMO_TOKEN=YOUR_PRIVATE_TOKEN node cloudflare/scripts/admin.mjs packet
```

The researcher CLI enforces HTTPS. Wrangler's default localhost HTTP endpoint can instead be exercised with the in-memory automated tests or via a trusted local HTTPS proxy. **Do not weaken credential checks to make a public demo work.** / CLI 强制 HTTPS，本地 HTTP 请使用自动化测试或受信任的 HTTPS 代理；不得为演示关闭验证。

## Testing / 测试

```bash
npm test
node --test cloudflare/src/worker.test.mjs
```

Node's experimental in-memory SQLite adapter simulates D1 statements, including transactional batches. / 本地使用 Node 内存 SQLite 作为测试替身；尚未在 Cloudflare 远程 D1 环境验证。

## Important limitations / 重要限制

This is an engineering sandbox, **not research-ready**. Cloudflare Access researcher identity, durable anti-abuse, tested backup/deletion/withdrawal policy, real staging deployment, and ethics/privacy processing approval are outstanding. A bearer demo token is **not** a production researcher-login solution. / 研究者正式身份验证、滥用防护、备份删除、正式部署和伦理要求尚未完成。测试管理密钥不能替代正式登录方案。

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare D1 Worker API](https://developers.cloudflare.com/d1/worker-api/)
- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
