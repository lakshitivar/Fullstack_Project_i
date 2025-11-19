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
      <main className="min-h-screen relative overflow-hidden">
        <div className="container py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Organize Your Work
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Achieve More
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                A modern, secure task management platform designed to boost productivity and streamline your workflow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              {authenticated ? (
                <Link href="/dashboard" className="inline-block">
                  <button className="btn-primary text-lg px-10 py-4">
                    <span className="flex items-center gap-2">
                      Go to Dashboard
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="inline-block">
                    <button className="btn-primary text-lg px-10 py-4">
                      Get Started
                    </button>
                  </Link>
                  <Link href="/signup" className="inline-block">
                    <button className="btn-secondary text-lg px-10 py-4">
                      Create Account
                    </button>
                  </Link>
                </>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="glass-card p-8 transform transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/50">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">High-Level Security</h3>
                <p className="text-gray-300 leading-relaxed">JWT authentication with AES-256 encryption keeps your data safe</p>
              </div>

              <div className="glass-card p-8 transform transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/50">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Lightning Fast</h3>
                <p className="text-gray-300 leading-relaxed">Real-time sync and instant updates for seamless productivity</p>
              </div>

              <div className="glass-card p-8 transform transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-pink-500/50">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Highly Scalable</h3>
                <p className="text-gray-300 leading-relaxed">Built on modern architecture that grows with your needs</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
