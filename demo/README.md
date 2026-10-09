# PCR Research Lab v0.4 / PCR 研究原型 v0.4

**直接双击 `demo/index.html` 即可开始。 / Double-click `demo/index.html` to start.** 不需要 Node.js、Cloudflare、数据库、网络连接或 DeepSeek API。/ No Node.js, Cloudflare, database, network or DeepSeek credentials are needed.

> **SYNTHETIC DEMO ONLY / 完全虚构演示。** 不得输入真实参与者姓名、联系方式、研究作答或原 APIC 资料。编号、验证码和模拟 AI 回复都不提供真实身份验证或安全保障。/ Do not enter personal information or actual APIC records. Demo credentials do not provide security.

## 操作 / Walkthrough

1. **研究者 / Researcher:** 点击“生成虚构编号及访问码”，复制网页显示的 `SYNTHETIC_P...` 与 `DEMO-...`。/ Issue a synthetic code.
2. **参与者 / Participant:** 使用编号与访问码登录。阅读简短研究说明并主动确认；查看含 12 个马来语词汇的任务介绍，再进入 A。/ Activate, acknowledge the study information and read the task brief.
3. **A:** 填写四项独立构思及独立完成确认。/ Four required independent-ideation fields.
4. **B:** 左侧填写 V1 五项设计，右侧至少发送一次模拟 AI 消息；点击“统计字数”，确认 600–800，再提交。/ Complete a five-part V1 and converse with mock AI in the split view, count, then submit.
5. **C:** 查看锁定的 V1，独立填写前两条完整批评；第三条可选。/ Two required critiques, third optional, with no AI.
6. **D:** 继续 B 的同一聊天，修改 V2 五项内容，再统计 600–800 字提交。/ Refine V2 using the same mock chat history.
7. **E:** 系统只读引用 C 中的问题。每条批评由参与者选择处理类型并自行写出 V2 中的变化或未采用理由。/ Respond independently to each critique.
8. **F:** 回答原研究三项事后问题、确认独立完成。/ Three post-task responses.
9. **研究者:** 生成匿名 V2 评审包，下载演示 JSON。/ Generate and export a blinded packet.
10. **评审 / Judge:** J01、J02 分别先浏览全部匿名 V2，再按原四维 1–5 分量规评分。**每份评分备注选填**。全部打分后填写**总体评分说明**、完成原表的三项确认，分别导出评审 JSON。/ Read all designs, rate on four dimensions; per-design note optional; overall rationale and final three checks required.

每阶段可以用“填写完全虚构示例”快速测试；B/D 的虚构样例是真正经计数器核验的作品文本，不会伪造 `word_count=630`。/ The fictional sample text is actually counted by the same counter; no fabricated word-count fields are used.

## 校验规则 / Validation

- 每个必填文本框都必须填写；空字段显示行内错误并禁止提交。/ Required fields block progression.
- B/D 分别将五项作品正文合并计数。汉字逐字计数；连续 Latin 字母或数字按一个单位计；忽略标点、空格、界面文字与 AI 对话。算法名称为 `pcr-han-latin-v1`。/ Han characters and Latin/number tokens counted separately; punctuation/chat excluded.
- 点击“统计字数”后显示核对结果；任何修改都会让上一轮核验失效；提交时再次验证 600–800 的区间。/ Recount after edits and on submission.
- 原 APIC 使用 Word 手动计数，混合文本在不同统计工具中可能有差异。/ This algorithm is not guaranteed identical to Microsoft Word counting.
- C 必须在 D 前锁定；A/C/E/F 不提供 AI 交互；D 复用 B 的聊天。/ C must commit before D; AI only B/D.
- 浏览器 `localStorage` 自动保存**虚构草稿**，不构成安全或长期保存机制。清除浏览器数据可能使记录丢失。/ Browser-local drafts are neither confidential nor durable study storage.

## 与原研究的关系 / Method provenance

原研究评审表每份作品均有可选“简短备注”。据研究者说明，原评审还曾口头提供总体评价，但没有收录在原表中。v0.4 将这些总体感受规范成书面填写；不能把新的模拟文字当成旧评审的原话。/ Original per-design notes were optional. The researcher reports that the judges also gave overall impressions orally; the updated interface documents such reflections in writing but does not reconstruct historical speech.

## 预留接口 / Reserved integrations

- `../cloudflare/`: Cloudflare Workers/D1 的可选技术方案与模拟骨架，**不用安装或部署**。/ Optional future interface; not required.
- `../server.js` 与 `.env.example`: DeepSeek API 预留代理与配置说明。当前 `demo/` 从不读取 API Key 或发送 AI 请求。/ Optional API architecture; this demo makes no model requests.

开发测试 / Developer-only checks (optional): `npm test`。普通使用者只需打开 HTML，不必安装依赖。/ Tests are optional for developers; ordinary users open the HTML.
