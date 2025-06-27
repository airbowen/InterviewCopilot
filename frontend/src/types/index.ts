export interface User {
  id: string;
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface IELTSScore {
  overall: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  feedback: string;
  suggestions: string[];
}

export interface RecordingSession {
  id: string;
  type: 'ielts' | 'interview';
  duration: number;
  timestamp: Date;
  score?: IELTSScore;
  transcript?: string;
  status: 'recording' | 'processing' | 'completed' | 'failed';
}

export interface InterviewMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface InterviewSession {
  id: string;
  messages: InterviewMessage[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  startTime: Date;
  endTime?: Date;
}

export interface AnalysisData {
  category: string;
  score: number;
  feedback: string;
  suggestion: string;
}

export interface ReportData {
  overallScore: number;
  date: string;
  duration: string;
  role: string;
  scores: {
    speed: number;
    vocabulary: number;
    logic: number;
    clarity: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}