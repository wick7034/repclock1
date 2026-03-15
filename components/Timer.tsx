'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
  onTick?: (remaining: number) => void;
  onComplete?: () => void;
  onStartMinute?: () => void;
}

export function Timer({
  seconds,
  onTick,
  onComplete,
  onStartMinute,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    setTimeLeft(seconds);
    hasStartedRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [seconds]);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      onStartMinute?.();
    }

    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTick?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, onTick, onComplete, onStartMinute]);

  const percentage = (timeLeft / seconds) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            initial={false}
            animate={{
              strokeDashoffset: 2 * Math.PI * 88 * (1 - percentage / 100),
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-white"
          >
            {timeLeft}
          </motion.span>
        </div>
      </div>
      <div className="text-sm text-gray-400">seconds</div>
    </div>
  );
}
