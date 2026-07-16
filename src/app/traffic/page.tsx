'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TrafficPanel from '@/components/traffic/TrafficPanel';
import SimulatedMap from '@/components/ui/SimulatedMap';
import { mockTrafficIncidents } from '@/lib/utils/mock-data';

export default function TrafficPage() {
  const mapPins = mockTrafficIncidents.map(t => ({
    id: t.id,
    lat: t.location.latitude,
    lng: t.location.longitude,
    label: `${t.address} - ${t.description}`,
    color: t.severity === 'critical' ? '#dc2626' : t.severity === 'high' ? '#ea580c' : t.severity === 'medium' ? '#d97706' : '#16a34a',
    icon: t.type === 'accident' ? '💥' : t.type === 'flood' ? '🌊' : t.type === 'road_closure' ? '🚧' : '🚗',
    pulse: t.severity === 'critical',
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">🚗 Traffic Monitoring</h1>
            <p className="text-sm text-gray-400 mt-1">Land, air, and maritime traffic across the Philippines.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrafficPanel />
            <SimulatedMap pins={mapPins} title="🛣️ Traffic Incidents Map" showUserLocation={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
