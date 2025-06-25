'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface AIFeedbackPanelProps {
  isRecording: boolean;
  feedback?: string;  // 添加 feedback 属性
}

interface Feedback {
  id: string;
  type: 'positive' | 'suggestion' | 'warning' | 'analysis';  // 添加 'analysis' 类型
  title: string;
  message: string;
  timestamp: Date;
}

export default function AIFeedbackPanel({ isRecording, feedback }: AIFeedbackPanelProps) {
  // 移除模拟数据生成的代码
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);

  // 当收到新的 feedback 时更新显示
  useEffect(() => {
    if (feedback) {
      const newFeedback: Feedback = {  // 显式添加类型注解
        id: `feedback-${Date.now()}`,
        type: 'analysis',
        title: 'AI 分析反馈',
        message: feedback,
        timestamp: new Date()
      };
      setFeedbackItems(prev => [newFeedback, ...prev].slice(0, 8));
    }
  }, [feedback]);
  const [currentAnalysis, setCurrentAnalysis] = useState<string>('');

  // Simulate AI feedback generation
  useEffect(() => {
    if (!isRecording) return;

    const sampleFeedback = [
      {
        type: 'positive' as const,
        title: 'Great Technical Detail',
        message: 'Your explanation of React components shows strong technical understanding.'
      },
      {
        type: 'suggestion' as const,
        title: 'Add Specific Examples',
        message: 'Consider providing more concrete examples of your project outcomes.'
      },
      {
        type: 'warning' as const,
        title: 'Speaking Pace',
        message: 'You might be speaking a bit fast. Try to slow down for clarity.'
      },
      {
        type: 'positive' as const,
        title: 'Confident Delivery',
        message: 'Your tone conveys confidence and expertise in the subject matter.'
      },
      {
        type: 'suggestion' as const,
        title: 'Structure Your Response',
        message: 'Try using the STAR method: Situation, Task, Action, Result.'
      }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleFeedback.length) {
        const newFeedback = {
          id: `feedback-${Date.now()}-${index}`,
          ...sampleFeedback[index],
          timestamp: new Date()
        };
        setFeedbackItems(prev => [newFeedback, ...prev].slice(0, 8)); // Keep only latest 8
        index++;
      }
    }, 6000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulate real-time analysis updates
  useEffect(() => {
    if (!isRecording) {
      setCurrentAnalysis('');
      return;
    }

    const analysisTexts = [
      'Analyzing speech patterns...',
      'Evaluating technical accuracy...',
      'Assessing communication clarity...',
      'Reviewing response structure...',
      'Checking for industry keywords...'
    ];

    let index = 0;
    const interval = setInterval(() => {
      setCurrentAnalysis(analysisTexts[index % analysisTexts.length]);
      index++;
    }, 2000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'positive':
        return 'default';
      case 'suggestion':
        return 'secondary';
      case 'warning':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          AI Feedback
        </CardTitle>
        <CardDescription>
          Real-time analysis and suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Analysis Status */}
        {isRecording && currentAnalysis && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm text-blue-700 font-medium">{currentAnalysis}</span>
            </div>
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {feedbackItems.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              {isRecording ? (
                <div className="space-y-2">
                  <Brain className="h-8 w-8 mx-auto text-gray-400" />
                  <p>AI is analyzing your responses...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Brain className="h-8 w-8 mx-auto text-gray-400" />
                  <p>Start recording to receive AI feedback</p>
                </div>
              )}
            </div>
          ) : (
            feedbackItems.map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-white/60 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                      <Badge variant={getBadgeVariant(item.type)} className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.message}</p>
                    <span className="text-xs text-gray-400">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}