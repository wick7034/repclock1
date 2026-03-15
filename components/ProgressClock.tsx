'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MinuteStatus } from '@/lib/types';

interface ProgressClockProps {
  totalMinutes: number;
  minuteStatuses: MinuteStatus[];
  currentMinute: number;
  secondsLeft?: number;
  totalSeconds?: number;
}

export function ProgressClock({
  totalMinutes,
  minuteStatuses,
  currentMinute,
  secondsLeft = 60,
  totalSeconds = 60,
}: ProgressClockProps) {
  const radius = 140;
  const strokeWidth = 12;
  const center = 160;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / totalMinutes;
  const gapLength = 2;

  const secondsPercentage = (secondsLeft / totalSeconds) * 100;

  return (
    <div className="flex items-center justify-center relative">
      <svg width="320" height="320" className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {Array.from({ length: totalMinutes }).map((_, index) => {
          const minute = index + 1;
          const status = minuteStatuses.find((s) => s.minute === minute);
          const offset = index * segmentLength;

          let color = 'rgba(255, 255, 255, 0.1)';
          if (status?.completed) {
            color = '#10b981';
          } else if (status?.skipped) {
            color = '#ef4444';
          } else if (minute === currentMinute) {
            color = '#3b82f6';
          }

          return (
            <motion.circle
              key={minute}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength - gapLength} ${circumference - segmentLength + gapLength}`}
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{
                strokeDasharray: `${segmentLength - gapLength} ${circumference - segmentLength + gapLength}`,
              }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
            />
          );
        })}

        <motion.circle
          cx={center}
          cy={center}
          r={radius + 10}
          fill="none"
          stroke="#6366f1"
          strokeWidth={6}
          strokeDasharray={`${(circumference / totalMinutes) * secondsPercentage / 100} ${circumference}`}
          animate={{
            strokeDasharray: `${(circumference / totalMinutes) * secondsPercentage / 100} ${circumference}`,
          }}
          transition={{ duration: 0.1, ease: 'linear' }}
          strokeLinecap="round"
          opacity={0.6}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={secondsLeft}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="text-center"
        >
          <div className="text-6xl font-bold text-white">{secondsLeft}</div>
          <div className="text-sm text-gray-400 mt-1">seconds</div>
        </motion.div>
      </div>
    </div>
  );
}
