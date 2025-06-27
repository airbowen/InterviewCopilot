import React from 'react';
import { Mail } from 'lucide-react';
import { SiBilibili, SiTiktok } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Contact */}
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{t('footer.contact')}: support@example.com</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
              title="Bilibili"
            >
              <SiBilibili className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{t('footer.bilibili')}</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors group"
              title="Douyin"
            >
              <SiTiktok className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{t('footer.douyin')}</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors group"
              title="Xiaohongshu"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded text-white text-xs font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                小
              </div>
              <span className="text-sm font-medium">{t('footer.xiaohongshu')}</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © 2025 {t('nav.brand')}. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;