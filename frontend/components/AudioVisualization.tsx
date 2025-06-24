'use client';

import { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

interface AudioVisualizationProps {
  isRecording: boolean;
}

export default function AudioVisualization({ isRecording }: AudioVisualizationProps) {
  const [bars, setBars] = useState<number[]>(Array(12).fill(0.2));

  useEffect(() => {
    if (!isRecording) {
      setBars(Array(12).fill(0.2));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => 0.2 + Math.random() * 0.8));
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Microphone Icon */}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
        ${isRecording 
          ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/30 animate-pulse' 
          : 'bg-gradient-to-r from-gray-400 to-gray-500'
        }
      `}>
        <Mic className="h-8 w-8 text-white" />
      </div>

      {/* Audio Bars */}
      <div className="flex items-end space-x-1 h-16">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`
              w-1 rounded-full transition-all duration-100 ease-out
              ${isRecording 
                ? 'bg-gradient-to-t from-blue-500 to-blue-400' 
                : 'bg-gray-300'
              }
            `}
            style={{ 
              height: `${height * 100}%`,
              minHeight: '8px'
            }}
          />
        ))}
      </div>
    </div>
  );
}