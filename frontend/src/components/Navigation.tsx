import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, BarChart3, Award, LogOut, Bot, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageToggle from './LanguageToggle';

const Navigation: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  // 所有导航项
  const allNavItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/assistant', label: 'AI辅助', icon: Bot },
    { path: '/dashboard', label: '练习记录', icon: BarChart3, protected: true },
    { path: '/mode', label: 'AI面试', icon: MessageCircle, protected: true },
    { path: '/ielts', label: 'IELTS', icon: Award, protected: true },
    { path: '/report', label: '分析报告', icon: FileText, protected: true },
  ];

  // 未登录时显示的导航项
  const publicNavItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/assistant', label: 'AI辅助', icon: Bot },
    { path: '/guide', label: '使用指南', icon: FileText },
  ];

  // 根据登录状态选择显示的导航项
  const visibleNavItems = isAuthenticated ? allNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                AI面试大师
              </h1>
              <p className="text-xs text-gray-500">智能面试平台</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                title="退出登录"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">退出</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg font-medium transition-all duration-200"
              >
                <span>登录</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-center space-x-1 pb-3 overflow-x-auto">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 min-w-0 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navigation;