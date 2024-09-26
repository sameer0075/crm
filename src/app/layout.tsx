'use client';
import { useEffect } from 'react';
import localFont from 'next/font/local';
import { usePathname, useRouter } from 'next/navigation';
import { PrimeReactProvider } from 'primereact/api';

import Header from './components/Header/index';
import Providers from './providers';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleAthentication = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  };

  useEffect(() => {
    handleAthentication();
  }, []);

  useEffect(() => {
    router.prefetch('/leads');
    router.prefetch('/opportunity');
    router.prefetch('/');
    router.prefetch('/details/[id]');
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrimeReactProvider>
          {pathname && pathname != '/' && <Header />}
          <Providers>{children}</Providers>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
