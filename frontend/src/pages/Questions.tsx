import React, { useState } from 'react';
import { HelpCircle, Search, Filter, Code, Briefcase, Palette, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Questions: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: t('questions.categories.all'), icon: HelpCircle },
    { id: 'frontend', name: t('questions.categories.frontend'), icon: Code },
    { id: 'algorithm', name: t('questions.categories.algorithm'), icon: Briefcase },
    { id: 'product', name: t('questions.categories.product'), icon: Palette }
  ];

  const questionSets = [
    {
      id: 1,
      category: 'frontend',
      title: t('questions.sets.frontend_basics.title'),
      description: t('questions.sets.frontend_basics.desc'),
      count: 25,
      difficulty: 'beginner',
      questions: [
        t('questions.sets.frontend_basics.q1'),
        t('questions.sets.frontend_basics.q2'),
        t('questions.sets.frontend_basics.q3')
      ]
    },
    {
      id: 2,
      category: 'algorithm',
      title: t('questions.sets.algorithms.title'),
      description: t('questions.sets.algorithms.desc'),
      count: 30,
      difficulty: 'intermediate',
      questions: [
        t('questions.sets.algorithms.q1'),
        t('questions.sets.algorithms.q2'),
        t('questions.sets.algorithms.q3')
      ]
    },
    {
      id: 3,
      category: 'product',
      title: t('questions.sets.product_design.title'),
      description: t('questions.sets.product_design.desc'),
      count: 20,
      difficulty: 'advanced',
      questions: [
        t('questions.sets.product_design.q1'),
        t('questions.sets.product_design.q2'),
        t('questions.sets.product_design.q3')
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuestions = questionSets.filter(set => {
    const matchesCategory = selectedCategory === 'all' || set.category === selectedCategory;
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('questions.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('questions.subtitle')}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('questions.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Question Sets */}
      <div className="space-y-6">
        {filteredQuestions.map((set) => {
          const categoryInfo = categories.find(c => c.id === set.category);
          const Icon = categoryInfo?.icon || HelpCircle;
          
          return (
            <div
              key={set.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{set.title}</h3>
                      <p className="text-gray-600 mb-3">{set.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{set.count} {t('questions.questions_count')}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(set.difficulty)}`}>
                          {t(`questions.difficulty.${set.difficulty}`)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Sample Questions */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">{t('questions.sample_questions')}</h4>
                  <div className="space-y-2">
                    {set.questions.map((question, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('questions.no_results')}</h3>
          <p className="text-gray-600">{t('questions.try_different_search')}</p>
        </div>
      )}
    </div>
  );
};

export default Questions;