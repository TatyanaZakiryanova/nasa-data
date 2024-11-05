'use client';

import { Camera, CircleUser, House, LogIn, LogOut, Search, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '../contexts/auth-context';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const linkClasses =
    'flex items-center gap-2 rounded-lg p-3 text-sm text-white transition-all duration-300 hover:bg-customButtonHover';

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative flex items-center justify-between rounded-lg bg-customBackground p-4 shadow-md">
      <button onClick={toggleMenu} className="lg:hidden">
        <span className="text-white">☰</span>
      </button>
      <div
        className={`w-full lg:flex lg:justify-between ${isMenuOpen ? 'absolute left-0 right-0 top-full z-10 block w-full rounded-lg bg-customBackground' : 'hidden'} lg:block`}
      >
        <ul className="flex flex-col lg:flex-row lg:gap-2">
          <li>
            <Link
              href="/dashboard"
              className={`${linkClasses} ${
                pathname === '/dashboard' ? 'bg-customButton font-bold' : ''
              }`}
            >
              <Camera size={20} />
              Photo of the day
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/search"
              className={`${linkClasses} ${
                pathname === '/dashboard/search'
                  ? 'bg-customButton font-bold text-white'
                  : 'text-white'
              }`}
            >
              <Search size={20} />
              Photo search
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col lg:mt-0 lg:flex-row lg:gap-2">
          {user ? (
            <>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`${linkClasses} ${
                    pathname === '/dashboard/profile'
                      ? 'bg-customButton font-bold text-white'
                      : 'text-white'
                  }`}
                >
                  <CircleUser size={20} />
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout} className={`${linkClasses}`}>
                  <LogOut size={20} />
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/dashboard/registration"
                  className={`${linkClasses} ${pathname === '/dashboard/registration' ? 'bg-customButton font-bold text-white' : 'text-white'}`}
                >
                  <UserPlus size={20} />
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/login"
                  className={`${linkClasses} ${
                    pathname === '/dashboard/login'
                      ? 'bg-customButton font-bold text-white'
                      : 'text-white'
                  }`}
                >
                  <LogIn size={20} />
                  Sign In
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              href="/"
              className={`${linkClasses} ${
                pathname === '/' ? 'bg-customButton font-bold text-white' : 'text-white'
              }`}
            >
              <House size={20} />
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
