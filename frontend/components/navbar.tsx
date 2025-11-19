'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

export default function Navbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <nav className="bg-card border-b border-slate-700 sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">TM</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">Task Manager</span>
        </Link>

        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-sm text-slate-400">{userEmail}</span>
          )}
          {userEmail ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-accent hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-primary hover:text-blue-400 transition-colors font-semibold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
