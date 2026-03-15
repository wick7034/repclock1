'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3 } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/stats', label: 'Stats', icon: BarChart3 },
];

export default function BottomTab() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-gray-800 safe-area-pb"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
    >
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 py-2 transition-colors ${
                active ? 'text-green-500' : 'text-gray-500 hover:text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
