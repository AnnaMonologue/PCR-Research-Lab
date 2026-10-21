# PCR Research Lab v0.4.1 — Verification / 本轮测试与局限

**Date / 日期:** 2026-10-21
**Scope / 范围:** Offline synthetic-only prototype; no DeepSeek API, no Cloudflare deployment, no real participant data.

## Automated verification / 自动化测试

- `npm test` using Node.js 22.16.0: **33/33 passing, 0 failing**; the legacy PCR structural and safety tests also passed. / 33 项通过，0 失败。
- Reproduced and fixed one old-server test regression from consolidating the entrypoints. / 修复旧版入口重定向引起的首页兼容性测试问题。
- Additional static checks: old entrypoints redirect to `demo/index.html`, collapsible phase sidebar exists, consent precedes A, C shows independent V1 reference, and no live API fetch occurs in the demo. / 新增入口与界面检查。

## Browser interaction / 浏览器实际操作

- Headless Chromium with Playwright executed actual v0.4.1 HTML/CSS/JavaScript through a browser DOM using an isolated in-memory `localStorage` substitute. / 在独立的 Chromium 页面加载同一套页面源码并操作真实控件。
- Confirmed: issue synthetic code → login → consent confirmation → task brief → A → B (mock chat, 615-character sample design) → C (read-only V1 + two critiques) → D (same B/D chat and Mock response) → E (read-only V2 + participant-written evidence) → F → researcher blinded packet → J01 & J02 ratings, overall rationales, final confirmations and exports. **No JavaScript page errors**. / 全流程及双评审通过，无脚本错误。
- Screenshots inspected for B two-column editor/chat and C two-column V1/reference and independent critiques. / 检查双栏视觉结果。

**Limitation / 限制：** This environment blocks direct browser navigation to local `file://` URLs. The browser test injected the *same files* into a browser document. Windows double-click opening is still a separate, user-side compatibility check. / 当前环境无法直接访问本地文件 URL，Windows 双击需用户验证。

**Provenance and scope / 来源与范围：** `DeepSeek-V4.1-Flash` is merely a planned API integration label. The participant demo uses its own deterministic Mock response and makes **no external AI request**. HTML mock IDs and localStorage are not secure identity, consent or research data storage. / 不表示真实调用模型，也不用于真人实验。
