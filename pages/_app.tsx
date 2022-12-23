import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} className={`${inter.variable} font-sans`} />
      </QueryClientProvider>
    </>
  );
}
