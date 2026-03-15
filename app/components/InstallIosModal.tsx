'use client';

import * as React from 'react';
import { X, Share, Plus } from 'lucide-react';

const STORAGE_KEY = 'repclock-ios-install-dismissed';

export default function InstallIosModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
    }
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/70"
        onClick={handleDismiss}
        aria-hidden
      />
      <div className="fixed left-4 right-4 bottom-24 z-[101] max-w-sm mx-auto bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-white">
            Add RepClock to Home Screen
          </h3>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-full text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li className="flex items-center gap-2">
            <Share className="w-4 h-4 text-green-500 shrink-0" />
            Tap the <strong className="text-white">Share</strong> button (box
            with arrow) in Safari.
          </li>
          <li className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-green-500 shrink-0" />
            Scroll and tap <strong className="text-white">Add to Home Screen</strong>.
          </li>
          <li>Tap <strong className="text-white">Add</strong> to confirm.</li>
        </ol>
        <button
          type="button"
          onClick={handleDismiss}
          className="mt-4 w-full py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700"
        >
          Got it
        </button>
      </div>
    </>
  );
}

export function wasIosInstallDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}
