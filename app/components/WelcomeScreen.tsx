'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { setUsername } from '@/lib/storage';

type Props = {
  onComplete: () => void;
};

export default function WelcomeScreen({ onComplete }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a name');
      return;
    }
    setError('');
    setUsername(trimmed);
    onComplete();
  };

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-center text-gray-400">
            What should we call you?
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Your name"
              maxLength={32}
              autoComplete="name"
              className="w-full bg-gray-800/80 border border-gray-700 rounded-2xl px-5 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl text-lg font-semibold transition-colors shadow-lg shadow-green-900/50"
            >
              Continue
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
