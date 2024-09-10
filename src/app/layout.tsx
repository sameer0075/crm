'use client';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
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
