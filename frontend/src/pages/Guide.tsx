import React from 'react';
import { ArrowLeft, Mic, Monitor, Zap, Chrome, Volume2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Guide: React.FC = () => {
  const { t } = useLanguage();

  const modes = [
    {
      id: 'voice',
      title: t('guide.modes.voice.title'),
      description: t('guide.modes.voice.desc'),
      icon: Mic,
      color: 'from-blue-500 to-indigo-600',
      features: [
        t('guide.modes.voice.feature1'),
        t('guide.modes.voice.feature2'),
        t('guide.modes.voice.feature3')
      ]
    },
    {
      id: 'screen',
      title: t('guide.modes.screen.title'),
      description: t('guide.modes.screen.desc'),
      icon: Monitor,
      color: 'from-green-500 to-emerald-600',
      features: [
        t('guide.modes.screen.feature1'),
        t('guide.modes.screen.feature2'),
        t('guide.modes.screen.feature3')
      ]
    },
    {
      id: 'advanced',
      title: t('guide.modes.advanced.title'),
      description: t('guide.modes.advanced.desc'),
      icon: Zap,
      color: 'from-purple-500 to-violet-600',
      features: [
        t('guide.modes.advanced.feature1'),
        t('guide.modes.advanced.feature2'),
        t('guide.modes.advanced.feature3')
      ]
    }
  ];

  const steps = [
    {
      step: 1,
      title: t('guide.steps.1.title'),
      description: t('guide.steps.1.desc'),
      icon: Chrome
    },
    {
      step: 2,
      title: t('guide.steps.2.title'),
      description: t('guide.steps.2.desc'),
      icon: Volume2
    },
    {
      step: 3,
      title: t('guide.steps.3.title'),
      description: t('guide.steps.3.desc'),
      icon: Settings
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('guide.back')}</span>
        </Link>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('guide.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('guide.subtitle')}
          </p>
        </div>
      </div>

      {/* Interview Modes */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          {t('guide.modes.title')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${mode.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                  {mode.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {mode.description}
                </p>
                
                <div className="space-y-3">
                  {mode.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Setup Steps */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          {t('guide.setup.title')}
        </h2>
        
        <div className="space-y-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-8 flex items-start space-x-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Browser Compatibility */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Chrome className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('guide.browser.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('guide.browser.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          to="/login"
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <span>{t('guide.cta')}</span>
          <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Guide;