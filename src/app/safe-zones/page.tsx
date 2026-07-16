'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { mockSafeZones } from '@/lib/utils/mock-data';
import { SafeZone } from '@/types';

export default function SafeZonesPage() {
  const [zones] = useState<SafeZone[]>(mockSafeZones);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'evacuation_center': return '🏛️';
      case 'hospital': return '🏥';
      case 'fire_station': return '🚒';
      case 'police_station': return '🚔';
      case 'school': return '🏫';
      case 'church': return '⛪';
      case 'barangay_hall': return '🏢';
      default: return '📍';
    }
  };

  const getOccupancyColor = (zone: SafeZone) => {
    const ratio = zone.current_occupancy / zone.capacity;
    if (ratio < 0.5) return 'bg-bantay-safe';
    if (ratio < 0.8) return 'bg-bantay-warning';
    return 'bg-bantay-danger';
  };

  const getOccupancyPercent = (zone: SafeZone) => {
    return Math.round((zone.current_occupancy / zone.capacity) * 100);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">🏥 Safe Zones</h1>
            <p className="text-sm text-gray-400 mt-1">
              Find the nearest evacuation centers, hospitals, and safe areas in your vicinity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Safe Zone List */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Nearby Safe Zones</h3>
              <div className="space-y-3">
                {zones.map((zone) => (
                  <div key={zone.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTypeIcon(zone.type)}</span>
                        <div>
                          <p className="text-sm font-medium">{zone.name}</p>
                          <p className="text-xs text-gray-400">{zone.address}</p>
                        </div>
                      </div>
                      {zone.distance && (
                        <span className="text-xs text-gray-400">
                          {(zone.distance / 1000).toFixed(1)}km
                        </span>
                      )}
                    </div>

                    {/* Capacity Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">Capacity</span>
                        <span className="text-gray-300">
                          {zone.current_occupancy.toLocaleString()} / {zone.capacity.toLocaleString()} ({getOccupancyPercent(zone)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${getOccupancyColor(zone)}`}
                          style={{ width: `${Math.min(getOccupancyPercent(zone), 100)}%` }}
                        />
                      </div>
                    </div>

                    {zone.contact_number && (
                      <p className="text-xs text-gray-400 mt-2">📞 {zone.contact_number}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">📍 Safe Zone Map</h3>
              <div className="w-full h-[500px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🗺️</span>
                  <p className="text-gray-400 text-sm">Safe Zone Map</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Showing evacuation centers and safe areas near you
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
