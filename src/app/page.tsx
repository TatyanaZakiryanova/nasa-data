import { LogIn, Telescope, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center bg-customBackground p-12">
      <aside className="absolute bottom-8 right-4 top-4 flex max-h-5 gap-4 text-sm text-customTextColor">
        <Link href="/dashboard/registration" className="inline-flex justify-center gap-2">
          <UserPlus size={15} /> Sign Up
        </Link>
        <Link href="/dashboard/login" className="inline-flex justify-center gap-2">
          <LogIn size={15} /> Sign In
        </Link>
      </aside>
      <h1 className="gradient-text text-5xl font-bold tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
        NASA Data
      </h1>
      <span className="text-sm text-white sm:text-base md:text-lg">
        collection of NASA photos and knowledge
      </span>
      <Link
        href="/dashboard"
        className="text-md md:text-l mt-28 flex w-56 cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-customButton px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-customButtonHover sm:w-64 sm:px-7 sm:py-5"
      >
        <Telescope size={20} />
        Discover the universe
      </Link>
    </main>
  );
}
