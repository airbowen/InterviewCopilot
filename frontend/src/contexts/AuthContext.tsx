import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  phone: string;
  remainingTime: number;
  packageInfo?: {
    name: string;
    totalTime: number;
    usedTime: number;
    expiryDate: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
  sendCode: (phone: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储的用户信息
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const sendCode = async (phone: string): Promise<boolean> => {
    // 这里可以集成腾讯云短信服务
    console.log(`发送验证码到: ${phone}`);
    
    // 模拟调用腾讯云SMS API
    try {
      // 实际集成时的代码示例：
      // const response = await fetch('/api/sms/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     phoneNumber: phone,
      //     templateId: 'your-template-id',
      //     region: 'ap-beijing' // 或其他地区
      //   })
      // });
      // return response.ok;
      
      // 模拟发送成功
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    } catch (error) {
      console.error('发送验证码失败:', error);
      return false;
    }
  };

  const login = async (phone: string, code: string): Promise<boolean> => {
    // 这里可以集成腾讯云短信验证
    console.log(`验证手机号: ${phone}, 验证码: ${code}`);
    
    try {
      // 实际集成时的代码示例：
      // const response = await fetch('/api/sms/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber: phone, code })
      // });
      // 
      // if (response.ok) {
      //   const userData = await response.json();
      //   localStorage.setItem('user', JSON.stringify(userData));
      //   setUser(userData);
      //   return true;
      // }
      
      // 模拟验证码验证 (任何6位数字都可以通过)
      if (code.length === 6) {
        const userData: User = {
          id: Date.now().toString(),
          phone,
          remainingTime: 120, // 120分钟
          packageInfo: {
            name: '标准套餐',
            totalTime: 300,
            usedTime: 180,
            expiryDate: '2025-06-01'
          }
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('验证失败:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      sendCode,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};