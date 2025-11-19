'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import { isAuthenticated } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <>
      <Navbar userEmail={authenticated ? 'user@example.com' : undefined} />
      <main className="min-h-screen">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Organize Your Work with <span className="text-primary">Task Manager</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              A modern, secure task management application to track, organize, and complete your daily tasks efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {authenticated ? (
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors inline-block"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors inline-block"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-colors inline-block"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary text-xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure</h3>
                <p className="text-slate-400">JWT-based authentication with encrypted passwords</p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-secondary text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast</h3>
                <p className="text-slate-400">Real-time task updates with responsive UI</p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-accent text-xl">★</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Scalable</h3>
                <p className="text-slate-400">Built with modern architecture for growth</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
