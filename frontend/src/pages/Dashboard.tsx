import React from 'react';
import { Award, MessageCircle, TrendingUp, Clock, Star, Play, CreditCard, Timer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const recentSessions = [
    {
      id: '1',
      type: 'IELTS口语',
      score: 7.5,
      date: '2025-01-01',
      duration: '12 min',
      status: 'completed'
    },
    {
      id: '2',
      type: 'AI面试',
      score: 8.2,
      date: '2024-12-30',
      duration: '18 min',
      status: 'completed'
    },
    {
      id: 3,
      type: 'IELTS口语',
      score: 6.8,
      date: '2024-12-28',
      duration: '10 min',
      status: 'completed'
    }
  ];

  const stats = [
    {
      label: '平均分数',
      value: '7.5',
      change: '+0.3',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: '总练习次数',
      value: '24',
      change: '+3',
      icon: Clock,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      label: '最高分数',
      value: '8.5',
      change: '新纪录',
      icon: Star,
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  // 模拟用户套餐信息
  const userPackage = {
    totalTime: 300, // 总购买时长（分钟）
    usedTime: 180,  // 已使用时长（分钟）
    remainingTime: user?.remainingTime || 120, // 剩余时长（分钟）
    packageName: '标准套餐',
    expiryDate: '2025-06-01'
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;
  };

  const getUsagePercentage = () => {
    return Math.round((userPackage.usedTime / userPackage.totalTime) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              欢迎回来！👋
            </h1>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl leading-relaxed">
              继续你的AI面试练习之旅，提升口语表达能力
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/ielts')}
                className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 group"
              >
                <Award className="w-5 h-5" />
                <span className="font-semibold">开始IELTS练习</span>
                <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/mode')}
                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 group border border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">AI模拟面试</span>
                <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Package Info and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Package Information Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userPackage.packageName}</h3>
                  <p className="text-sm text-gray-500">有效期至 {userPackage.expiryDate}</p>
                </div>
              </div>
            </div>

            {/* Time Usage Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">时长使用情况</span>
                <span className="text-sm text-gray-500">{getUsagePercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-500"
                  style={{ width: `${getUsagePercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Time Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">总购买时长</span>
                </div>
                <span className="font-semibold text-gray-900">{formatTime(userPackage.totalTime)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">已使用时长</span>
                </div>
                <span className="font-semibold text-orange-600">{formatTime(userPackage.usedTime)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">剩余时长</span>
                </div>
                <span className="font-semibold text-green-600">{formatTime(userPackage.remainingTime)}</span>
              </div>
            </div>

            {/* Upgrade Button */}
            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300">
              升级套餐
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">最近练习记录</h2>
          <p className="text-gray-600">查看你的练习历史和进步轨迹</p>
        </div>
        <div className="divide-y divide-gray-100">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="p-6 hover:bg-gray-50/50 transition-colors duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                    session.type === 'IELTS口语'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      : 'bg-gradient-to-r from-teal-500 to-cyan-600'
                  }`}>
                    {session.type === 'IELTS口语' ? (
                      <Award className="w-6 h-6 text-white" />
                    ) : (
                      <MessageCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {session.type}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{session.date}</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{session.score}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">分数</div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;