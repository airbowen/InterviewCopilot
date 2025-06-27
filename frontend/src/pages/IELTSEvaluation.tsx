import React, { useState } from 'react';
import { Award, Mic, Square, RotateCcw, Play } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface IELTSScore {
  fluency: number;
  vocabulary: number;
  grammar: number;
  pronunciation: number;
  coherence: number;
}

const IELTSEvaluation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState<IELTSScore | null>(null);

  const parts = [
    {
      id: 1,
      title: t('ielts.parts.part1.title'),
      description: t('ielts.parts.part1.desc'),
      duration: '4-5 min',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: t('ielts.parts.part2.title'),
      description: t('ielts.parts.part2.desc'),
      duration: '3-4 min',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 3,
      title: t('ielts.parts.part3.title'),
      description: t('ielts.parts.part3.desc'),
      duration: '4-5 min',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const sampleQuestions = {
    1: [
      t('ielts.sample_questions.part1.q1'),
      t('ielts.sample_questions.part1.q2'),
      t('ielts.sample_questions.part1.q3')
    ],
    2: [
      t('ielts.sample_questions.part2.q1'),
      t('ielts.sample_questions.part2.q2'),
      t('ielts.sample_questions.part2.q3')
    ],
    3: [
      t('ielts.sample_questions.part3.q1'),
      t('ielts.sample_questions.part3.q2'),
      t('ielts.sample_questions.part3.q3')
    ]
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 120) { // Auto stop after 2 minutes
          clearInterval(timer);
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Simulate processing and generate mock scores
    setTimeout(() => {
      const mockScores: IELTSScore = {
        fluency: 7.5,
        vocabulary: 8.0,
        grammar: 7.0,
        pronunciation: 7.5,
        coherence: 8.5
      };
      setScores(mockScores);
      setShowResults(true);
    }, 2000);
  };

  const resetTest = () => {
    setSelectedPart(null);
    setIsRecording(false);
    setRecordingTime(0);
    setShowResults(false);
    setScores(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOverallScore = (scores: IELTSScore) => {
    const total = scores.fluency + scores.vocabulary + scores.grammar + scores.pronunciation + scores.coherence;
    return (total / 5).toFixed(1);
  };

  const prepareRadarData = (scores: IELTSScore) => [
    { subject: t('ielts.radar.fluency'), score: scores.fluency, fullMark: 9 },
    { subject: t('ielts.radar.vocabulary'), score: scores.vocabulary, fullMark: 9 },
    { subject: t('ielts.radar.grammar'), score: scores.grammar, fullMark: 9 },
    { subject: t('ielts.radar.pronunciation'), score: scores.pronunciation, fullMark: 9 },
    { subject: t('ielts.radar.coherence'), score: scores.coherence, fullMark: 9 }
  ];

  if (showResults && scores) {
    const radarData = prepareRadarData(scores);
    const overallScore = getOverallScore(scores);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('ielts.results.title')}</h1>
        </div>

        {/* Overall Score */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{overallScore}</div>
                <div className="text-white/80 text-sm">{t('ielts.results.band_score')}</div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('ielts.results.excellent')}</h2>
            <p className="text-gray-600">{t('ielts.results.feedback')}</p>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">{t('ielts.results.detailed_analysis')}</h3>
          
          <div className="h-96 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" className="text-sm" />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 9]} 
                  tick={false}
                />
                <Radar
                  name="IELTS Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(scores).map(([key, score]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{score}</div>
                <div className="text-sm text-gray-600 font-medium">
                  {t(`ielts.radar.${key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback and Suggestions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('ielts.results.suggestions_title')}</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</div>
              <p className="text-gray-700">{t('ielts.results.suggestion1')}</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</div>
              <p className="text-gray-700">{t('ielts.results.suggestion2')}</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</div>
              <p className="text-gray-700">{t('ielts.results.suggestion3')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetTest}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{t('ielts.results.try_again')}</span>
          </button>
          <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{t('ielts.results.view_report')}</span>
          </button>
        </div>
      </div>
    );
  }

  if (selectedPart && !showResults) {
    const currentPart = parts.find(p => p.id === selectedPart);
    const questions = sampleQuestions[selectedPart as keyof typeof sampleQuestions];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${currentPart?.color} p-8 text-white`}>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">{currentPart?.title}</h1>
              <p className="text-lg opacity-90">{currentPart?.description}</p>
            </div>
          </div>

          <div className="p-8">
            {!isRecording ? (
              <>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('ielts.sample_question')}</h3>
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {questions[0]}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={startRecording}
                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group mx-auto"
                  >
                    <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>{t('ielts.start_recording')}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('ielts.recording_in_progress')}</h3>
                <div className="text-4xl font-mono font-bold text-red-600 mb-8">
                  {formatTime(recordingTime)}
                </div>

                <button
                  onClick={stopRecording}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group mx-auto"
                >
                  <Square className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>{t('ielts.stop_recording')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('ielts.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('ielts.subtitle')}
        </p>
      </div>

      {/* Part Selection */}
      <div className="grid md:grid-cols-3 gap-8">
        {parts.map((part) => (
          <div
            key={part.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedPart(part.id)}
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${part.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-4 group-hover:text-blue-600 transition-colors">
              {part.title}
            </h3>
            <p className="text-gray-600 text-center mb-4 leading-relaxed">
              {part.description}
            </p>
            <div className="text-center">
              <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {part.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IELTSEvaluation;