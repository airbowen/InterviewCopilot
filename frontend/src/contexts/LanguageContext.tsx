import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.interview': 'AI面试',
    'nav.analysis': '面试分析',
    'nav.ielts': 'IELTS口语',
    'nav.brand': '面试助手',
    'nav.platform': 'AI面试平台',
    'nav.logout': '退出登录',
    
    // Home
    'home.hero.title': 'AI驱动的面试练习平台',
    'home.hero.subtitle': '通过智能AI技术提升您的面试技能，获得个性化反馈和专业建议',
    'home.hero.cta.guide': '使用指南',
    'home.hero.cta.interview': '进入AI面试',
    
    'home.stats.users': '用户',
    'home.stats.interviews': '面试次数',
    'home.stats.rating': '用户评分',
    'home.stats.accuracy': '准确率',
    
    'home.features.interview.title': 'AI模拟面试',
    'home.features.interview.desc': '与AI进行真实的面试对话，支持多种面试模式',
    'home.features.analysis.title': '面试分析报告',
    'home.features.analysis.desc': '深度分析您的表现，从语速、词汇、逻辑等维度给出建议',
    'home.features.ielts.title': 'IELTS口语评测',
    'home.features.ielts.desc': '专业的雅思口语评分系统，提供详细的能力分析',
    'home.features.learn_more': '了解更多',
    
    'home.cta.title': '准备好提升您的面试技能了吗？',
    'home.cta.subtitle': '立即开始您的AI面试练习之旅，获得专业的反馈和建议',
    'home.cta.button': '立即开始',
    
    // Guide
    'guide.title': '使用指南',
    'guide.subtitle': '了解三种面试模式，选择最适合您的练习方式',
    'guide.back': '返回首页',
    
    'guide.modes.title': '面试模式介绍',
    'guide.modes.voice.title': '语音模式',
    'guide.modes.voice.desc': '通过麦克风输入，手动控制录音开始和结束',
    'guide.modes.voice.feature1': '手动控制录音时机',
    'guide.modes.voice.feature2': '适合安静环境使用',
    'guide.modes.voice.feature3': '精确控制回答内容',
    
    'guide.modes.screen.title': '共享屏幕模式',
    'guide.modes.screen.desc': '捕获系统音频，自动检测语音活动',
    'guide.modes.screen.feature1': '自动检测语音开始和结束',
    'guide.modes.screen.feature2': '支持系统音频捕获',
    'guide.modes.screen.feature3': '适合在线面试场景',
    
    'guide.modes.advanced.title': '高级模式',
    'guide.modes.advanced.desc': '仅检测问题，过滤噪音和口头禅',
    'guide.modes.advanced.feature1': '智能过滤背景噪音',
    'guide.modes.advanced.feature2': '自动识别问题内容',
    'guide.modes.advanced.feature3': '减少口头禅干扰',
    
    'guide.setup.title': '设置步骤',
    'guide.steps.1.title': '浏览器设置',
    'guide.steps.1.desc': '推荐使用Chrome浏览器，确保麦克风权限已开启',
    'guide.steps.2.title': '音频配置',
    'guide.steps.2.desc': '调整麦克风音量，确保音频清晰可听',
    'guide.steps.3.title': '环境准备',
    'guide.steps.3.desc': '选择安静的环境，减少背景噪音干扰',
    
    'guide.browser.title': '浏览器兼容性',
    'guide.browser.desc': '为了获得最佳体验，请使用Chrome浏览器，并确保版本为最新版本。Safari和Firefox可能存在兼容性问题。',
    
    'guide.cta': '开始面试',
    
    // Login
    'login.phone.title': '手机验证登录',
    'login.phone.subtitle': '请输入您的手机号码以接收验证码',
    'login.phone.label': '手机号码',
    'login.phone.placeholder': '请输入11位手机号',
    'login.phone.button': '发送验证码',
    'login.phone.error': '请输入正确的手机号码',
    'login.phone.send_failed': '验证码发送失败，请重试',
    'login.phone.security': '您的信息将被安全保护',
    
    'login.verify.title': '输入验证码',
    'login.verify.subtitle': '验证码已发送至',
    'login.verify.label': '验证码',
    'login.verify.placeholder': '请输入6位验证码',
    'login.verify.button': '登录',
    'login.verify.error': '请输入6位验证码',
    'login.verify.wrong': '验证码错误，请重新输入',
    'login.verify.back': '重新输入手机号',
    'login.verify.help': '没有收到验证码？请检查短信或稍后重试',
    
    // Mode Selection
    'mode.title': '选择面试模式',
    'mode.subtitle': '根据您的需求选择合适的面试模式和配置',
    'mode.remaining_time': '剩余时间',
    'mode.select_mode': '选择面试模式',
    
    'mode.voice.title': '语音模式',
    'mode.voice.desc': '手动控制录音，适合安静环境',
    'mode.screen.title': '共享屏幕模式',
    'mode.screen.desc': '自动检测语音，支持系统音频',
    'mode.advanced.title': '高级模式',
    'mode.advanced.desc': '智能过滤，仅检测问题',
    
    'mode.config.title': '面试配置',
    'mode.config.resume': '简历上传',
    'mode.config.resume_upload': '点击或拖拽上传简历文件',
    'mode.config.language': '面试语言',
    'mode.config.chinese': '普通话',
    'mode.config.english': '英语',
    'mode.config.position': '应聘岗位',
    'mode.config.position_placeholder': '例如：前端工程师',
    'mode.config.is_it': '是否为IT面试？',
    'mode.config.pause_duration': '断句时长',
    'mode.config.additional_info': '补充信息',
    'mode.config.additional_info_placeholder': '请输入其他相关信息...',
    'mode.config.custom_prompt': '自定义Prompt',
    'mode.config.custom_prompt_placeholder': '输入自定义提示词链接',
    
    'mode.start_interview': '开始面试',
    
    // Interview
    'interview.session_title': 'AI面试会话',
    'interview.position': '岗位',
    'interview.mode': '模式',
    'interview.end': '结束面试',
    'interview.welcome_message': '您好！我是您的AI面试官。今天我们将进行{position}岗位的面试。请先简单介绍一下自己。',
    'interview.start_recording': '开始录音',
    'interview.stop_recording': '停止录音',
    'interview.voice_mode_tip': '点击开始录音，说完后点击停止',
    
    // Analysis (keeping existing translations)
    'analysis.title': 'AI面试分析报告',
    'analysis.subtitle': '基于您的面试表现，我们为您提供详细的分析报告',
    'analysis.overall_score': '综合评分',
    'analysis.performance_title': '面试表现评估',
    'analysis.performance_desc': '基于多个维度的综合分析结果',
    
    'analysis.speed.title': '语速',
    'analysis.speed.feedback': '您的语速适中，表达清晰流畅',
    'analysis.speed.suggestion': '建议在关键点适当放慢语速以增强表达效果',
    
    'analysis.vocabulary.title': '词汇',
    'analysis.vocabulary.feedback': '词汇使用较为丰富，专业术语运用得当',
    'analysis.vocabulary.suggestion': '可以进一步扩展高级词汇的使用',
    
    'analysis.logic.title': '逻辑',
    'analysis.logic.feedback': '逻辑思维清晰，回答结构合理',
    'analysis.logic.suggestion': '继续保持良好的逻辑表达习惯',
    
    'analysis.clarity.title': '结构清晰度',
    'analysis.clarity.feedback': '回答结构清晰，重点突出',
    'analysis.clarity.suggestion': '可以使用更多的连接词来增强表达的连贯性',
    
    'analysis.feedback_label': '反馈',
    'analysis.suggestion_label': '建议',
    'analysis.view_report': '查看详细报告',
    'analysis.new_interview': '开始新面试',
    
    // Report
    'report.interview_report': '面试评估报告',
    'report.date': '面试日期',
    'report.duration': '面试时长',
    'report.role': '面试岗位',
    'report.overall_score': '综合得分',
    'report.detailed_scores': '详细评分',
    
    'report.strengths_title': '优势表现',
    'report.strengths.logical_thinking': '逻辑思维清晰，能够有条理地表达观点',
    'report.strengths.clear_expression': '表达清晰，语言组织能力强',
    'report.strengths.technical_knowledge': '专业知识扎实，技术理解深入',
    
    'report.weaknesses_title': '待改进项',
    'report.weaknesses.speaking_speed': '语速偏快，建议适当放慢以增强理解',
    'report.weaknesses.vocabulary_diversity': '词汇多样性有待提升',
    'report.weaknesses.filler_words': '口头禅使用较多，影响表达流畅度',
    
    'report.suggestions_title': '改进建议',
    'report.suggestions.practice_speaking': '多进行口语练习，提高表达的自然度',
    'report.suggestions.expand_vocabulary': '扩展专业词汇量，提升表达的准确性',
    'report.suggestions.reduce_fillers': '减少口头禅的使用，让表达更加简洁',
    'report.suggestions.structure_answers': '加强回答的结构化，使用总分总的表达方式',
    
    'report.download': '下载报告',
    'report.share': '分享报告',
    
    // IELTS (keeping existing translations)
    'ielts.title': 'IELTS口语评测',
    'ielts.subtitle': '专业的雅思口语评分系统，提供五维度详细分析',
    
    'ielts.parts.part1.title': 'Part 1 - 个人信息',
    'ielts.parts.part1.desc': '关于个人、家庭、工作、学习等话题的简单问答',
    'ielts.parts.part2.title': 'Part 2 - 个人陈述',
    'ielts.parts.part2.desc': '根据给定话题进行1-2分钟的个人陈述',
    'ielts.parts.part3.title': 'Part 3 - 深入讨论',
    'ielts.parts.part3.desc': '与Part 2相关的抽象话题深入讨论',
    
    'ielts.sample_question': '示例问题',
    'ielts.start_recording': '开始录音',
    'ielts.stop_recording': '停止录音',
    'ielts.recording_in_progress': '录音进行中',
    
    'ielts.sample_questions.part1.q1': '请介绍一下您的家乡',
    'ielts.sample_questions.part1.q2': '您平时有什么爱好？',
    'ielts.sample_questions.part1.q3': '您觉得学习英语重要吗？',
    
    'ielts.sample_questions.part2.q1': '描述一个对您有重要影响的人',
    'ielts.sample_questions.part2.q2': '谈论一次难忘的旅行经历',
    'ielts.sample_questions.part2.q3': '描述一个您想学习的技能',
    
    'ielts.sample_questions.part3.q1': '您认为现代科技如何影响人际交往？',
    'ielts.sample_questions.part3.q2': '教育系统应该如何适应时代变化？',
    'ielts.sample_questions.part3.q3': '全球化对文化多样性有什么影响？',
    
    'ielts.results.title': 'IELTS口语评测结果',
    'ielts.results.band_score': '雅思分数',
    'ielts.results.excellent': '优秀表现！',
    'ielts.results.feedback': '您的口语水平达到了良好标准，继续保持！',
    'ielts.results.detailed_analysis': '详细能力分析',
    'ielts.results.suggestions_title': '改进建议',
    'ielts.results.suggestion1': '加强语音语调的练习，提高发音的准确性',
    'ielts.results.suggestion2': '扩展词汇量，特别是学术和正式场合的词汇',
    'ielts.results.suggestion3': '练习复杂句型的使用，提高语法的多样性',
    'ielts.results.try_again': '重新测试',
    'ielts.results.view_report': '查看详细报告',
    
    'ielts.radar.fluency': '流利度',
    'ielts.radar.vocabulary': '词汇',
    'ielts.radar.grammar': '语法',
    'ielts.radar.pronunciation': '发音',
    'ielts.radar.coherence': '连贯性',
    
    // Footer
    'footer.contact': '联系我们',
    'footer.bilibili': 'B站',
    'footer.douyin': '抖音',
    'footer.xiaohongshu': '小红书',
    'footer.rights': '版权所有'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.interview': 'AI Interview',
    'nav.analysis': 'Interview Analysis',
    'nav.ielts': 'IELTS Speaking',
    'nav.brand': 'InterviewHelper',
    'nav.platform': 'AI Interview Platform',
    'nav.logout': 'Logout',
    
    // Home
    'home.hero.title': 'AI-Powered Interview Practice Platform',
    'home.hero.subtitle': 'Enhance your interview skills with intelligent AI technology, get personalized feedback and professional advice',
    'home.hero.cta.guide': 'User Guide',
    'home.hero.cta.interview': 'Start AI Interview',
    
    'home.stats.users': 'Users',
    'home.stats.interviews': 'Interviews',
    'home.stats.rating': 'Rating',
    'home.stats.accuracy': 'Accuracy',
    
    'home.features.interview.title': 'AI Mock Interview',
    'home.features.interview.desc': 'Engage in realistic interview conversations with AI, supporting multiple interview modes',
    'home.features.analysis.title': 'Interview Analysis Report',
    'home.features.analysis.desc': 'Deep analysis of your performance with suggestions on speed, vocabulary, logic and more',
    'home.features.ielts.title': 'IELTS Speaking Evaluation',
    'home.features.ielts.desc': 'Professional IELTS speaking scoring system with detailed ability analysis',
    'home.features.learn_more': 'Learn More',
    
    'home.cta.title': 'Ready to Enhance Your Interview Skills?',
    'home.cta.subtitle': 'Start your AI interview practice journey now and get professional feedback and advice',
    'home.cta.button': 'Get Started',
    
    // Guide
    'guide.title': 'User Guide',
    'guide.subtitle': 'Learn about three interview modes and choose the best practice method for you',
    'guide.back': 'Back to Home',
    
    'guide.modes.title': 'Interview Mode Introduction',
    'guide.modes.voice.title': 'Voice Mode',
    'guide.modes.voice.desc': 'Manual microphone control with start/stop recording',
    'guide.modes.voice.feature1': 'Manual recording control',
    'guide.modes.voice.feature2': 'Suitable for quiet environments',
    'guide.modes.voice.feature3': 'Precise answer content control',
    
    'guide.modes.screen.title': 'Screen Share Mode',
    'guide.modes.screen.desc': 'Capture system audio with automatic voice detection',
    'guide.modes.screen.feature1': 'Auto-detect voice start and end',
    'guide.modes.screen.feature2': 'System audio capture support',
    'guide.modes.screen.feature3': 'Suitable for online interview scenarios',
    
    'guide.modes.advanced.title': 'Advanced Mode',
    'guide.modes.advanced.desc': 'Question detection only, filtering noise and fillers',
    'guide.modes.advanced.feature1': 'Smart background noise filtering',
    'guide.modes.advanced.feature2': 'Automatic question content recognition',
    'guide.modes.advanced.feature3': 'Reduce filler word interference',
    
    'guide.setup.title': 'Setup Steps',
    'guide.steps.1.title': 'Browser Setup',
    'guide.steps.1.desc': 'Chrome browser recommended, ensure microphone permissions are enabled',
    'guide.steps.2.title': 'Audio Configuration',
    'guide.steps.2.desc': 'Adjust microphone volume, ensure audio is clear and audible',
    'guide.steps.3.title': 'Environment Preparation',
    'guide.steps.3.desc': 'Choose a quiet environment to reduce background noise interference',
    
    'guide.browser.title': 'Browser Compatibility',
    'guide.browser.desc': 'For the best experience, please use Chrome browser and ensure it is the latest version. Safari and Firefox may have compatibility issues.',
    
    'guide.cta': 'Start Interview',
    
    // Login
    'login.phone.title': 'Phone Verification Login',
    'login.phone.subtitle': 'Please enter your phone number to receive verification code',
    'login.phone.label': 'Phone Number',
    'login.phone.placeholder': 'Enter 11-digit phone number',
    'login.phone.button': 'Send Code',
    'login.phone.error': 'Please enter a valid phone number',
    'login.phone.send_failed': 'Failed to send verification code, please try again',
    'login.phone.security': 'Your information will be securely protected',
    
    'login.verify.title': 'Enter Verification Code',
    'login.verify.subtitle': 'Verification code sent to',
    'login.verify.label': 'Verification Code',
    'login.verify.placeholder': 'Enter 6-digit code',
    'login.verify.button': 'Login',
    'login.verify.error': 'Please enter 6-digit verification code',
    'login.verify.wrong': 'Incorrect verification code, please try again',
    'login.verify.back': 'Re-enter phone number',
    'login.verify.help': 'Didn\'t receive the code? Please check SMS or try again later',
    
    // Mode Selection
    'mode.title': 'Select Interview Mode',
    'mode.subtitle': 'Choose the appropriate interview mode and configuration based on your needs',
    'mode.remaining_time': 'Remaining Time',
    'mode.select_mode': 'Select Interview Mode',
    
    'mode.voice.title': 'Voice Mode',
    'mode.voice.desc': 'Manual recording control, suitable for quiet environments',
    'mode.screen.title': 'Screen Share Mode',
    'mode.screen.desc': 'Auto voice detection, system audio support',
    'mode.advanced.title': 'Advanced Mode',
    'mode.advanced.desc': 'Smart filtering, question detection only',
    
    'mode.config.title': 'Interview Configuration',
    'mode.config.resume': 'Resume Upload',
    'mode.config.resume_upload': 'Click or drag to upload resume file',
    'mode.config.language': 'Interview Language',
    'mode.config.chinese': 'Mandarin',
    'mode.config.english': 'English',
    'mode.config.position': 'Position',
    'mode.config.position_placeholder': 'e.g., Frontend Engineer',
    'mode.config.is_it': 'Is this an IT interview?',
    'mode.config.pause_duration': 'Pause Duration',
    'mode.config.additional_info': 'Additional Information',
    'mode.config.additional_info_placeholder': 'Enter other relevant information...',
    'mode.config.custom_prompt': 'Custom Prompt',
    'mode.config.custom_prompt_placeholder': 'Enter custom prompt link',
    
    'mode.start_interview': 'Start Interview',
    
    // Interview
    'interview.session_title': 'AI Interview Session',
    'interview.position': 'Position',
    'interview.mode': 'Mode',
    'interview.end': 'End Interview',
    'interview.welcome_message': 'Hello! I\'m your AI interviewer. Today we\'ll conduct an interview for the {position} position. Please start by introducing yourself.',
    'interview.start_recording': 'Start Recording',
    'interview.stop_recording': 'Stop Recording',
    'interview.voice_mode_tip': 'Click to start recording, click stop when finished',
    
    // Analysis (keeping existing translations)
    'analysis.title': 'AI Interview Analysis Report',
    'analysis.subtitle': 'Based on your interview performance, we provide detailed analysis reports',
    'analysis.overall_score': 'Overall Score',
    'analysis.performance_title': 'Interview Performance Assessment',
    'analysis.performance_desc': 'Comprehensive analysis results based on multiple dimensions',
    
    'analysis.speed.title': 'Speaking Speed',
    'analysis.speed.feedback': 'Your speaking speed is moderate with clear and fluent expression',
    'analysis.speed.suggestion': 'Consider slowing down at key points to enhance expression effectiveness',
    
    'analysis.vocabulary.title': 'Vocabulary',
    'analysis.vocabulary.feedback': 'Rich vocabulary usage with appropriate technical terms',
    'analysis.vocabulary.suggestion': 'Further expand the use of advanced vocabulary',
    
    'analysis.logic.title': 'Logic',
    'analysis.logic.feedback': 'Clear logical thinking with well-structured answers',
    'analysis.logic.suggestion': 'Continue maintaining good logical expression habits',
    
    'analysis.clarity.title': 'Structural Clarity',
    'analysis.clarity.feedback': 'Clear answer structure with highlighted key points',
    'analysis.clarity.suggestion': 'Use more connecting words to enhance expression coherence',
    
    'analysis.feedback_label': 'Feedback',
    'analysis.suggestion_label': 'Suggestion',
    'analysis.view_report': 'View Detailed Report',
    'analysis.new_interview': 'Start New Interview',
    
    // Report
    'report.interview_report': 'Interview Assessment Report',
    'report.date': 'Interview Date',
    'report.duration': 'Duration',
    'report.role': 'Position',
    'report.overall_score': 'Overall Score',
    'report.detailed_scores': 'Detailed Scores',
    
    'report.strengths_title': 'Strengths',
    'report.strengths.logical_thinking': 'Clear logical thinking with organized expression of viewpoints',
    'report.strengths.clear_expression': 'Clear expression with strong language organization skills',
    'report.strengths.technical_knowledge': 'Solid professional knowledge with deep technical understanding',
    
    'report.weaknesses_title': 'Areas for Improvement',
    'report.weaknesses.speaking_speed': 'Speaking speed is fast, suggest slowing down for better understanding',
    'report.weaknesses.vocabulary_diversity': 'Vocabulary diversity needs improvement',
    'report.weaknesses.filler_words': 'Frequent use of filler words affects expression fluency',
    
    'report.suggestions_title': 'Improvement Suggestions',
    'report.suggestions.practice_speaking': 'Practice speaking more to improve natural expression',
    'report.suggestions.expand_vocabulary': 'Expand professional vocabulary to enhance expression accuracy',
    'report.suggestions.reduce_fillers': 'Reduce use of filler words for more concise expression',
    'report.suggestions.structure_answers': 'Strengthen answer structure using introduction-body-conclusion format',
    
    'report.download': 'Download Report',
    'report.share': 'Share Report',
    
    // IELTS (keeping existing translations)
    'ielts.title': 'IELTS Speaking Evaluation',
    'ielts.subtitle': 'Professional IELTS speaking scoring system with five-dimensional detailed analysis',
    
    'ielts.parts.part1.title': 'Part 1 - Personal Information',
    'ielts.parts.part1.desc': 'Simple Q&A about personal, family, work, study topics',
    'ielts.parts.part2.title': 'Part 2 - Individual Presentation',
    'ielts.parts.part2.desc': '1-2 minute individual presentation on a given topic',
    'ielts.parts.part3.title': 'Part 3 - In-depth Discussion',
    'ielts.parts.part3.desc': 'In-depth discussion of abstract topics related to Part 2',
    
    'ielts.sample_question': 'Sample Question',
    'ielts.start_recording': 'Start Recording',
    'ielts.stop_recording': 'Stop Recording',
    'ielts.recording_in_progress': 'Recording in Progress',
    
    'ielts.sample_questions.part1.q1': 'Please introduce your hometown',
    'ielts.sample_questions.part1.q2': 'What hobbies do you have?',
    'ielts.sample_questions.part1.q3': 'Do you think learning English is important?',
    
    'ielts.sample_questions.part2.q1': 'Describe a person who has had an important influence on you',
    'ielts.sample_questions.part2.q2': 'Talk about a memorable travel experience',
    'ielts.sample_questions.part2.q3': 'Describe a skill you would like to learn',
    
    'ielts.sample_questions.part3.q1': 'How do you think modern technology affects interpersonal communication?',
    'ielts.sample_questions.part3.q2': 'How should education systems adapt to changing times?',
    'ielts.sample_questions.part3.q3': 'What impact does globalization have on cultural diversity?',
    
    'ielts.results.title': 'IELTS Speaking Test Results',
    'ielts.results.band_score': 'Band Score',
    'ielts.results.excellent': 'Excellent Performance!',
    'ielts.results.feedback': 'Your speaking level has reached a good standard, keep it up!',
    'ielts.results.detailed_analysis': 'Detailed Ability Analysis',
    'ielts.results.suggestions_title': 'Improvement Suggestions',
    'ielts.results.suggestion1': 'Strengthen pronunciation and intonation practice to improve accuracy',
    'ielts.results.suggestion2': 'Expand vocabulary, especially academic and formal vocabulary',
    'ielts.results.suggestion3': 'Practice using complex sentence structures to improve grammatical variety',
    'ielts.results.try_again': 'Try Again',
    'ielts.results.view_report': 'View Detailed Report',
    
    'ielts.radar.fluency': 'Fluency',
    'ielts.radar.vocabulary': 'Vocabulary',
    'ielts.radar.grammar': 'Grammar',
    'ielts.radar.pronunciation': 'Pronunciation',
    'ielts.radar.coherence': 'Coherence',
    
    // Footer
    'footer.contact': 'Contact Us',
    'footer.bilibili': 'Bilibili',
    'footer.douyin': 'Douyin',
    'footer.xiaohongshu': 'Xiaohongshu',
    'footer.rights': 'All Rights Reserved'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};