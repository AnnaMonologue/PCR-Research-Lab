# PCR Research Lab v0.3.1 — 测试与限制 / Prototype Test Report and Limits

**Test date / 测试日期:** 2026-10-09
**Environment / 环境:** local Node.js v22.16.0 and headless Chromium with Playwright.

## Scope / 本轮范围

- **Implemented / 已实现：** Independent no-install `demo/index.html` with researcher-issued **synthetic** demonstration ID/code; A–F staged submissions; Mock AI in B and D with continued transcript; two mandatory critiques and optional third; critique dispositions; blinded V2 packet; J01/J02 rubric-based synthetic rating and JSON export. / 完整虚构流程演示。
- **Interfaces reserved only / 仅保留接口：** Cloudflare Workers + D1 design/source scaffolding and local DeepSeek API relay documentation; neither was installed/deployed/connected for the offline demonstration. / 未安装或部署 Cloudflare，未调用 DeepSeek。
- **Privacy / 数据隐私：** 100% synthetic test material; no authentic APIC records, API credentials or consent forms transferred into demo files or public repository. / 严禁真实实验数据。

## Test evidence / 测试证据

1. **Node automated checks / Node 自动化测试:** 24 test cases passed; zero failed (including 7 for offline demo), followed by existing original PCR structural checks. / 24 项通过，0 项失败。
2. **Browser click-through / 浏览器交互验证:** researcher creates test code → participant activates and confirms synthetic mode → completes A–F → mock AI turns in B/D → researcher creates blinded V2 packet → J01 and J02 independently rate 4 dimensions → no page script errors. / 六阶段与双评审流程通过。
3. **Source and data boundaries / 来源与隐私边界:** no original records present in tested build; event logs labelled `mock` and `synthetic-only`. / 虚构记录可区分来源。

**Browser harness caveat / 浏览器环境限制:** The automated browser policy in this environment blocks direct `file://` and `localhost` navigation. Browser interactions were therefore tested using a browser page populated with the *exact HTML/CSS/JavaScript source* and a test-only localStorage stub. This verifies DOM event handling and end-to-end app logic, **but does not constitute a direct double-click file-opening test**. / 当前浏览器沙盒阻止直接本地文件访问；用同一份源代码注入页面完成点击验证，未验证双击文件打开。

**GitHub Actions / GitHub 自动检查:** The GitHub workflow is configured as `workflow_dispatch` (manual only). Its remote execution is not independently confirmed by this report. / GitHub Actions 保持手动触发，不将本地测试结果冒充远程 CI。

## Additional regression / 补充回归测试

An extended browser test found that the optional third critique was correctly displayed in E but skipped by the sample-fill button. The E-stage sample was fixed and retested. The browser test now covers: optional C3 → E3 disposition, all A–F stages, B/D mock conversation, blinded packet download, separate J01/J02 JSON rating exports, and the complete fictional-record export. / 扩展测试发现并修复第三条可选批评的模拟填充问题，重新测试了六阶段和三类 JSON 导出。

## Outstanding (not part of this demo) / 非当前原型范围

Actual user authentication, paid API metering, Cloudflare deployment, secure research database, ethics approval, live recruitment and construct validity are intentionally not claimed or required. / 不声明已完成安全认证、正式云端部署、真实数据采集或效度验证。
