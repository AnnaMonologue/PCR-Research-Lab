# 离线完整流程演示 / Offline Full-Workflow Demonstration

**打开方式 / How to launch:** 解压项目后，直接双击 `demo/index.html`。不需要安装 Node.js、Cloudflare、Wrangler、数据库或配置 DeepSeek API。 / Unzip and open `demo/index.html` directly in a modern browser. No installation or API credentials required.

> **虚构演示 / SYNTHETIC DEMONSTRATION ONLY.** All login codes, consent acknowledgements, generated text and ratings are fabricated for engineering checks, not research observations. / 所有编号、同意确认、生成文本及评分均为演示数据，绝非真实研究资料。

## 三个角色 / Three roles

| 角色 / Role | 工作流程 / Workflow |
|---|---|
| 研究者 / Researcher | 点击“生成虚构编号及访问码”；完成后生成匿名 V2 评分包，下载演示 JSON。 / Issue synthetic code; create blinded V2 packet and download fictional data. |
| 参与者 / Participant | 登录测试码，确认仅输入虚构内容，按 A→F 完成。B/D 用“发送模拟消息”与固定 Mock AI 对话。每阶段可“填入完整虚构示例”，用于快速回归测试。 / Activate code, confirm synthetic only, complete A–F; B/D use mock AI with shared transcript. |
| 评审 / Judge | 仅查看匿名 V2，使用原 APIC 1/3/5 分描述锚点分别以 J01 和 J02 评分、导出。 / View blinded V2, apply original rubric anchors and export independent fictional ratings. |

**浏览器存储 / Browser storage:** localStorage in this browser only; this is not secure storage. Demo access codes **are deliberately not secure authentication**, since there is no backend. Clear via “清空所有演示数据”. / 演示登录仅验证流程，不能替代真实身份认证。

## 论文一致性 / Fidelity to the APIC protocol

- A（独立构思）→ B（AI 辅助 V1）→ C（独立批评）→ D（AI 辅助 V2）→ E（批评处理说明）→ F（事后解释）。 / Staged six-phase workflow.
- B/D each require a mock conversation turn; C requires two complete critiques, with an optional third. / B/D 各需一次模拟对话；C 两条必填批评，一条选填。
- E requires a corresponding response for every submitted critique. / E 必须逐条回应批评。
- V1/V2 retain the **self-declared** 600–800-character requirement; the prototype does not perform Word-equivalent character counting. / 字数由测试用户填写声明，不宣称实现 Word 完全一致的统计。
- Reviewer gets V2 only; four 1–5 dimensions with 1/3/5 descriptions from original APIC materials. / 四维盲评及锚点保持原义。

## Cloudflare and DeepSeek adapters / 云端与模型接口预留

- Cloudflare design: `../cloudflare/` (separate optional future integration; **no installation or deployment required**). / 云端实现仅作为可选设计与代码参考。
- DeepSeek relay: `../server.js` local-only demonstration and `.env.example` placeholders; **this offline demo never reads or uses an API Key**. / 模型接入保留说明，不启用。
- API credentials, real participants, real transcribed dialogues and consent forms must **never** be included in this public demo. / 禁止使用真实研究资料。

## Test scope / 测试范围

`npm test` (only for developers who already have Node installed) checks the model, Cloudflare mock server and original PCR structural constraints. Browser-interaction checks should separately verify researcher issue → A–F → two mock AI phases → blind packet → J01/J02 ratings. / 自动化测试与浏览器端到端检查分别进行。
