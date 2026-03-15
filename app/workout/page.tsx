'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressClock } from '@/components/ProgressClock';
import { getProtocol } from '@/lib/workout-protocols';
import { getWeekNumber, saveSession } from '@/lib/storage';
import { MinuteStatus, ExerciseType } from '@/lib/types';
import { CircleCheck as CheckCircle2, SkipForward, Circle as XCircle } from 'lucide-react';

function WorkoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') || 'pushup') as ExerciseType;

  const [currentMinute, setCurrentMinute] = useState(1);
  const [minuteStatuses, setMinuteStatuses] = useState<MinuteStatus[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [weekNumber, setWeekNumber] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const protocol = getProtocol(type);

  useEffect(() => {
    setWeekNumber(getWeekNumber(type));
  }, [type]);

  useEffect(() => {
    setSecondsLeft(60);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        const newSeconds = prev - 1;
        if (newSeconds <= 0) {
          advanceMinute();
          return 60;
        }
        return newSeconds;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentMinute]);

  useEffect(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  }, [currentMinute]);

  const advanceMinute = () => {
    if (currentMinute >= protocol.totalMinutes) {
      if (minuteStatuses.length >= protocol.totalMinutes) {
        completeSession(minuteStatuses);
      }
      return;
    }
    setCurrentMinute((prev) => prev + 1);
  };

  const currentReps = protocol.getRepsForMinute(currentMinute, weekNumber);

  const handleDone = () => {
    const newStatus: MinuteStatus = {
      minute: currentMinute,
      completed: true,
      skipped: false,
    };

    setMinuteStatuses((prev) => [...prev, newStatus]);

    if (currentMinute >= protocol.totalMinutes) {
      sessionTimeoutRef.current = setTimeout(() => {
        completeSession([...minuteStatuses, newStatus]);
      }, secondsLeft * 1000);
    }
  };

  const handleSkip = () => {
    const newStatus: MinuteStatus = {
      minute: currentMinute,
      completed: false,
      skipped: true,
    };

    setMinuteStatuses((prev) => [...prev, newStatus]);

    if (currentMinute >= protocol.totalMinutes) {
      sessionTimeoutRef.current = setTimeout(() => {
        completeSession([...minuteStatuses, newStatus]);
      }, secondsLeft * 1000);
    }
  };

  const completeSession = (finalStatuses: MinuteStatus[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);

    const completedMinutes = finalStatuses.filter((s) => s.completed).length;
    const totalReps = finalStatuses
      .filter((s) => s.completed)
      .reduce((sum, status) => {
        return sum + protocol.getRepsForMinute(status.minute, weekNumber);
      }, 0);

    const session = {
      id: Date.now().toString(),
      type,
      date: new Date().toISOString(),
      minuteStatuses: finalStatuses,
      totalReps,
      completedMinutes,
      weekNumber,
    };

    saveSession(session);

    router.push(
      `/complete?type=${type}&reps=${totalReps}&completed=${completedMinutes}&total=${protocol.totalMinutes}`
    );
  };

  const handleEndSession = () => {
    if (
      confirm(
        'Are you sure you want to end this session? Your progress will be saved.'
      )
    ) {
      completeSession(minuteStatuses);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full py-8">
        <div className="space-y-8 w-full">
          <div className="text-center space-y-4">
            <motion.div
              key={currentMinute}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold">
                Minute {currentMinute} / {protocol.totalMinutes}
              </div>
              <div className="text-2xl text-gray-400">
                Do {currentReps}{' '}
                {type === 'pushup' ? 'Pushup' : 'Pullup'}
                {currentReps > 1 ? 's' : ''}
              </div>
            </motion.div>
          </div>

          <ProgressClock
            totalMinutes={protocol.totalMinutes}
            minuteStatuses={minuteStatuses}
            currentMinute={currentMinute}
            secondsLeft={secondsLeft}
            totalSeconds={60}
          />
        </div>

        <div className="space-y-6 w-full">
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDone}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-xl font-semibold transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-900/50"
            >
              <CheckCircle2 className="w-6 h-6" />
              DONE
            </motion.button>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkip}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <SkipForward className="w-5 h-5" />
                SKIP
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEndSession}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-5 rounded-2xl text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                END
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-auto text-center">
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/protocol')}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline"
          >
            MinuteRep Protocol: Build strength one minute at a time
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <WorkoutContent />
    </Suspense>
  );
}
