import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'NASA Data',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
