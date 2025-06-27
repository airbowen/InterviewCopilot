import React, { useState } from 'react';
import { Phone, ArrowRight, Shield, CheckCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface PhoneAuthProps {
  onAuthSuccess: () => void;
}

interface CountryCode {
  code: string;
  name: string;
  nameEn: string;
  flag: string;
  maxLength: number;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ onAuthSuccess }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>({
    code: '+86',
    name: '中国',
    nameEn: 'China',
    flag: '🇨🇳',
    maxLength: 11
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 支持的国家/地区列表
  const countryCodes: CountryCode[] = [
    { code: '+86', name: '中国', nameEn: 'China', flag: '🇨🇳', maxLength: 11 },
    { code: '+852', name: '香港', nameEn: 'Hong Kong', flag: '🇭🇰', maxLength: 8 },
    { code: '+853', name: '澳门', nameEn: 'Macao', flag: '🇲🇴', maxLength: 8 },
    { code: '+886', name: '台湾', nameEn: 'Taiwan', flag: '🇹🇼', maxLength: 9 },
    { code: '+1', name: '美国', nameEn: 'United States', flag: '🇺🇸', maxLength: 10 },
    { code: '+44', name: '英国', nameEn: 'United Kingdom', flag: '🇬🇧', maxLength: 11 },
    { code: '+81', name: '日本', nameEn: 'Japan', flag: '🇯🇵', maxLength: 11 },
    { code: '+82', name: '韩国', nameEn: 'South Korea', flag: '🇰🇷', maxLength: 11 },
    { code: '+65', name: '新加坡', nameEn: 'Singapore', flag: '🇸🇬', maxLength: 8 },
    { code: '+60', name: '马来西亚', nameEn: 'Malaysia', flag: '🇲🇾', maxLength: 10 },
    { code: '+66', name: '泰国', nameEn: 'Thailand', flag: '🇹🇭', maxLength: 9 },
    { code: '+84', name: '越南', nameEn: 'Vietnam', flag: '🇻🇳', maxLength: 10 },
    { code: '+91', name: '印度', nameEn: 'India', flag: '🇮🇳', maxLength: 10 },
    { code: '+61', name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺', maxLength: 9 },
    { code: '+49', name: '德国', nameEn: 'Germany', flag: '🇩🇪', maxLength: 11 },
    { code: '+33', name: '法国', nameEn: 'France', flag: '🇫🇷', maxLength: 10 },
    { code: '+39', name: '意大利', nameEn: 'Italy', flag: '🇮🇹', maxLength: 10 },
    { code: '+34', name: '西班牙', nameEn: 'Spain', flag: '🇪🇸', maxLength: 9 },
    { code: '+7', name: '俄罗斯', nameEn: 'Russia', flag: '🇷🇺', maxLength: 10 },
    { code: '+55', name: '巴西', nameEn: 'Brazil', flag: '🇧🇷', maxLength: 11 }
  ];

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 6) {
      setError(language === 'zh' ? '请输入正确的手机号码' : 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // 模拟调用腾讯云短信服务
    setTimeout(() => {
      setIsLoading(false);
      setStep('verification');
      console.log(`发送验证码到: ${selectedCountry.code} ${phoneNumber}`);
    }, 1500);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      setError(language === 'zh' ? '请输入6位验证码' : 'Please enter 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // 模拟验证
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === '123456') {
        onAuthSuccess();
      } else {
        setError(language === 'zh' ? '验证码错误，请重新输入' : 'Invalid verification code, please try again');
      }
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const maxLength = selectedCountry.maxLength;
    
    if (numbers.length <= maxLength) {
      // 根据不同国家格式化手机号
      if (selectedCountry.code === '+86') {
        // 中国手机号格式: 138 0013 8000
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7)}`;
      } else if (selectedCountry.code === '+1') {
        // 美国手机号格式: (555) 123-4567
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
      } else {
        // 其他国家简单格式化
        if (numbers.length <= 4) return numbers;
        if (numbers.length <= 8) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
        return `${numbers.slice(0, 4)} ${numbers.slice(4, 8)} ${numbers.slice(8)}`;
      }
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    const numbersOnly = formatted.replace(/\D/g, '');
    if (numbersOnly.length <= selectedCountry.maxLength) {
      setPhoneNumber(formatted);
    }
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setPhoneNumber('');
    setShowCountryDropdown(false);
  };

  if (step === 'phone') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <LanguageToggle />
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'zh' ? '手机验证登录' : 'Phone Verification Login'}
            </h1>
            <p className="text-gray-600">
              {language === 'zh' ? '请输入您的手机号码以接收验证码' : 'Please enter your phone number to receive verification code'}
            </p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '手机号码' : 'Phone Number'}
              </label>
              <div className="relative">
                {/* 国家代码选择器 */}
                <div className="absolute inset-y-0 left-0 flex">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center space-x-2 px-3 py-3 border-r border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-xl"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  
                  {/* 国家代码下拉菜单 */}
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm font-medium text-gray-700">{country.code}</span>
                          <span className="text-sm text-gray-600 flex-1">
                            {language === 'zh' ? country.name : country.nameEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={
                    selectedCountry.code === '+86' 
                      ? (language === 'zh' ? '请输入11位手机号' : 'Enter 11-digit phone number')
                      : (language === 'zh' ? '请输入手机号' : 'Enter phone number')
                  }
                  className="block w-full pl-32 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {language === 'zh' 
                  ? `支持 ${selectedCountry.name} 手机号，最多${selectedCountry.maxLength}位数字`
                  : `Supports ${selectedCountry.nameEn} phone numbers, up to ${selectedCountry.maxLength} digits`
                }
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !phoneNumber}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{language === 'zh' ? '发送验证码' : 'Send Code'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>{language === 'zh' ? '您的信息将被安全保护' : 'Your information will be securely protected'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'zh' ? '输入验证码' : 'Enter Verification Code'}
          </h1>
          <p className="text-gray-600">
            {language === 'zh' ? '验证码已发送至' : 'Verification code sent to'}{' '}
            <span className="font-semibold text-blue-600">
              {selectedCountry.flag} {selectedCountry.code} {phoneNumber}
            </span>
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '验证码' : 'Verification Code'}
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder={language === 'zh' ? '请输入6位验证码' : 'Enter 6-digit code'}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg text-center tracking-widest"
              maxLength={6}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || verificationCode.length !== 6}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{language === 'zh' ? '登录' : 'Login'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setStep('phone')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            {language === 'zh' ? '重新输入手机号' : 'Re-enter phone number'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {language === 'zh' 
              ? '没有收到验证码？请检查短信或稍后重试' 
              : "Didn't receive the code? Please check SMS or try again later"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;