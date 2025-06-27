import React, { useState } from 'react';
import { Mic, Monitor, Zap, Upload, ArrowRight, Clock, Settings, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface InterviewConfig {
  mode: 'voice' | 'screen' | 'advanced';
  resume?: File;
  language: 'zh' | 'en';
  position: string;
  isIT: boolean;
  pauseDuration: number;
  additionalInfo: string;
  customPrompt: string;
}

const ModeSelection: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<InterviewConfig>({
    mode: 'voice',
    language: 'zh',
    position: '',
    isIT: false,
    pauseDuration: 1000,
    additionalInfo: '',
    customPrompt: ''
  });

  const modes = [
    {
      id: 'voice' as const,
      title: t('mode.voice.title'),
      description: t('mode.voice.desc'),
      icon: Mic,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'screen' as const,
      title: t('mode.screen.title'),
      description: t('mode.screen.desc'),
      icon: Monitor,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'advanced' as const,
      title: t('mode.advanced.title'),
      description: t('mode.advanced.desc'),
      icon: Zap,
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const handleStartInterview = async () => {
    try {
      // Save interview configuration
      const response = await fetch('/api/startInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        navigate('/interview', { state: { config } });
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('mode.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          {t('mode.subtitle')}
        </p>
        
        {/* Remaining Time */}
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            {t('mode.remaining_time')}: {formatTime(user?.remainingTime || 120)}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Mode Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('mode.select_mode')}</h2>
            
            <div className="space-y-4">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = config.mode === mode.id;
                
                return (
                  <div
                    key={mode.id}
                    onClick={() => setConfig({ ...config, mode: mode.id })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${mode.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{mode.title}</h3>
                        <p className="text-sm text-gray-600">{mode.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Configuration */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">{t('mode.config.title')}</h2>
            
            <div className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mode.config.resume')}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{t('mode.config.resume_upload')}</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                </div>
              </div>

              {/* Interview Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mode.config.language')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setConfig({ ...config, language: 'zh' })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.language === 'zh'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {t('mode.config.chinese')}
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, language: 'en' })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.language === 'en'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {t('mode.config.english')}
                  </button>
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mode.config.position')}
                </label>
                <input
                  type="text"
                  value={config.position}
                  onChange={(e) => setConfig({ ...config, position: e.target.value })}
                  placeholder={t('mode.config.position_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* IT Interview Toggle */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={config.isIT}
                    onChange={(e) => setConfig({ ...config, isIT: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {t('mode.config.is_it')}
                  </span>
                </label>
              </div>

              {/* Pause Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mode.config.pause_duration')}
                </label>
                <select
                  value={config.pauseDuration}
                  onChange={(e) => setConfig({ ...config, pauseDuration: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={500}>0.5s</option>
                  <option value={1000}>1.0s</option>
                  <option value={1500}>1.5s</option>
                  <option value={2000}>2.0s</option>
                </select>
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mode.config.additional_info')}
                </label>
                <textarea
                  value={config.additionalInfo}
                  onChange={(e) => setConfig({ ...config, additionalInfo: e.target.value })}
                  placeholder={t('mode.config.additional_info_placeholder')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Custom Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mode.config.custom_prompt')}
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={config.customPrompt}
                    onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
                    placeholder={t('mode.config.custom_prompt_placeholder')}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleStartInterview}
                disabled={!config.position.trim()}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{t('mode.start_interview')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;