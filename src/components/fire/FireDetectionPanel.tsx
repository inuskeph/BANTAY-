'use client';

import { useState } from 'react';
import { FireHotspot } from '@/types';
import { mockFireHotspots } from '@/lib/utils/mock-data';

export default function FireDetectionPanel() {
  const [hotspots] = useState<FireHotspot[]>(mockFireHotspots);

  const activeCount = hotspots.filter(h => h.status === 'active').length;
  const containedCount = hotspots.filter(h => h.status === 'contained').length;
  const extinguishedCount = hotspots.filter(h => h.status === 'extinguished').length;

  const getIntensityColor = (intensity: FireHotspot['intensity']) => {
    switch (intensity) {
      case 'low': return 'text-yellow-400 bg-yellow-400/10';
      case 'medium': return 'text-orange-400 bg-orange-400/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'critical': return 'text-red-600 bg-red-600/10';
    }
  };

  const getStatusBadge = (status: FireHotspot['status']) => {
    switch (status) {
      case 'active': return 'bg-bantay-danger/20 text-bantay-danger border-bantay-danger/30';
      case 'contained': return 'bg-bantay-warning/20 text-bantay-warning border-bantay-warning/30';
      case 'extinguished': return 'bg-bantay-safe/20 text-bantay-safe border-bantay-safe/30';
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">🔥 Fire Detection</h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-bantay-danger/10 border border-bantay-danger/20 rounded-xl text-center">
          <p className="text-2xl font-bold text-bantay-danger">{activeCount}</p>
          <p className="text-xs text-gray-400">Active</p>
        </div>
        <div className="p-3 bg-bantay-warning/10 border border-bantay-warning/20 rounded-xl text-center">
          <p className="text-2xl font-bold text-bantay-warning">{containedCount}</p>
          <p className="text-xs text-gray-400">Contained</p>
        </div>
        <div className="p-3 bg-bantay-safe/10 border border-bantay-safe/20 rounded-xl text-center">
          <p className="text-2xl font-bold text-bantay-safe">{extinguishedCount}</p>
          <p className="text-xs text-gray-400">Extinguished</p>
        </div>
      </div>

      {/* Hotspot List */}
      <div className="space-y-3">
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium">{hotspot.address}</p>
                <p className="text-xs text-gray-400">Source: {hotspot.source}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-lg text-xs border ${getStatusBadge(hotspot.status)}`}>
                {hotspot.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className={`px-2 py-0.5 rounded ${getIntensityColor(hotspot.intensity)}`}>
                {hotspot.intensity.toUpperCase()}
              </span>
              <span className="text-gray-400">
                Confidence: <span className="text-white font-medium">{Math.round(hotspot.confidence * 100)}%</span>
              </span>
              <span className="text-gray-400">
                Radius: <span className="text-white font-medium">{hotspot.affected_radius_meters}m</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
