'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Clock, MessageSquare, TrendingUp } from 'lucide-react';

interface PerformanceMetricsProps {
  sessionData: {
    duration: number;
    wordsSpoken: number;
    confidenceScore: number;
    responseQuality: number;
  };
}

export default function PerformanceMetrics({ sessionData }: PerformanceMetricsProps) {
  const metrics = [
    {
      label: 'Response Time',
      value: sessionData.duration > 0 ? Math.max(85, 100 - sessionData.duration * 0.5) : 0,
      color: 'bg-blue-500',
      icon: Clock
    },
    {
      label: 'Clarity Score',
      value: sessionData.confidenceScore,
      color: 'bg-green-500',
      icon: MessageSquare
    },
    {
      label: 'Content Quality',
      value: sessionData.responseQuality,
      color: 'bg-purple-500',
      icon: TrendingUp
    }
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
          Performance Metrics
        </CardTitle>
        <CardDescription>
          Real-time analysis of your interview performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round(metric.value)}%
                </span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </div>
          );
        })}
        
        {sessionData.duration > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{sessionData.wordsSpoken}</div>
                <div className="text-xs text-gray-500">Words Spoken</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {sessionData.duration > 0 ? Math.round(sessionData.wordsSpoken / (sessionData.duration / 60)) : 0}
                </div>
                <div className="text-xs text-gray-500">Words/Min</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}