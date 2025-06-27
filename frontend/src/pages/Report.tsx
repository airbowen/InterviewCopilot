import React from 'react';
import { FileText, Download, Share2, Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Report: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const reportData = {
    overallScore: 86,
    date: '2025-01-01',
    duration: '25 min',
    role: '前端工程师',
    scores: {
      speed: 85,
      vocabulary: 78,
      logic: 92,
      clarity: 88
    },
    strengths: [
      '逻辑思维清晰，能够有条理地表达观点',
      '表达清晰，语言组织能力强',
      '专业知识扎实，技术理解深入'
    ],
    weaknesses: [
      '语速偏快，建议适当放慢以增强理解',
      '词汇多样性有待提升',
      '口头禅使用较多，影响表达流畅度'
    ],
    suggestions: [
      '多进行口语练习，提高表达的自然度',
      '扩展专业词汇量，提升表达的准确性',
      '减少口头禅的使用，让表达更加简洁',
      '加强回答的结构化，使用总分总的表达方式'
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-indigo-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">面试评估报告</h1>
        <p className="text-xl text-gray-600">
          基于AI分析的详细面试表现报告
        </p>
      </div>

      {/* Report Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className={`bg-gradient-to-r ${getScoreBg(reportData.overallScore)} p-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">面试评估报告</h2>
              <div className="space-y-1 text-sm opacity-90">
                <p>面试日期: {reportData.date}</p>
                <p>面试时长: {reportData.duration}</p>
                <p>应聘岗位: {reportData.role}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{reportData.overallScore}</div>
              <div className="text-sm opacity-90">综合得分</div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Detailed Scores */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">详细评分</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(reportData.scores).map(([key, score]) => {
                const labels = {
                  speed: '语速',
                  vocabulary: '词汇',
                  logic: '逻辑',
                  clarity: '清晰度'
                };
                return (
                  <div key={key} className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>
                      {score}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {labels[key as keyof typeof labels]}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 bg-gradient-to-r ${getScoreBg(score)} rounded-full`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              优势表现
            </h3>
            <div className="space-y-3">
              {reportData.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-gray-700">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 text-orange-600 mr-2" />
              待改进项
            </h3>
            <div className="space-y-3">
              {reportData.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    !
                  </div>
                  <p className="text-gray-700">{weakness}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              改进建议
            </h3>
            <div className="space-y-3">
              {reportData.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>下载报告</span>
        </button>
        <button className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>分享报告</span>
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>返回首页</span>
        </button>
      </div>
    </div>
  );
};

export default Report;