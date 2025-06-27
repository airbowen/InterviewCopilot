import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, Send, User, Bot, Play, Square } from 'lucide-react';
import { useRecording } from '../hooks/useRecording';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface InterviewMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

const InterviewPractice: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
    clearRecording,
    error
  } = useRecording();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiQuestions = {
    zh: [
      "你好！我很高兴今天能帮助你练习。让我们从简单的开始 - 你能简单介绍一下自己吗？",
      "很好！是什么促使你想要提高英语口语技能的？",
      "有趣！你能描述一个你最近面临的挑战性情况以及你是如何处理的吗？",
      "你的职业目标是什么，你认为提高英语水平如何帮助你实现这些目标？",
      "如果你可以与任何人共进晚餐，无论是在世的还是已故的，你会选择谁，为什么？",
      "你想在明年发展什么技能，你会采取什么步骤来学习它？"
    ],
    en: [
      "Hello! I'm excited to help you practice today. Let's start with something simple - can you tell me a bit about yourself?",
      "That's great! What motivated you to improve your English speaking skills?",
      "Interesting! Can you describe a challenging situation you faced recently and how you handled it?",
      "What are your career goals, and how do you think improving your English will help you achieve them?",
      "If you could have dinner with anyone, living or dead, who would it be and why?",
      "What's a skill you'd like to develop in the next year, and what steps would you take to learn it?"
    ]
  };

  const startSession = () => {
    setSessionStarted(true);
    const initialMessage: InterviewMessage = {
      id: '1',
      type: 'ai',
      content: aiQuestions[language][0],
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  };

  const handleRecordingComplete = () => {
    if (audioUrl) {
      // 模拟转录
      const transcriptions = {
        zh: [
          "你好！我是小明，来自北京的软件开发工程师。我在科技行业工作了大约5年。",
          "我想在国际上发展我的职业生涯，英语熟练程度对此至关重要。另外，我喜欢与来自不同文化的人交流。",
          "最近，我必须在两名团队成员生病的情况下，在紧迫的截止日期内领导一个项目。我重新组织了工作量，并与利益相关者清楚地沟通以管理期望。",
          "我想在未来两年内成为技术负责人。更好的英语技能将帮助我与国际团队和客户更有效地沟通。",
          "我很想与乔布斯共进晚餐。他的创新思维和将复杂想法简化为用户友好产品的能力一直激励着我。",
          "我想学习公共演讲。我会从加入当地的演讲俱乐部开始，并在工作中练习小型演示。"
        ],
        en: [
          "Hi there! I'm John, and I'm a software developer from New York. I've been working in tech for about 5 years now.",
          "I want to advance my career internationally, and English proficiency is crucial for that. Plus, I enjoy connecting with people from different cultures.",
          "Recently, I had to lead a project with a tight deadline while two team members were out sick. I reorganized the workload and communicated clearly with stakeholders to manage expectations.",
          "I want to become a technical lead within the next two years. Better English skills will help me communicate more effectively with international teams and clients.",
          "I'd love to have dinner with Steve Jobs. His innovative thinking and ability to simplify complex ideas into user-friendly products has always inspired me.",
          "I'd like to learn public speaking. I'd start by joining a local Toastmasters club and practicing with small presentations at work."
        ]
      };

      const userMessage: InterviewMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: transcriptions[language][Math.min(messages.length / 2, transcriptions[language].length - 1)],
        timestamp: new Date(),
        audioUrl
      };

      setMessages(prev => [...prev, userMessage]);
      
      // AI回应延迟
      setIsTyping(true);
      setTimeout(() => {
        const nextQuestionIndex = Math.min(Math.floor(messages.length / 2) + 1, aiQuestions[language].length - 1);
        const aiMessage: InterviewMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: aiQuestions[language][nextQuestionIndex],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 2000);

      clearRecording();
    }
  };

  useEffect(() => {
    if (audioUrl && !isRecording) {
      handleRecordingComplete();
    }
  }, [audioUrl, isRecording]);

  if (!sessionStarted) {
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
          <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI模拟面试</h1>
                <p className="text-teal-100">与AI进行真实的面试对话练习</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">练习说明</h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                  <span>AI面试官会问你一系列问题，就像真实面试一样</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                  <span>点击录音按钮开始回答，说完后点击停止</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                  <span>AI会根据你的回答提出下一个问题</span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                  <span>练习结束后可以查看详细的分析报告</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={startSession}
                className="flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>开始面试练习</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-6 text-white flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI面试对话</h1>
            <p className="text-teal-100">与AI面试官进行真实对话</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                    : 'bg-gradient-to-r from-teal-500 to-cyan-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl p-4 shadow-sm ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="leading-relaxed">{message.content}</p>
                  {message.audioUrl && (
                    <audio controls className="mt-3 w-full">
                      <source src={message.audioUrl} type="audio/wav" />
                    </audio>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-md">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Recording Controls */}
        <div className="p-6 border-t border-gray-100">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>开始录音回答</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Square className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>停止录音</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPractice;