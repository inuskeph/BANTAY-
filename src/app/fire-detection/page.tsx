'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import FireDetectionPanel from '@/components/fire/FireDetectionPanel';
import SimulatedMap from '@/components/ui/SimulatedMap';
import { mockFireHotspots } from '@/lib/utils/mock-data';

export default function FireDetectionPage() {
  const mapPins = mockFireHotspots.map(f => ({
    id: f.id,
    lat: f.location.latitude,
    lng: f.location.longitude,
    label: `${f.address} - ${f.intensity} intensity (${f.source})`,
    color: f.status === 'active' ? '#dc2626' : f.status === 'contained' ? '#d97706' : '#16a34a',
    icon: f.status === 'active' ? '🔥' : f.status === 'contained' ? '🟠' : '✅',
    pulse: f.status === 'active',
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">🔥 Fire Detection</h1>
            <p className="text-sm text-gray-400 mt-1">Real-time fire hotspot monitoring powered by satellite imagery.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FireDetectionPanel />
            <SimulatedMap pins={mapPins} title="🌡️ Fire Heat Map" showUserLocation={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
