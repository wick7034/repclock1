'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ProtocolPage() {
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: 'Perform a small set of reps every minute.',
      description: 'Start the timer. Do your reps quickly, then rest.',
    },
    {
      number: 2,
      title: 'After finishing the reps, rest until the next minute begins.',
      description: 'You have plenty of time to recover before the next round.',
    },
    {
      number: 3,
      title: 'Because each set is easy, fatigue stays low.',
      description: 'Light sets mean you can maintain quality and consistency.',
    },
    {
      number: 4,
      title: 'Over time, the total number of reps becomes very high.',
      description: 'Multiply: 2 pushups × 60 minutes = 120 total pushups.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full py-8">
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 self-start"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">MinuteRep Protocol</h1>
            <p className="text-xl text-gray-400">Build strength one minute at a time</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h2 className="text-lg font-semibold">{step.title}</h2>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-3"
          >
            <h3 className="font-semibold text-lg">Why It Works</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Low fatigue per set keeps quality high</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Rest between minutes prevents burnout</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Cumulative volume builds strength effectively</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                <span>Sustainable for daily practice</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-900/20 border border-blue-800/30 rounded-2xl p-6 space-y-3"
          >
            <h3 className="font-semibold text-lg">Example</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="font-mono bg-black/50 p-3 rounded">
                Week 1: 2 pushups every minute × 60 minutes = 120 total pushups
              </p>
              <p className="text-gray-400">
                That's a full workout completed in 60 minutes with minimal fatigue, and you can do this every day.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.back()}
        className="w-full max-w-md mx-auto bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-lg font-semibold transition-colors"
      >
        Got it, let's train
      </motion.button>
    </div>
  );
}
