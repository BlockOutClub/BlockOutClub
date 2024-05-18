'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider enableSystem={true} attribute='class'>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
