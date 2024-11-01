'use client';

import { Camera, CircleUser, House, LogIn, LogOut, Search, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '../contexts/auth-context';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const linkClasses =
    'flex items-center gap-2 rounded-lg p-3 text-sm text-white transition-all duration-300 hover:bg-customButtonHover';

  return (
    <nav className="flex items-center justify-between rounded-lg bg-customBackground p-4 shadow-md">
      <ul className="flex gap-2">
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
            Search
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-2">
        {user ? (
          <>
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
            <button onClick={logout} className={`${linkClasses}`}>
              <LogOut size={20} />
              Sign Out
            </button>
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
    </nav>
  );
}
