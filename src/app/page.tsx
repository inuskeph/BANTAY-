'use client';

import Link from 'next/link';

const features = [
  {
    icon: '🆘',
    title: 'Emergency QR',
    description: 'Generate QR codes with your vital emergency info for first responders.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Monitoring',
    description: 'Track your family members in real-time and ensure everyone is safe.',
  },
  {
    icon: '🔥',
    title: 'Fire Detection',
    description: 'Real-time fire hotspot monitoring using satellite and ground sensors.',
  },
  {
    icon: '🚗',
    title: 'Traffic Monitoring',
    description: 'Land, air, and maritime traffic updates across the Philippines.',
  },
  {
    icon: '🏥',
    title: 'Safe Zone Finder',
    description: 'Locate nearest evacuation centers, hospitals, and safe areas.',
  },
  {
    icon: '⚠️',
    title: 'Disaster Alerts',
    description: 'Real-time alerts from PAGASA, PHIVOLCS, and NDRRMC.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bantay-dark via-blue-950 to-bantay-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bantay-primary/20 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="w-20 h-20 bg-bantay-primary rounded-2xl flex items-center justify-center text-4xl font-bold shadow-lg shadow-bantay-primary/30">
              B
            </div>
          </div>

          <h1 className="text-2xl font-bold text-bantay-primary mb-2 tracking-wider font-[Poppins]">
            BANTAY
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-[Poppins]">
            Your Digital Guardian Against Disasters
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            A comprehensive national monitoring system designed to keep every Filipino safe 
            through real-time disaster tracking, emergency preparedness, and community protection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-bantay-primary/30">
              Open Dashboard
            </Link>
            <Link href="/emergency-qr" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 text-lg">
              Create Emergency QR
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 font-[Poppins]">
            Complete Safety Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 hover:bg-white/10 transition-all">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-gray-400 text-sm italic">
          &ldquo;Bantay sa Kaligtasan ng Bawat Pilipino&rdquo;
        </p>
        <p className="text-gray-500 text-xs mt-2">BANTAY National Safety Platform</p>
      </footer>
    </div>
  );
}
