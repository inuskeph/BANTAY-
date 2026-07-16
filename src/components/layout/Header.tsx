'use client';

import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 glass-card rounded-none border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Location */}
        <div className="flex items-center gap-3">
          <span className="text-lg">📍</span>
          <div>
            <p className="text-sm font-medium">Metro Manila, Philippines</p>
            <p className="text-xs text-gray-400">Last updated: Just now</p>
          </div>
          <div className="ml-4 flex items-center gap-2 px-3 py-1 bg-bantay-safe/20 border border-bantay-safe/50 rounded-full">
            <div className="w-2 h-2 bg-bantay-safe rounded-full animate-pulse" />
            <span className="text-xs text-bantay-safe font-medium">System Online</span>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search alerts, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-bantay-primary/50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-xl transition-all">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-bantay-danger text-white text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User Avatar */}
          <div className="w-9 h-9 bg-bantay-primary rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 hover:ring-bantay-primary/50 transition-all">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
