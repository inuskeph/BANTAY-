'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/emergency-qr', label: 'Emergency QR', icon: '🆘' },
  { href: '/family-monitor', label: 'Family Monitor', icon: '👨‍👩‍👧‍👦' },
  { href: '/fire-detection', label: 'Fire Detection', icon: '🔥' },
  { href: '/traffic', label: 'Traffic', icon: '🚗' },
  { href: '/safe-zones', label: 'Safe Zones', icon: '🏥' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-card rounded-none border-r border-white/10 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bantay-primary rounded-xl flex items-center justify-center font-bold text-xl">
            B
          </div>
          <span className="text-xl font-bold font-[Poppins]">BANTAY</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-2 h-2 bg-bantay-safe rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">System Online</span>
        </div>
      </div>
    </aside>
  );
}
