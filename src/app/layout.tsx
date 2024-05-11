import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { Providers } from './providers';
import { Footer } from '@root/components/footer';

import './globals.css';

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
      className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className='bg-neutral-100 dark:bg-neutral-950'>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
