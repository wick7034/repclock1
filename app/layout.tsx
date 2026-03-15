import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BottomTab from './components/BottomTab';
import PwaRegister from './components/PwaRegister';
import UsernameGate from './components/UsernameGate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RepClock - Strength Every Minute',
  description: 'Build strength one minute at a time with RepClock',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className={inter.className}>
        <PwaRegister />
        <UsernameGate>
          <div className="pb-16">{children}</div>
          <BottomTab />
        </UsernameGate>
      </body>
    </html>
  );
}
