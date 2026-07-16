'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import FireDetectionPanel from '@/components/fire/FireDetectionPanel';

export default function FireDetectionPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">🔥 Fire Detection</h1>
            <p className="text-sm text-gray-400 mt-1">
              Real-time fire hotspot monitoring powered by satellite imagery and ground sensor reports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FireDetectionPanel />

            {/* Heat Map Placeholder */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">🗺️ Heat Map</h3>
              <div className="w-full h-[500px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🌡️</span>
                  <p className="text-gray-400 text-sm">Fire Detection Heat Map</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Satellite-based thermal anomaly detection overlay
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
