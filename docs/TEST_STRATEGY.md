# 测试策略：历史材料只读 + 虚构全流程 / Test Strategy: Read-only Reference + Synthetic End-to-end

> **Approved scope of development / 当前开发范围：** The original APIC 2026 participant records are **not converted, imported, replayed or inserted into Cloudflare**. / 原 APIC 2026 真实参与者记录**不转换、不批量导入、不回放进实验日志、不写入 Cloudflare**。
>
> This document describes development QA, not research ethics approval. / 本文是开发测试规范，不是伦理批准文件。

## A. Source-to-interface compatibility / 原始材料与页面的兼容性

Privately compare **blank protocol templates** and, only when required, original documents opened locally in **read-only** mode, against the experimental interface. Record only checklist results. / 优先使用空白任务模板；必要时在研究者自己的设备上只读查看原件，对比新网页。公开记录只包括是否通过，不含原文、身份或个案级信息。

| Check / 检查项目 | Pass criterion / 通过标准 |
|---|---|
| A–F phases / 六个阶段 | A、C、E、F 独立填写；B、D 允许 AI；按序提交 / Correct AI permissions and ordering |
| Task constraints / 任务约束 | 12 Malay words; ≤15 min game; ≤CNY 30 common materials; active vocabulary use and feedback / 与原研究一致 |
| Critiques / 独立批评 | 2 required + 1 optional; problem, reason, proposed response / 两条必填一条选填 |
| AI conversational continuity / 对话连续性 | B and D share the same in-app AI conversation context, when run synthetically / 虚构测试核实 B/D 续接 |
| Revision evidence / 修订证据 | V1 / V2 kept distinct; E maps to each critique; F is self-report / V1、V2、E、F 分离 |
| Rubric / 评分量规 | 4 dimensions, 1–5 ratings, original 1/3/5 anchors, rater sees blinded V2 only / 四维量规不改 |
| Historical layout variants / 原文档结构差异 | Read-only review of unusual Word tables/media; no data reconstruction / 特殊布局仅核验可读性 |

**No historical-file upload button is needed. / 不要求建立历史 Word 上传或转换入口。**

## B. Synthetic end-to-end execution / 完全虚构的全流程执行

- Use artificial identities like `SYNTHETIC_P001`, fictional prompts, fictional AI responses and fictional V2 work. / 测试用户、作品与对话必须虚构。
- Execute the existing localhost mock service through B and D, confirm session continuity, logging and export structure. / 本地 Mock 服务核验对话与导出。
- Check stage transitions, invalid/skipped phase rejection, reviewer blinding, duplicate IDs and numeric rating bounds. / 阶段约束、盲评及评分范围。
- In later Cloudflare v0.3, additionally test researcher-issued codes, access expiry, concurrent sessions, retries, quotas and interruption recovery. / 领码、并发与断线功能尚待开发。
- No API credential or authentic participant record is needed to test the synthetic mock. / Mock 测试不需任何真实密钥或真实被试。

## C. Evidence and limitations / 测试证据与局限

Run from the repository root / 在仓库根目录运行：

```bash
npm test
node --test cloudflare/src/worker.test.mjs
```

**Latest local checks / 最近一次本地检查 (2026-10-09):** Existing localhost tests: 8 passed / 0 failed; associated structural checks reported pass. Cloudflare fail-closed sandbox tests: 2 passed / 0 failed. / 当前仅为自动化检查，不表示完整浏览器人工流程、正式云端功能或伦理审查已完成。

**What the source records cannot test / 原始材料无法验证：** Existing Word files contain participant-copied AI transcripts, not first-party event logs. They cannot confirm native API timestamps, request IDs, provider token use, server-side access control or persistence in Cloudflare. These require new synthetic execution. / 原 Word 资料不能替新系统自动日志、API 元数据、权限与持久化功能提供运行证据。

## Privacy and protocol boundaries / 隐私与方法边界

- No real source records in public GitHub, Cloudflare sandbox, fixtures, screenshots, CI output or bug reports. / 公开场景不得包含真实原始数据。
- Read-only review never modifies the published cases or adjudicates discrepancies without explicit separate approval. / 只读核对不改变既有论文的样本与判断。
- Any newly collected human-participant data require formal approvals and separate data governance. / 新一轮真人研究需独立伦理与数据流程。
- Real API calls should only be exercised in a private controlled environment after appropriate provider and security checks; mock tests are the default. / 默认只测试 Mock。
