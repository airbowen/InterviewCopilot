import React, { useState } from 'react';
import { Bot, Upload, Camera, ArrowRight, Code, Briefcase, Database, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Assistant: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [customJob, setCustomJob] = useState<string>('');
  const [assistantContent, setAssistantContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const interviewTypes = [
    {
      id: 'tech',
      name: '技术面试',
      nameEn: 'Technical Interview',
      icon: Code,
      color: 'from-blue-500 to-indigo-600',
      description: '前端、后端、算法等技术岗位面试',
      descriptionEn: 'Frontend, backend, algorithm and other technical position interviews'
    },
    {
      id: 'product',
      name: '产品面试',
      nameEn: 'Product Interview',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-600',
      description: '产品经理、产品设计等岗位面试',
      descriptionEn: 'Product manager, product design and other position interviews'
    },
    {
      id: 'data',
      name: '数据面试',
      nameEn: 'Data Interview',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      description: '数据分析师、数据科学家等岗位面试',
      descriptionEn: 'Data analyst, data scientist and other position interviews'
    },
    {
      id: 'custom',
      name: '自定义职业',
      nameEn: 'Custom Position',
      icon: User,
      color: 'from-orange-500 to-red-600',
      description: '手动输入职业类型或上传简历',
      descriptionEn: 'Manually input job type or upload resume'
    }
  ];

  const difficultyLevels = [
    { id: 'junior', name: '初级', nameEn: 'Junior', description: '0-2年经验' },
    { id: 'intermediate', name: '中级', nameEn: 'Intermediate', description: '2-5年经验' },
    { id: 'senior', name: '高级', nameEn: 'Senior', description: '5年以上经验' }
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setAssistantContent('');
    
    if (typeId !== 'custom') {
      generateAssistantContent(typeId, selectedLevel);
    }
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    if (selectedType && selectedType !== 'custom') {
      generateAssistantContent(selectedType, levelId);
    }
  };

  const handleCustomJobSubmit = () => {
    if (customJob.trim()) {
      generateAssistantContent('custom', selectedLevel, customJob);
    }
  };

  const generateAssistantContent = (type: string, level: string, customJobTitle?: string) => {
    if (!level && type !== 'custom') return;
    
    setIsGenerating(true);
    
    // 模拟AI生成内容
    setTimeout(() => {
      let content = '';
      
      if (type === 'tech') {
        content = language === 'zh' 
          ? `# 技术面试准备指南 - ${difficultyLevels.find(l => l.id === level)?.name}

## 核心技能评估
- **编程基础**: 数据结构、算法复杂度分析
- **系统设计**: 高并发、分布式系统架构
- **项目经验**: 技术选型、性能优化实践

## 高频面试题目
1. 请介绍一个你最有挑战性的技术项目
2. 如何设计一个高并发的秒杀系统？
3. 谈谈你对微服务架构的理解
4. 如何进行代码重构和性能优化？

## 面试建议
- 准备具体的项目案例，能够深入讲解技术细节
- 熟悉常见算法和数据结构的实现
- 了解系统设计的基本原则和最佳实践

## 常见问题主题
- 编程语言特性和最佳实践
- 数据库设计和优化
- 网络协议和安全
- 云计算和DevOps`
          : `# Technical Interview Preparation Guide - ${difficultyLevels.find(l => l.id === level)?.nameEn}

## Core Skills Assessment
- **Programming Fundamentals**: Data structures, algorithm complexity analysis
- **System Design**: High concurrency, distributed system architecture
- **Project Experience**: Technology selection, performance optimization practices

## High-Frequency Interview Questions
1. Please introduce your most challenging technical project
2. How would you design a high-concurrency flash sale system?
3. Share your understanding of microservices architecture
4. How do you approach code refactoring and performance optimization?

## Interview Tips
- Prepare specific project cases with detailed technical explanations
- Master common algorithms and data structure implementations
- Understand basic principles and best practices of system design

## Common Question Topics
- Programming language features and best practices
- Database design and optimization
- Network protocols and security
- Cloud computing and DevOps`;
      } else if (type === 'product') {
        content = language === 'zh'
          ? `# 产品面试准备指南 - ${difficultyLevels.find(l => l.id === level)?.name}

## 产品思维评估
- **用户洞察**: 用户研究、需求分析方法
- **产品设计**: 功能规划、用户体验设计
- **数据驱动**: 指标体系、A/B测试实践

## 高频面试题目
1. 如何设计一个新的社交产品功能？
2. 如何处理用户反馈和需求冲突？
3. 描述一次产品迭代的完整流程
4. 如何衡量产品功能的成功？

## 面试建议
- 准备具体的产品案例，展示产品思维过程
- 熟悉产品设计方法论和工具
- 了解数据分析和用户研究方法

## 常见问题主题
- 产品规划和路线图
- 用户体验设计
- 竞品分析
- 商业模式和盈利策略`
          : `# Product Interview Preparation Guide - ${difficultyLevels.find(l => l.id === level)?.nameEn}

## Product Thinking Assessment
- **User Insights**: User research, requirement analysis methods
- **Product Design**: Feature planning, user experience design
- **Data-Driven**: Metrics system, A/B testing practices

## High-Frequency Interview Questions
1. How would you design a new social product feature?
2. How do you handle user feedback and requirement conflicts?
3. Describe the complete process of a product iteration
4. How do you measure the success of a product feature?

## Interview Tips
- Prepare specific product cases demonstrating product thinking process
- Master product design methodologies and tools
- Understand data analysis and user research methods

## Common Question Topics
- Product planning and roadmap
- User experience design
- Competitive analysis
- Business models and monetization strategies`;
      } else if (type === 'data') {
        content = language === 'zh'
          ? `# 数据面试准备指南 - ${difficultyLevels.find(l => l.id === level)?.name}

## 数据技能评估
- **统计分析**: 描述性统计、假设检验、回归分析
- **机器学习**: 监督学习、无监督学习、深度学习
- **数据处理**: SQL、Python/R、数据清洗

## 高频面试题目
1. 如何处理缺失数据和异常值？
2. 解释一个你做过的数据分析项目
3. 如何选择合适的机器学习算法？
4. 如何评估模型的性能？

## 面试建议
- 准备数据分析项目的完整案例
- 熟悉常用的统计方法和机器学习算法
- 了解数据可视化和报告制作

## 常见问题主题
- 数据挖掘和特征工程
- 统计建模和预测
- 数据可视化
- 业务理解和数据驱动决策`
          : `# Data Interview Preparation Guide - ${difficultyLevels.find(l => l.id === level)?.nameEn}

## Data Skills Assessment
- **Statistical Analysis**: Descriptive statistics, hypothesis testing, regression analysis
- **Machine Learning**: Supervised learning, unsupervised learning, deep learning
- **Data Processing**: SQL, Python/R, data cleaning

## High-Frequency Interview Questions
1. How do you handle missing data and outliers?
2. Explain a data analysis project you've worked on
3. How do you choose the right machine learning algorithm?
4. How do you evaluate model performance?

## Interview Tips
- Prepare complete case studies of data analysis projects
- Master common statistical methods and machine learning algorithms
- Understand data visualization and reporting

## Common Question Topics
- Data mining and feature engineering
- Statistical modeling and prediction
- Data visualization
- Business understanding and data-driven decisions`;
      } else if (type === 'custom' && customJobTitle) {
        content = language === 'zh'
          ? `# ${customJobTitle} 面试准备指南

## 岗位核心能力
- **专业技能**: 根据岗位要求的核心技术能力
- **行业知识**: 相关行业背景和发展趋势
- **实践经验**: 项目经历和解决问题的能力

## 通用面试题目
1. 请介绍一下您的工作经历和主要成就
2. 您如何看待这个行业的发展趋势？
3. 描述一个您解决的复杂问题
4. 您的职业规划是什么？

## 面试建议
- 深入了解目标公司和岗位要求
- 准备相关的项目案例和成果展示
- 关注行业动态和最新发展趋势

## 准备要点
- 技能匹配度分析
- 行业知识储备
- 软技能展示
- 职业发展规划`
          : `# ${customJobTitle} Interview Preparation Guide

## Core Position Competencies
- **Professional Skills**: Core technical abilities required for the position
- **Industry Knowledge**: Relevant industry background and development trends
- **Practical Experience**: Project experience and problem-solving abilities

## General Interview Questions
1. Please introduce your work experience and main achievements
2. How do you view the development trends in this industry?
3. Describe a complex problem you solved
4. What are your career plans?

## Interview Tips
- Thoroughly understand the target company and position requirements
- Prepare relevant project cases and achievement demonstrations
- Stay updated on industry trends and latest developments

## Preparation Points
- Skills matching analysis
- Industry knowledge preparation
- Soft skills demonstration
- Career development planning`;
      }
      
      setAssistantContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const handleScreenshot = () => {
    // 模拟截图功能
    const element = document.getElementById('assistant-content');
    if (element) {
      // 这里可以集成html2canvas或其他截图库
      alert(language === 'zh' ? '截图功能开发中...' : 'Screenshot feature in development...');
    }
  };

  const startMockInterview = () => {
    navigate('/interview');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI 面试辅助，提升答题技巧
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          智能面试准备指导，帮助你在面试中脱颖而出
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 sticky top-8">
            {/* Interview Type Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">选择面试类型</h2>
              
              <div className="space-y-4">
                {interviewTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                          : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {language === 'zh' ? type.name : type.nameEn}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'zh' ? type.description : type.descriptionEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Job Input */}
            {selectedType === 'custom' && (
              <div className="mb-8 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    输入职业类型
                  </label>
                  <input
                    type="text"
                    value={customJob}
                    onChange={(e) => setCustomJob(e.target.value)}
                    placeholder="例如：UI设计师"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-3">或者</div>
                  <button className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-400 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">上传简历</span>
                  </button>
                </div>
              </div>
            )}

            {/* Difficulty Level Selection */}
            {selectedType && selectedType !== 'custom' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">选择难度等级</h3>
                <div className="space-y-3">
                  {difficultyLevels.map((level) => (
                    <div
                      key={level.id}
                      onClick={() => handleLevelSelect(level.id)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedLevel === level.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {language === 'zh' ? level.name : level.nameEn}
                          </h4>
                          <p className="text-sm text-gray-600">{level.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedLevel === level.id
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {((selectedType !== 'custom' && selectedLevel) || (selectedType === 'custom' && customJob.trim())) && (
              <div className="space-y-3">
                {selectedType === 'custom' && (
                  <button
                    onClick={handleCustomJobSubmit}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <span>生成指导</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={startMockInterview}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <span>开始模拟面试</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Assistant Content Display */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            {/* Content Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI面试辅助内容</h2>
                {assistantContent && (
                  <button
                    onClick={handleScreenshot}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-sm">一键截图</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content Display */}
            <div id="assistant-content" className="p-8 min-h-[500px]">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                    <Bot className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    AI正在生成面试指导内容...
                  </h3>
                  <p className="text-gray-600">请稍候，这可能需要几秒钟</p>
                  <div className="flex space-x-1 mt-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : assistantContent ? (
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: assistantContent
                        .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-gray-800 mb-3 mt-6">$1</h2>')
                        .replace(/^- \*\*(.*?)\*\*: (.*$)/gm, '<div class="mb-2"><span class="font-semibold text-emerald-700">$1</span>: $2</div>')
                        .replace(/^\d+\. (.*$)/gm, '<div class="mb-2 flex items-start"><span class="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">•</span><span>$1</span></div>')
                        .replace(/^- (.*$)/gm, '<div class="mb-2 flex items-start"><span class="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></span><span>$1</span></div>')
                        .replace(/\n/g, '<br>')
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Bot className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    选择面试类型开始
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    请从左侧选择面试类型和难度等级，AI将为您生成个性化的面试准备指导内容
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;