import React from 'react';
import { BarChart3, Clock, Volume2, Brain, Target, TrendingUp, Download, Share2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Analysis: React.FC = () => {
  const { t } = useLanguage();

  const analysisData = [
    {
      category: t('analysis.speed.title'),
      score: 85,
      icon: Clock,
      color: 'from-blue-500 to-indigo-600',
      feedback: t('analysis.speed.feedback'),
      suggestion: t('analysis.speed.suggestion')
    },
    {
      category: t('analysis.vocabulary.title'),
      score: 78,
      icon: Volume2,
      color: 'from-green-500 to-emerald-600',
      feedback: t('analysis.vocabulary.feedback'),
      suggestion: t('analysis.vocabulary.suggestion')
    },
    {
      category: t('analysis.logic.title'),
      score: 92,
      icon: Brain,
      color: 'from-purple-500 to-violet-600',
      feedback: t('analysis.logic.feedback'),
      suggestion: t('analysis.logic.suggestion')
    },
    {
      category: t('analysis.clarity.title'),
      score: 88,
      icon: Target,
      color: 'from-orange-500 to-red-600',
      feedback: t('analysis.clarity.feedback'),
      suggestion: t('analysis.clarity.suggestion')
    }
  ];

  const overallScore = Math.round(analysisData.reduce((sum, item) => sum + item.score, 0) / analysisData.length);

  const reportData = {
    date: '2025-01-01',
    duration: '25 min',
    role: t('interview.roles.frontend'),
    strengths: [
      t('report.strengths.logical_thinking'),
      t('report.strengths.clear_expression'),
      t('report.strengths.technical_knowledge')
    ],
    weaknesses: [
      t('report.weaknesses.speaking_speed'),
      t('report.weaknesses.vocabulary_diversity'),
      t('report.weaknesses.filler_words')
    ],
    suggestions: [
      t('report.suggestions.practice_speaking'),
      t('report.suggestions.expand_vocabulary'),
      t('report.suggestions.reduce_fillers'),
      t('report.suggestions.structure_answers')
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('analysis.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('analysis.subtitle')}
        </p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden mb-8">
        <div className={`bg-gradient-to-r ${getScoreBg(overallScore)} p-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('report.interview_report')}</h2>
              <div className="space-y-1 text-sm opacity-90">
                <p>{t('report.date')}: {reportData.date}</p>
                <p>{t('report.duration')}: {reportData.duration}</p>
                <p>{t('report.role')}: {reportData.role}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{overallScore}</div>
              <div className="text-sm opacity-90">{t('analysis.overall_score')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {analysisData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{item.category}</h3>
                    <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                      {item.score}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className={`h-3 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('analysis.feedback_label')}</h4>
                      <p className="text-gray-600 text-sm">{item.feedback}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('analysis.suggestion_label')}</h4>
                      <p className="text-blue-600 text-sm">{item.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Report Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">{t('report.detailed_scores')}</h2>
        
        {/* Score Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {analysisData.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(item.score)}`}>
                {item.score}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {item.category}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 bg-gradient-to-r ${item.color} rounded-full`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            {t('report.strengths_title')}
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
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 text-orange-600 mr-2" />
            {t('report.weaknesses_title')}
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
            {t('report.suggestions_title')}
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>{t('report.download')}</span>
        </button>
        <button className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>{t('report.share')}</span>
        </button>
        <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
          <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>{t('analysis.new_interview')}</span>
        </button>
      </div>
    </div>
  );
};

export default Analysis;