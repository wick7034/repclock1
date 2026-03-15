'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Loader2, Medal } from 'lucide-react';
import { getLeaderboard, type LeaderboardRow } from '@/lib/supabase-sessions';

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-6 h-6 text-amber-400" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
  return (
    <span className="w-8 text-center text-lg font-bold text-gray-500">
      {rank}
    </span>
  );
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLeaderboard(50).then(({ data, error: err }) => {
      setLoading(false);
      if (err) setError(err.message);
      else setRows(data ?? []);
    });
  }, []);

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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="w-8 h-8 text-green-500" />
            Leaderboard
          </h1>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-6 text-center text-gray-400"
          >
            {error}
            <p className="text-sm mt-2">Check your Supabase config in .env.local</p>
          </motion.div>
        )}

        {!loading && !error && rows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            No one on the board yet. Complete a workout to get on top!
          </motion.div>
        )}

        {!loading && !error && rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-300">
              Top by total reps
            </h2>
            <div className="space-y-3">
              {rows.map((row, index) => (
                <div
                  key={row.display_name}
                  className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl"
                >
                  <RankIcon rank={index + 1} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">
                      {row.display_name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {row.total_sessions} session
                      {row.total_sessions !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-500 shrink-0">
                    {row.total_reps.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
