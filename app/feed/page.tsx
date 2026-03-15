'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Rss, Loader2 } from 'lucide-react';
import { getRecentSessions, type CompletedSessionRow } from '@/lib/supabase-sessions';

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const sec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (sec < 60) return 'Just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function FeedPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<CompletedSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecentSessions(50).then(({ data, error: err }) => {
      setLoading(false);
      if (err) setError(err.message);
      else setSessions(data ?? []);
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
            <Rss className="w-8 h-8 text-green-500" />
            Global Feed
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

        {!loading && !error && sessions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            No sessions yet. Complete a workout to see it here!
          </motion.div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-2xl border border-gray-800"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-white">
                    {session.display_name || 'Anonymous'}
                  </div>
                  <div className="text-sm text-gray-400 capitalize">
                    {session.type}s · {session.completed_minutes}/60 min
                  </div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="text-2xl font-bold text-green-500">
                    {session.total_reps}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatRelativeTime(session.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
