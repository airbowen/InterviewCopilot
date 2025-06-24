'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, User, Bot } from 'lucide-react';

interface TranscriptionPanelProps {
  isRecording: boolean;
}

interface TranscriptEntry {
  id: string;
  speaker: 'interviewer' | 'candidate';
  text: string;
  timestamp: Date;
  confidence: number;
}

export default function TranscriptionPanel({ isRecording }: TranscriptionPanelProps) {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  // Simulate real-time transcription
  useEffect(() => {
    if (!isRecording) return;

    const sampleResponses = [
      { speaker: 'interviewer' as const, text: "Tell me about your experience with React and modern JavaScript frameworks." },
      { speaker: 'candidate' as const, text: "I've been working with React for over three years now, primarily focusing on building scalable web applications." },
      { speaker: 'interviewer' as const, text: "That's great. Can you walk me through a challenging project you've worked on recently?" },
      { speaker: 'candidate' as const, text: "Sure, I recently led the development of a real-time collaboration platform using React, WebSocket, and Node.js." },
      { speaker: 'interviewer' as const, text: "What were some of the technical challenges you faced in that project?" },
      { speaker: 'candidate' as const, text: "The main challenge was handling real-time synchronization across multiple users while maintaining performance." },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleResponses.length) {
        const response = sampleResponses[index];
        setTranscript(prev => [...prev, {
          id: `entry-${Date.now()}-${index}`,
          ...response,
          timestamp: new Date(),
          confidence: 85 + Math.random() * 15
        }]);
        index++;
      }
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Clear transcript when recording stops
  useEffect(() => {
    if (!isRecording && transcript.length > 0) {
      // Keep transcript for review
    }
  }, [isRecording, transcript.length]);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Live Transcription
        </CardTitle>
        <CardDescription>
          Real-time speech-to-text with confidence scoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transcript.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {isRecording ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                  <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                  <span className="ml-2">Listening for speech...</span>
                </div>
              ) : (
                'Start recording to see live transcription'
              )}
            </div>
          ) : (
            transcript.map((entry) => (
              <div key={entry.id} className="flex space-x-3 p-3 rounded-lg bg-white/50">
                <div className="flex-shrink-0">
                  {entry.speaker === 'interviewer' ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant={entry.speaker === 'interviewer' ? 'secondary' : 'default'} className="text-xs">
                      {entry.speaker === 'interviewer' ? 'Interviewer' : 'You'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(entry.confidence)}% confidence
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{entry.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}