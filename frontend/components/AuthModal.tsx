'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Shield, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export default function AuthModal({ isOpen, onClose, onAuthenticated }: AuthModalProps) {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('code');
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onAuthenticated();
  };

  const resetModal = () => {
    setStep('phone');
    setPhone('');
    setCode('');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetModal();
      }
    }}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            <Shield className="h-6 w-6 mr-2 text-blue-600" />
            {step === 'phone' ? 'Phone Verification' : 'Enter Verification Code'}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone' 
              ? 'We\'ll send you a verification code to secure your account'
              : `We sent a 6-digit code to ${phone}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendCode}
                disabled={!phone.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Sending Code...
                  </div>
                ) : (
                  <>
                    Send Verification Code
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('phone')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleVerifyCode}
                  disabled={code.length !== 6 || isLoading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Login'
                  )}
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSendCode}
                className="w-full text-blue-600 hover:text-blue-700"
              >
                Resend Code
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}