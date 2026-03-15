'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4"
          >
            <Activity className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="text-5xl font-bold tracking-tight">RepClock</h1>
          <p className="text-xl text-gray-400">Strength Every Minute</p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/workout?type=pushup')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl text-lg font-semibold transition-colors shadow-lg shadow-green-900/50"
          >
            Start Pushup Session
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/workout?type=pullup')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl text-lg font-semibold transition-colors shadow-lg shadow-blue-900/50"
          >
            Start Pullup Session
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 pt-4"
        >
          <Link href="/protocol" className="hover:text-gray-300 transition-colors underline underline-offset-2">
            MinuteRep Protocol
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
