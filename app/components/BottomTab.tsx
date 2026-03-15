'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Home, BarChart3, Download } from 'lucide-react';
import InstallIosModal, { wasIosInstallDismissed } from './InstallIosModal';

const INSTALLED_KEY = 'repclock-pwa-installed';

const navTabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/stats', label: 'Stats', icon: BarChart3 },
];

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (nav.standalone === true) ||
    document.referrer.includes('android-app://')
  );
}

function isIos(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints > 1);
}

export default function BottomTab() {
  const pathname = usePathname();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installPromptHandled, setInstallPromptHandled] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [showInstallTab, setShowInstallTab] = useState(false);

  const isActive = useCallback(
    (href: string) =>
      href === '/' ? pathname === '/' : pathname.startsWith(href),
    [pathname]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isStandalone()) {
      setShowInstallTab(false);
      setInstalled(true);
      return;
    }
    try {
      if (localStorage.getItem(INSTALLED_KEY) === 'true') {
        setShowInstallTab(false);
        setInstalled(true);
        return;
      }
    } catch {}

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setShowInstallTab(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setInstallPromptHandled(true);
      setInstalled(true);
      setShowInstallTab(false);
      try {
        localStorage.setItem(INSTALLED_KEY, 'true');
      } catch {}
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (isIos() && !wasIosInstallDismissed()) {
      setShowInstallTab(true);
    } else if (installPrompt) {
      setShowInstallTab(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (installPrompt && !installed) setShowInstallTab(true);
  }, [installPrompt, installed]);

  const handleInstallClick = useCallback(() => {
    if (installPrompt && !installPromptHandled) {
      installPrompt.prompt();
      installPrompt.userChoice.then(({ outcome }) => {
        setInstallPromptHandled(true);
        if (outcome === 'accepted') setInstalled(true);
      });
      return;
    }
    if (isIos()) {
      setShowIosModal(true);
    }
  }, [installPrompt, installPromptHandled]);

  const tabs = [...navTabs];
  const installIndex = 1;
  if (showInstallTab) {
    tabs.splice(installIndex, 0, {
      href: '#install',
      label: 'Install',
      icon: Download,
    });
  }

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-gray-800 safe-area-pb"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
      >
        <div className="flex items-center justify-around h-14 max-w-md mx-auto">
          {tabs.map((tab, i) => {
            if (tab.href === '#install') {
              return (
                <button
                  key="install"
                  type="button"
                  onClick={handleInstallClick}
                  className="flex flex-col items-center justify-center flex-1 gap-0.5 py-2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  <tab.icon className="w-6 h-6" strokeWidth={2} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            }
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center flex-1 gap-0.5 py-2 transition-colors ${
                  active ? 'text-green-500' : 'text-gray-500 hover:text-gray-400'
                }`}
              >
                <tab.icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <InstallIosModal open={showIosModal} onClose={() => setShowIosModal(false)} />
    </>
  );
}
