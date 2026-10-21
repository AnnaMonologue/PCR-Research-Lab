# PCR Research Lab v0.4.2 — Verification / 测试与限制

**Date / 日期:** 2026-10-21  
**Scope / 范围:** Source-consent alignment, offline synthetic-only workflow, frontend cleanup. No real participant data, live DeepSeek calls or Cloudflare deployment.

## Source material review / 原始知情说明核对

The original APIC 2026 **《参与者说明与知情同意》** consists of **10 information sections and 6 consent checks**. The preceding prototype reduced this to only three short descriptions and one confirmation. v0.4.2 adds a bilingual, collapsible ten-section review covering:

1. Research purpose / 研究目的
2. Eligibility / 参加条件
3. A–F procedure / 任务流程
4. Recorded data / 收集材料
5. DeepSeek third-party privacy / 第三方 AI 隐私
6. Risks and safeguards / 风险与应对
7. Benefits and compensation / 收益与报酬
8. Voluntary participation and original seven-day withdrawal / 自愿参加和原研究 7 日撤回
9. Original five-year retention, confidentiality and anonymous quotation / 五年保存、保密及匿名引用
10. Summary and contact channels / 研究摘要与联系

Six **demo-specific acknowledgements** cover the source confirmation topics. Real signatures, contact details, optional summary registration and identities are not requested or publicly stored. Historical DeepSeek website processing, withdrawal and retention policies are accurately described as **historical source terms**, not services provided by this synthetic browser-only prototype. / 六项为演示确认，不冒充获批研究同意；原研究 7 日撤回与 5 年保存不能套用到当前 Mock 数据。

## Automated checks / 自动化

- `npm test` on Node.js 22.16.0: **37 tests passed, 0 failed**; additional original-PCR structural checks passed. / 36 项全部通过。
- Added 3 tests covering the ten source sections, six demonstration checks, consent script loading, and removal of obsolete frontend scripts. / 增加知情说明和无用代码清理专项测试，并验证可选本地服务正确提供 consent.js。
- An additional HTTP regression confirms the optional local server serves `demo/consent.js` and does not serve removed v0.2 scripts. / 新增 HTTP 回归测试校验旧脚本不再公开、知情说明模块仍能加载。
- `node --check` on frontend/optional server scripts succeeded. / JS 语法检查通过。

## Real browser DOM walkthrough / 浏览器操作

- Headless Chromium using system Chromium and Playwright; the exact distributed HTML/CSS/JS loaded via DOM injection with isolated in-memory `localStorage`. This environment still blocks direct `file://` navigation. / 使用同源码和内存隔离储存测试；本环境仍阻止直接打开文件 URL。
- Checked 10 disclosure sections, expand-all interaction, six unconfirmed fields blocking advancement, clearing validation errors when fixed, then successful access to task brief. / 验证 10 节、6 项确认与错误提示消失。
- Completed researcher code issuance → participant login → consent → task brief → A–F, including B/D mock dialogue and C read-only comparison → anonymous V2 packet → both J01 and J02 rating workflows and final confirmation. / 全流程与双评审通过。
- **Zero page JavaScript exceptions.** / 页面脚本错误 0。
- Inspected rendered screenshot of the collapsed consent layout for readability. / 视觉检查完成。

## Cleanup / 代码清理

- Removed unused obsolete `participant.js`, `researcher.js`, `judge.js`, `styles.css` from the working release. Their historical contents remain available in Git history. / 删除未使用的旧前端文件，Git 历史保留旧版。
- Preserved redirecting HTML compatibility entrypoints and core protocol/ratings utility. / 保留兼容跳转和原始量规核心。
- Consolidated duplicate CSS overrides; reformatted CSS for maintainability; retained offline and reserved DeepSeek/Cloudflare interfaces. / 整理样式，云端接口仅预留。

## Remaining limitations / 限制

- Windows double-clicking the extracted `demo/index.html` is still unverified on the user's computer. / 需用户本机双击验证。
- Browser `localStorage` is not secure research data storage; mock credentials are not authentication and acknowledgements are not ethics-approved consent. / 演示不构成安全招募或正式同意。
- All model replies are synthetic Mock and the model label is a reserved interface label, not a verified live DeepSeek model identifier. / 未调用真实 DeepSeek。
- Original Word word-count conventions may differ from the deterministic HTML counter on mixed-language content. / 字数与 Word 可能不完全相同。
- GitHub Actions remains **manual-only** to avoid repeated failure emails. / CI 继续保持手动触发。
