'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Phone, 
  Brain, 
  BarChart3, 
  Settings,
  User,
  Wallet,
  Headphones,
  MessageSquare,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import TranscriptionPanel from '@/components/TranscriptionPanel';
import AIFeedbackPanel from '@/components/AIFeedbackPanel';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import AudioVisualization from '@/components/AudioVisualization';
import ScreenshotButton from '@/components/ScreenshotButton';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Demo User',
    credits: 1250,
    totalCredits: 2000,
    phone: '+1 (555) 123-4567'
  });
  const [sessionData, setSessionData] = useState({
    duration: 0,
    wordsSpoken: 0,
    confidenceScore: 0,
    responseQuality: 0
  });

  // Simulate session timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setSessionData(prev => ({
          ...prev,
          duration: prev.duration + 1,
          wordsSpoken: prev.wordsSpoken + Math.floor(Math.random() * 3),
          confidenceScore: Math.min(100, prev.confidenceScore + Math.random() * 2),
          responseQuality: Math.min(100, prev.responseQuality + Math.random() * 1.5)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 在 Home 组件中添加 WebSocket 状态管理
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    if (isAuthenticated && !wsConnection) {
      const ws = new WebSocket('ws://localhost:3001');
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        // 发送认证信息
        ws.send(JSON.stringify({
          type: 'auth',
          userId: currentUser.phone // 使用用户手机号作为标识
        }));
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'auth_success') {
          setSessionId(data.sessionId);
          setWsConnection(ws);
        } else if (data.sessionId !== sessionId) {
          console.warn('Received message for different session');
          return;
        }
  
        // 处理其他消息类型...
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setWsConnection(null);
        setSessionId(null);
      };
  
      ws.onclose = () => {
        console.log('WebSocket closed');
        setWsConnection(null);
        setSessionId(null);
      };
  
      return () => {
        ws.close();
      };
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Interview Copilot</h1>
                <p className="text-xs text-gray-500">AI-Powered Interview Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-1.5">
                    <Wallet className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.credits} credits
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Recording Panel */}
          <div className="lg:col-span-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isRecording ? 'Recording Interview Session' : 'Ready to Start Your Interview'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {isRecording 
                    ? 'AI is actively listening and analyzing your responses'
                    : 'Click the microphone to begin recording and receive real-time AI feedback'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Audio Visualization */}
                <div className="flex justify-center">
                  <AudioVisualization isRecording={isRecording} />
                </div>

                {/* Recording Controls */}
          
                <div className="flex justify-center space-x-4">
                  {!isRecording ? (
                    <Button 
                      onClick={handleStartRecording}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-lg"
                    >
                      <Mic className="h-6 w-6 mr-3" />
                      Start Recording
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={handleStopRecording}
                        variant="destructive"
                        size="lg"
                        className="px-8 py-4 text-lg shadow-lg"
                      >
                        <MicOff className="h-6 w-6 mr-3" />
                        Stop Recording
                      </Button>
                      <ScreenshotButton wsConnection={wsConnection} sessionId={sessionId} />
                    </>
                  )}
                </div>

                {/* Session Stats */}
                {isRecording && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formatTime(sessionData.duration)}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{sessionData.wordsSpoken}</div>
                      <div className="text-sm text-gray-500">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{Math.round(sessionData.confidenceScore)}%</div>
                      <div className="text-sm text-gray-500">Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{Math.round(sessionData.responseQuality)}%</div>
                      <div className="text-sm text-gray-500">Quality</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transcription Panel */}
            <div className="mt-6">
              <TranscriptionPanel isRecording={isRecording} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Feedback Panel */}
            <AIFeedbackPanel isRecording={isRecording} />
            
            {/* Performance Metrics */}
            <PerformanceMetrics sessionData={sessionData} />
            
            {/* Credit Usage */}
            {isAuthenticated && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Wallet className="h-5 w-5 mr-2 text-green-600" />
                    Credit Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credits Used</span>
                      <span>{currentUser.totalCredits - currentUser.credits} / {currentUser.totalCredits}</span>
                    </div>
                    <Progress 
                      value={(currentUser.totalCredits - currentUser.credits) / currentUser.totalCredits * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">This session: ~5 credits/min</div>
                    <Button variant="outline" size="sm" className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setShowAuthModal(false);
        }}
      />
    </div>
  );
}