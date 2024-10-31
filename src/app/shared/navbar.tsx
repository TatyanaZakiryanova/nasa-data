'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
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
            Search
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-2">
        <li>
          <Link
            href="/dashboard/login"
            className={`${linkClasses} ${pathname === '/dashboard/login' ? 'bg-customButton font-bold text-white' : 'text-white'}`}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className={`${linkClasses} ${
              pathname === '/' ? 'bg-customButton font-bold text-white' : 'text-white'
            }`}
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
