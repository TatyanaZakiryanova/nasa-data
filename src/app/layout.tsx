import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';

import { AuthProvider } from './context/auth-context';
import { ToastProvider } from './context/toast-context';

export const metadata: Metadata = {
  title: 'NASA Data',
  icons: {
    icon: '/favicon.png',
  },
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
      <AuthProvider>
        <ToastProvider>
          <body className={roboto.className}>{children}</body>
        </ToastProvider>
      </AuthProvider>
    </html>
  );
}
