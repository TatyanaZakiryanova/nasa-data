'use client';

import { CircleUser, LogIn, LogOut, UserPlus } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from './contexts/auth-context';
import Button from './ui/button';

export default function Home() {
  const { user, logout } = useAuth();
  const buttonClasses = 'flex items-center justify-center p-4 text-xs';
  const linkClasses = 'inline-flex justify-center gap-1';

  return (
    <main className="relative flex h-screen flex-col items-center bg-customBackground p-12">
      <aside className="absolute bottom-8 right-2 top-2 flex max-h-5 gap-2 text-sm text-customTextColor">
        {user ? (
          <>
            <Button className={`${buttonClasses}`}>
              <Link href="/main/profile" className={`${linkClasses}`}>
                <CircleUser size={15} /> Profile
              </Link>
            </Button>
            <Button className={`${buttonClasses}`} onClick={logout}>
              <LogOut size={15} />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button className={`${buttonClasses}`}>
              <Link href="/main/registration" className={`${linkClasses}`}>
                <UserPlus size={15} /> Sign Up
              </Link>
            </Button>
            <Button className={`${buttonClasses}`}>
              <Link href="/main/login" className={`${linkClasses}`}>
                <LogIn size={15} /> Sign In
              </Link>
            </Button>
          </>
        )}
      </aside>
      <h1 className="gradient-text mt-16 text-4xl font-bold tracking-wide sm:text-6xl md:text-6xl lg:text-7xl">
        NASA Data
      </h1>
      <span className="text-sm text-white sm:text-xs md:text-sm">
        collection of NASA photos and knowledge
      </span>
      <Link
        href="/main"
        className="text-md md:text-l mt-10 flex w-56 cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-customButton px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-customButtonHover sm:w-64 sm:px-7 sm:py-5"
      >
        Discover the universe
      </Link>
    </main>
  );
}
