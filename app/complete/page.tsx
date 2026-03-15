'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Chrome as Home, Play, Trophy } from 'lucide-react';

function CompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') || 'pushup';
  const reps = parseInt(searchParams.get('reps') || '0');
  const completed = parseInt(searchParams.get('completed') || '0');
  const total = parseInt(searchParams.get('total') || '60');

  const score = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>

        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold"
          >
            Session Complete!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg"
          >
            Great work today
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-3xl p-8 space-y-6"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-lg">
                {type === 'pushup' ? 'Pushups' : 'Pullups'} Completed
              </span>
              <span className="text-3xl font-bold text-green-500">{reps}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-lg">Minutes Completed</span>
              <span className="text-3xl font-bold">
                {completed} / {total}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-lg">Completion Score</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="text-4xl font-bold text-green-500"
                >
                  {score}%
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/workout?type=${type}`)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-lg font-semibold transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-900/50"
          >
            <Play className="w-5 h-5" />
            Start Another Session
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-5 rounded-2xl text-lg font-semibold transition-colors flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5" />
            Return Home
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          {score >= 90 && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
              className="text-green-500 text-lg font-semibold"
            >
              Outstanding performance!
            </motion.p>
          )}
          {score >= 70 && score < 90 && (
            <p className="text-blue-500 text-lg font-semibold">
              Excellent effort!
            </p>
          )}
          {score < 70 && (
            <p className="text-yellow-500 text-lg font-semibold">
              Good start! Keep pushing!
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CompleteContent />
    </Suspense>
  );
}
