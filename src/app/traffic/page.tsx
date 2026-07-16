'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TrafficPanel from '@/components/traffic/TrafficPanel';

export default function TrafficPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">🚗 Traffic Monitoring</h1>
            <p className="text-sm text-gray-400 mt-1">
              Comprehensive land, air, and maritime traffic monitoring across the Philippines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrafficPanel />

            {/* Map Placeholder */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">🗺️ Traffic Map</h3>
              <div className="w-full h-[500px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🛣️</span>
                  <p className="text-gray-400 text-sm">Traffic Map View</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Real-time traffic conditions and incident locations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
