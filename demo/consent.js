/**
 * APIC 2026 original participant information, arranged for a synthetic-only UI.
 * 原研究《参与者说明与知情同意》十节的双语数字化要点。
 * Historical terms are reference-only: this demo neither recruits nor collects signatures.
 */
(function (root) {
  'use strict';

  const sections = [
    {
      title: '1. 研究目的 / Study purpose',
      zh: '检查分阶段的人—AI 共创任务能否留下完整、具体、可追溯的过程记录，分析参与者如何提出问题、处理修改建议，以及最终方案在指定维度上的表现。研究不测试马来语水平，也不评价人格、稳定能力、创造力或课程成绩；12 个词及中文含义会提供。',
      en: 'The study examines whether staged human–AI co-creation yields complete and traceable records of critique, revision decisions and final task-bounded design quality. It does not test Malay proficiency, personality, enduring ability, creativity or course performance; all 12 words and translations are supplied.'
    },
    {
      title: '2. 邀请与参加条件 / Eligibility',
      zh: '原研究邀请年满 18 岁、在中国大陆高校就读、能够用中文完成任务、曾独立使用文本生成式 AI、此前没有接触过马来语的本科生。参与者还需能够使用电脑与稳定网络，独立安排约一小时。',
      en: 'The original study invited mainland Chinese undergraduates aged 18+, able to complete the task in Chinese, experienced in independent text-generative AI use, with no prior exposure to Malay, and with access to a computer, stable internet and about one hour.'
    },
    {
      title: '3. 任务流程 / What participants do',
      zh: '按 A–F 顺序：独立构思 → 使用 DeepSeek 网页端形成 V1 → 停止 AI 互动并独立提出至少两条批评 → 在同一对话中修订 V2 → 独立说明批评如何处理 → 回答三个结束问题。原任务须提交任务表和 B/D 完整对话，预计 60 分钟，V1、V2 各 600–800 字，原先由 Word 手工核对。',
      en: 'The A–F sequence covers pre-AI ideation, V1 with the DeepSeek website, at least two critiques without AI, V2 in the same conversation, independent dispositions and three post-task responses. The original procedure required the task sheet and complete B/D dialogue, around 60 minutes, and Word-checked 600–800-character V1 and V2.'
    },
    {
      title: '4. 收集材料 / Information collected',
      zh: '原研究收集初步构想、两阶段完整 AI 输入和回复、V1/V2、独立批评、修改处理说明、结束问题，以及案例编号、完成日期、总时长、实际字数和页面可见模型标签。研究答卷不得包含真实姓名、学号、联系方式或他人资料；同意与联系资料应另行保存。',
      en: 'Original records included the initial idea, full B/D prompts and replies, V1/V2, critiques, dispositions and reflections, alongside case ID, date, duration, verified length and visible model label. Answers must not contain identifying information; consent/contact records are separate.'
    },
    {
      title: '5. DeepSeek 与第三方隐私 / Third-party AI and privacy',
      zh: '原研究的 B、D 阶段使用 DeepSeek 网页端，输入与回复会经过第三方处理，研究团队无法控制该平台的全部数据处理。原任务要求关闭模型改进、开启新空白对话，使用普通模式，不启用深度思考和联网搜索，也不得输入本人或第三方敏感信息。',
      en: 'In the source study, B/D used the DeepSeek website, a third-party processor beyond the research team’s complete control. Participants were instructed to disable model improvement, start a new conversation, use normal mode without deep thinking or web search, and exclude personal and third-party sensitive information.',
      demo: '当前离线原型仅使用明确标记的 Mock AI，不连接 DeepSeek，也不把聊天发送给第三方。 / This offline prototype uses marked mock replies and does not contact DeepSeek or transmit prompts to an AI provider.'
    },
    {
      title: '6. 风险与应对 / Risks and safeguards',
      zh: '原研究可能造成暂时疲劳、时间压力或对方案质量的不确定感。参与者可休息、跳过非必答内容或停止。第三方 AI 存在网络与数据隐私风险，降低风险的办法包括关闭模型改进和不输入个人信息；研究者删除分析副本中的识别信息，但不保证网络服务完全无风险。',
      en: 'Possible burdens include short-term fatigue, time pressure and uncertainty about design quality. Participants could rest, skip optional items or stop. Third-party AI entails privacy and network risks; data minimisation and disabling model improvement reduce, but do not eliminate, these risks.'
    },
    {
      title: '7. 收益与报酬 / Benefits and compensation',
      zh: '原研究不提供参与报酬。研究结果可能帮助改进人—AI 共创任务的过程记录和评价方法；不保证对个人产生直接收益。',
      en: 'The original study offered no payment. Findings might improve recording and assessment of human–AI co-creation, without any guaranteed direct personal benefit.'
    },
    {
      title: '8. 自愿参加与撤回 / Voluntary participation and withdrawal',
      zh: '原研究参加完全自愿，可在开始前拒绝、任务中随时停止，无须解释且不会受罚。提交后 7 个自然日内，可凭 Case ID 联系研究者申请撤回；去标识化或进入匿名评分、汇总分析后可能无法单独识别并撤回。',
      en: 'In the original study, participation was voluntary and could be declined or stopped without penalty. Withdrawal was available within seven calendar days after submission using the case ID; later de-identification, blind rating or aggregation could make individual withdrawal impossible.',
      demo: '此处仅模拟实验，不提供“提交后 7 日研究撤回服务”；可使用研究者端清空本浏览器中的模拟记录。 / This is not a real-study withdrawal service. Synthetic records can be cleared in the researcher view of this browser.'
    },
    {
      title: '9. 保密、保存和匿名引用 / Confidentiality, retention and quotations',
      zh: '原研究将同意与联系记录同 Case ID 数据分开；电子资料保存在受密码和加密保护的本地存储中，仅授权人员接触；研究结束后保存五年，期满安全删除。论文或报告可能匿名引用、翻译去标识化短片段。两名评审只看统一任务要求、匿名 V2 和量规，不接触身份或过程记录。',
      en: 'Source-study contact/consent records were separate from case data, with encrypted and password-protected local storage restricted to authorised people, a five-year post-study retention period, and secure deletion afterward. De-identified excerpts could be quoted or translated. Judges received only the common task, anonymised V2 and rubric.',
      demo: '这些是原研究的数据管理规定，不代表本演示具备同等安全存储或五年保管能力。模拟数据保存在当前浏览器，不能用于真人研究。 / These historical safeguards are not implemented by this browser-only mock, which is not approved research storage.'
    },
    {
      title: '10. 研究摘要与联系方式 / Summary and contacts',
      zh: '原研究允许参与者选择接收简短研究摘要。参与、撤回、隐私或程序问题应联系研究者；研究伦理问题可联系指导教师或伦理机构。原文件要求正式发放前填写相应联系方式。',
      en: 'Original participants could opt to receive a short study summary. Questions about participation, withdrawal, privacy or procedures were directed to the researcher; ethics concerns to the supervisor or ethics body. The source form specified that contact details must be supplied before formal circulation.',
      demo: '本演示不收集邮箱、电话、真实姓名、签名或研究摘要订阅信息，也不提供正式研究联系人。 / This demonstration requests no email, phone number, real name, signature or summary-subscription details.'
    }
  ];

  const confirmations = [
    '我已了解原研究的招募条件与任务目的；本页面不会验证真实身份。 / I understand the original eligibility and purpose; this demo does not verify identity.',
    '我已阅读研究步骤、可能风险和参加者的选择权。 / I have read the procedure, possible risks and participant choices.',
    '我了解原研究会使用第三方 DeepSeek；当前演示仅提供 Mock AI，不调用真实接口。 / I understand the original use of DeepSeek and this demo’s mock-only AI.',
    '我了解原研究自愿参加及提交后 7 日撤回的规定，并知道这些历史规定不适用于当前离线演示。 / I understand the original voluntary/withdrawal terms and that they do not apply to this offline demonstration.',
    '我了解原研究的去标识化引用和五年保存规定；当前浏览器演示不会收集用于研究发表的资料。 / I understand the source quotation/retention terms; this demo does not collect research-publication data.',
    '我确认只使用完全虚构的内容，自愿继续演示流程。 / I confirm I will use fictional data only and voluntarily continue this demonstration.'
  ];

  root.PCR_CONSENT = Object.freeze({
    version: 'apic-source-consent-digital-reference-v1',
    sections: Object.freeze(sections),
    confirmations: Object.freeze(confirmations)
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
