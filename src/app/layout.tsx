import type { Metadata } from 'next';

import { Sora } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';

import './globals.css';

import { Providers } from './providers';
import { Header } from '@root/components/header';
import { Footer } from '@components/footer';

const sora = Sora({
  subsets: ['latin'],
  preload: true
});

export const metadata: Metadata = {
  title: 'Block Out Club #blockout2024',
  description:
    'Slap & Block celebrities not supporting Palestine with one click.',
  icons: {
    icon: ['favicon/favicon.ico?v=2'],
    apple: ['favicon/apple-touch-icon.png?v=2'],
    shortcut: ['favicon/apple-touch-icon.png?v=2']
  },
  manifest: '/favicon/site.webmanifest'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang='en'
      className={`${sora.className} ${GeistMono.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
