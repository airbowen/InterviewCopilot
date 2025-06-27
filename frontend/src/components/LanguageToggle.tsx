import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
      title={language === 'zh' ? '切换到英文' : 'Switch to Chinese'}
    >
      <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium">
        {language === 'zh' ? '中' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;