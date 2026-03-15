'use client';

import { useEffect, useState } from 'react';
import { getUsername } from '@/lib/storage';
import WelcomeScreen from './WelcomeScreen';

export default function UsernameGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (getUsername()) setShowWelcome(false);
  }, []);

  const handleWelcomeComplete = () => setShowWelcome(false);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black" aria-hidden>
        {/* Avoid flash of main app before we know username */}
      </div>
    );
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return <>{children}</>;
}
