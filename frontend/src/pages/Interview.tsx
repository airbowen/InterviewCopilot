import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Send, User, Bot, Volume2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

const Interview: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 模拟AI回答
  const mockAIResponses = [
    "很好的自我介绍！能详细说说你在前端开发方面的经验吗？",
    "听起来你有丰富的项目经验。能描述一个你遇到的最具挑战性的技术问题吗？",
    "你是如何保持技术更新的？有什么学习新技术的方法？",
    "团队协作中，你如何处理与其他开发者的技术分歧？",
    "对于前端性能优化，你有什么实践经验？",
    "你对我们公司有什么了解？为什么想加入我们？"
  ];

  useEffect(() => {
    // 初始化面试欢迎消息
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: t('interview.welcome_message', { position: config?.position || '软件工程师' }),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [config, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processAudio(audioBlob);
        setAudioChunks([]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('录音启动失败:', error);
      alert('无法访问麦克风，请检查权限设置');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    // 模拟语音转文字
    const mockTranscripts = [
      "你好，我是张三，有5年的前端开发经验，主要使用React和Vue框架。",
      "我最近遇到的挑战是优化一个大型单页应用的性能，通过代码分割和懒加载解决了首屏加载慢的问题。",
      "我通过关注技术博客、参加技术会议和实践新项目来保持技术更新。",
      "我认为技术分歧很正常，我会通过技术调研和原型验证来找到最佳方案。",
      "我在性能优化方面有丰富经验，包括图片优化、缓存策略和代码压缩等。",
      "我了解贵公司在技术创新方面的声誉，希望能在这里发挥我的技能并学习成长。"
    ];

    const transcript = mockTranscripts[Math.min(messages.length / 2, mockTranscripts.length - 1)];
    setCurrentTranscript(transcript);

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: transcript,
      timestamp: new Date(),
      audioUrl: URL.createObjectURL(audioBlob)
    };

    setMessages(prev => [...prev, userMessage]);

    // 模拟AI处理时间
    setTimeout(() => {
      const aiResponse = mockAIResponses[Math.min(Math.floor(messages.length / 2), mockAIResponses.length - 1)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      setCurrentTranscript('');
    }, 2000);
  };

  const endInterview = () => {
    navigate('/analysis');
  };

  if (!config) {
    navigate('/mode');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t('interview.session_title')}</h1>
                <p className="text-blue-100">
                  {t('interview.position')}: {config.position} | {t('interview.mode')}: {t(`mode.${config.mode}.title`)}
                </p>
              </div>
            </div>
            <button
              onClick={endInterview}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
            >
              {t('interview.end')}
            </button>
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
                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
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
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-md">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
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
          {currentTranscript && (
            <div className="mb-4 p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">{currentTranscript}</p>
            </div>
          )}

          <div className="flex items-center justify-center space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isProcessing}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>{t('interview.start_recording')}</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Square className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>{t('interview.stop_recording')}</span>
              </button>
            )}
          </div>

          {config.mode === 'voice' && (
            <p className="text-center text-sm text-gray-500 mt-3">
              {t('interview.voice_mode_tip')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;