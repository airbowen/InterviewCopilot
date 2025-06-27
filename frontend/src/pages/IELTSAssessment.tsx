import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, Square, Play, RotateCcw, Award, TrendingUp } from 'lucide-react';
import { useRecording } from '../hooks/useRecording';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface IELTSScore {
  overall: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  feedback: string;
  suggestions: string[];
}

const IELTSAssessment: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'instruction' | 'recording' | 'processing' | 'results'>('instruction');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<IELTSScore | null>(null);
  
  const {
    isRecording,
    duration,
    audioUrl,
    startRecording,
    stopRecording,
    clearRecording,
    error
  } = useRecording();

  const questions = {
    zh: [
      "描述一次难忘的旅行经历。你去了哪里，是什么让这次旅行如此特别？",
      "生活在大城市和小城镇各有什么优缺点？",
      "描述一项你未来想要学习的技能，并解释为什么它吸引你。"
    ],
    en: [
      "Describe a memorable trip you have taken. Where did you go and what made it special?",
      "What are the advantages and disadvantages of living in a big city versus a small town?",
      "Describe a skill you would like to learn in the future and explain why it interests you."
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    setStage('recording');
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
    setStage('processing');
    
    // 模拟处理时间
    setTimeout(() => {
      // 模拟评分数据
      const mockScore: IELTSScore = {
        overall: 7.5,
        pronunciation: 7.0,
        fluency: 8.0,
        grammar: 7.5,
        vocabulary: 8.0,
        feedback: language === 'zh' 
          ? "整体表现良好，发音清晰，流利度自然。观察到一些小的语法错误，但词汇使用较为丰富。"
          : "Good overall performance with clear pronunciation and natural fluency. Minor grammatical errors observed but vocabulary usage is sophisticated.",
        suggestions: language === 'zh' 
          ? [
              "练习辅音群发音以提高清晰度",
              "加强过去完成时的使用",
              "扩展学术词汇以获得更高分数",
              "注重语调变化以强调重点"
            ]
          : [
              "Practice consonant clusters for clearer pronunciation",
              "Work on past perfect tense usage",
              "Expand academic vocabulary for higher band scores",
              "Focus on intonation patterns for emphasis"
            ]
      };
      setScore(mockScore);
      setStage('results');
    }, 3000);
  };

  const handleRetry = () => {
    clearRecording();
    setStage('instruction');
    setCurrentQuestion(0);
    setScore(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6.5) return 'text-blue-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'from-green-500 to-emerald-600';
    if (score >= 6.5) return 'from-blue-500 to-indigo-600';
    if (score >= 5) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  if (stage === 'instruction') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">IELTS口语评测</h1>
                <p className="text-blue-100">专业的雅思口语评分系统</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">评测说明</h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                  <span>你将有2分钟时间回答一个雅思口语问题</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                  <span>AI将从发音、流利度、语法、词汇等维度评分</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                  <span>评测结束后会提供详细的分析报告</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                  <span>建议在安静的环境中进行测试</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">今日题目</h3>
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                {questions[language][currentQuestion]}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleStartRecording}
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>开始录音</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'recording') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-white">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">正在录音中</h1>
                <p className="text-red-100">请开始回答问题</p>
              </div>
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl font-mono font-bold text-gray-900 mb-2">
                {formatTime(duration)}
              </div>
              <p className="text-gray-600">录音时间</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                {questions[language][currentQuestion]}
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStopRecording}
                className="flex items-center space-x-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Square className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>停止录音</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'processing') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI正在分析中</h2>
            <p className="text-xl text-gray-600 mb-8">请稍候，我们正在评估您的口语表现</p>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'results' && score) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </button>
        </div>

        <div className="space-y-8">
          {/* Overall Score */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className={`bg-gradient-to-r ${getScoreBg(score.overall)} p-8 text-white`}>
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold">{score.overall}</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">IELTS口语评测结果</h1>
                <p className="text-lg opacity-90">
                  优秀表现！继续保持！
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">详细能力分析</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: '发音', score: score.pronunciation },
                  { label: '流利度', score: score.fluency },
                  { label: '语法', score: score.grammar },
                  { label: '词汇', score: score.vocabulary }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(item.score)}`}>
                      {item.score}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI反馈</h3>
                <p className="text-gray-700 leading-relaxed">{score.feedback}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">改进建议</h3>
                <div className="space-y-3">
                  {score.suggestions.map((suggestion, index) => (
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

          {/* Audio Playback */}
          {audioUrl && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">录音回放</h3>
                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>重新测试</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>返回首页</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default IELTSAssessment;