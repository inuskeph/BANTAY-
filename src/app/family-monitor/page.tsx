'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import FamilyMonitorPanel from '@/components/family/FamilyMonitorPanel';
import SimulatedMap from '@/components/ui/SimulatedMap';
import { mockFamilyMembers } from '@/lib/utils/mock-data';

export default function FamilyMonitorPage() {
  const mapPins = mockFamilyMembers.map(m => ({
    id: m.id,
    lat: m.last_location?.latitude || 14.5995,
    lng: m.last_location?.longitude || 120.9842,
    label: m.full_name,
    color: m.status === 'safe' ? '#16a34a' : m.status === 'warning' ? '#d97706' : m.status === 'danger' ? '#dc2626' : '#6b7280',
    icon: m.status === 'safe' ? '🟢' : m.status === 'warning' ? '🟡' : m.status === 'danger' ? '🔴' : '⚫',
    pulse: m.status === 'danger',
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">👨‍👩‍👧‍👦 Family Monitor</h1>
            <p className="text-sm text-gray-400 mt-1">Track your family members in real-time during emergencies.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FamilyMonitorPanel />
            <SimulatedMap pins={mapPins} title="📍 Family Locations" showUserLocation={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
