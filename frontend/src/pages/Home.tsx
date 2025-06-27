import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageCircle, BarChart3, Award, ArrowRight, Star, Users, Zap, BookOpen, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MessageCircle,
      title: t('home.features.interview.title'),
      description: t('home.features.interview.desc'),
      link: '/mode',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: t('home.features.analysis.title'),
      description: t('home.features.analysis.desc'),
      link: '/analysis',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Award,
      title: t('home.features.ielts.title'),
      description: t('home.features.ielts.desc'),
      link: '/ielts',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: t('home.stats.users') },
    { icon: MessageCircle, value: '100K+', label: t('home.stats.interviews') },
    { icon: Star, value: '4.9', label: t('home.stats.rating') },
    { icon: Zap, value: '99%', label: t('home.stats.accuracy') }
  ];

  // 成功案例数据
  const successStories = [
    {
      id: 1,
      name: '张一鸣',
      position: '前端工程师',
      company: '阿里巴巴',
      comment: '全靠AI帮我准备！面试表现超出预期',
      avatar: '👨‍💻',
      rating: 5
    },
    {
      id: 2,
      name: '李小美',
      position: '产品经理',
      company: '腾讯',
      comment: 'IELTS口语从6分提升到7.5分',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      id: 3,
      name: '王强',
      position: '算法工程师',
      company: '字节跳动',
      comment: '模拟面试让我更有信心',
      avatar: '👨‍🔬',
      rating: 5
    },
    {
      id: 4,
      name: '陈雨',
      position: 'UI设计师',
      company: '美团',
      comment: '分析报告非常详细，帮助很大',
      avatar: '👩‍🎨',
      rating: 5
    },
    {
      id: 5,
      name: '刘明',
      position: '数据分析师',
      company: '滴滴',
      comment: '三种模式都很实用，推荐！',
      avatar: '👨‍📊',
      rating: 5
    },
    {
      id: 6,
      name: '赵丽',
      position: '运营专员',
      company: '小红书',
      comment: '语音识别很准确，体验很棒',
      avatar: '👩‍💻',
      rating: 5
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-6">
            AI 面试大师平台
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/guide"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <BookOpen className="w-6 h-6" />
            <span>使用指南</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to={isAuthenticated ? "/mode" : "/login"}
            className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Bot className="w-6 h-6" />
            <span>进入 AI 面试</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={isAuthenticated ? feature.link : "/login"}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">{t('home.features.learn_more')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Success Stories Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">成功案例</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            看看其他用户如何通过AI面试助手实现职业突破
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{story.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{story.position}</p>
                  <p className="text-xs text-gray-500">{story.company}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="w-6 h-6 text-gray-300 absolute -top-2 -left-1" />
                <p className="text-gray-700 italic pl-4 leading-relaxed">
                  {story.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <Link
            to={isAuthenticated ? "/mode" : "/login"}
            className="inline-flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold transition-all duration-300 group"
          >
            <span>{t('home.cta.button')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Home;