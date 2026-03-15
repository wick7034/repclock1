'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getStats } from '@/lib/storage';
import { UserStats } from '@/lib/types';
import { ArrowLeft, Flame, TrendingUp, Dumbbell } from 'lucide-react';

export default function StatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading stats...</div>
      </div>
    );
  }

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toDateString();
  });

  const sessionsPerDay = last7Days.map((day) => {
    return stats.sessionsHistory.filter(
      (session) => new Date(session.date).toDateString() === day
    ).length;
  });

  const maxSessions = Math.max(...sessionsPerDay, 1);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="text-3xl font-bold">Your Stats</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 space-y-2">
            <Flame className="w-8 h-8 text-white" />
            <div className="text-4xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 space-y-2">
            <TrendingUp className="w-8 h-8 text-white" />
            <div className="text-4xl font-bold">{stats.totalSessions}</div>
            <div className="text-sm text-white/80">Total Sessions</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-3xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-green-500" />
            Lifetime Totals
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Pushups</span>
              <span className="text-3xl font-bold text-green-500">
                {stats.lifetimePushups.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Pullups</span>
              <span className="text-3xl font-bold text-blue-500">
                {stats.lifetimePullups.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-3xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">Last 7 Days</h2>

          <div className="flex items-end justify-between h-32 gap-2">
            {sessionsPerDay.map((count, index) => {
              const height = (count / maxSessions) * 100;
              const date = new Date();
              date.setDate(date.getDate() - (6 - index));
              const dayLabel = date
                .toLocaleDateString('en-US', { weekday: 'short' })
                .slice(0, 1);

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full bg-gray-800 rounded-lg overflow-hidden flex items-end h-24">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`w-full ${count > 0 ? 'bg-green-500' : 'bg-gray-700'} rounded-t-lg`}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{dayLabel}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {stats.sessionsHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold">Recent Sessions</h2>

            <div className="space-y-3">
              {stats.sessionsHistory.slice(0, 5).map((session) => {
                const date = new Date(session.date);
                const dateStr = date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
                const timeStr = date.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-xl"
                  >
                    <div className="space-y-1">
                      <div className="font-semibold capitalize">
                        {session.type}s
                      </div>
                      <div className="text-sm text-gray-400">
                        {dateStr} at {timeStr}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold text-green-500">
                        {session.totalReps}
                      </div>
                      <div className="text-xs text-gray-400">
                        {session.completedMinutes} / 60 min
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {stats.totalSessions === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12 space-y-4"
          >
            <div className="text-gray-500 text-lg">
              No sessions yet. Start your first workout!
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-colors"
            >
              Start Training
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
