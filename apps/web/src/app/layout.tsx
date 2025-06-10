import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { Header } from '@/layouts/header/header';

import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Boilerplate',
  description: 'Boilerplate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={geist.className}>
      <body className='select-none bg-stone-50 antialiased'>
        <Header />
        <main className='flex flex-col'>{children}</main>
        {/* Footer */}
      </body>
    </html>
  );
}
