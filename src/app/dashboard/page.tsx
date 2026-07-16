'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import {
  mockDisasterAlerts,
  mockTrafficIncidents,
  mockFamilyMembers,
  mockSafeZones,
  mockFireHotspots,
} from '@/lib/utils/mock-data';

export default function DashboardPage() {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const activeAlerts = mockDisasterAlerts.filter((a) => a.is_active);
  const activeFireCount = mockFireHotspots.filter((f) => f.status === 'active').length;
  const activeTrafficCount = mockTrafficIncidents.filter((t) => t.status === 'active').length;
  const safeFamilyCount = mockFamilyMembers.filter((m) => m.status === 'safe').length;

  const stats = [
    { label: 'Active Alerts', value: activeAlerts.length, icon: '⚠️', color: 'bantay-danger' },
    { label: 'Fire Hotspots', value: activeFireCount, icon: '🔥', color: 'bantay-warning' },
    { label: 'Traffic Issues', value: activeTrafficCount, icon: '🚗', color: 'bantay-accent' },
    { label: 'Family Safe', value: `${safeFamilyCount}/${mockFamilyMembers.length}`, icon: '👨‍👩‍👧‍👦', color: 'bantay-safe' },
    { label: 'Safe Zones', value: mockSafeZones.length, icon: '🏥', color: 'bantay-primary' },
    { label: 'System', value: 'Online', icon: '✅', color: 'bantay-safe' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'advisory': return 'border-bantay-primary/50 bg-bantay-primary/10';
      case 'watch': return 'border-bantay-warning/50 bg-bantay-warning/10';
      case 'warning': return 'border-orange-500/50 bg-orange-500/10';
      case 'emergency': return 'border-bantay-danger/50 bg-bantay-danger/10';
      default: return 'border-white/10 bg-white/5';
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Active Disaster Alerts */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">🚨 Active Disaster Alerts</h2>
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border rounded-xl ${getSeverityColor(alert.severity)} cursor-pointer transition-all`}
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {alert.type === 'typhoon' ? '🌀' : alert.type === 'flood' ? '🌊' : alert.type === 'earthquake' ? '🫨' : '⚠️'}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-gray-400">{alert.source} • {alert.severity.toUpperCase()}</p>
                      </div>
                    </div>
                    <span className="text-gray-400">{expandedAlert === alert.id ? '▲' : '▼'}</span>
                  </div>
                  {expandedAlert === alert.id && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-sm text-gray-300 mb-2">{alert.description}</p>
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 mb-1">Affected Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {alert.affected_areas.map((area) => (
                            <span key={area} className="px-2 py-0.5 bg-white/10 rounded text-xs">{area}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Instructions:</p>
                        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                          {alert.instructions.map((inst, i) => (
                            <li key={i}>{inst}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Traffic */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">🚗 Recent Traffic</h3>
              <div className="space-y-2">
                {mockTrafficIncidents.slice(0, 3).map((incident) => (
                  <div key={incident.id} className="p-3 bg-white/5 rounded-xl">
                    <p className="text-sm font-medium">{incident.address}</p>
                    <p className="text-xs text-gray-400">{incident.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Status */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">👨‍👩‍👧‍👦 Family Status</h3>
              <div className="space-y-2">
                {mockFamilyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        member.status === 'safe' ? 'bg-bantay-safe' :
                        member.status === 'warning' ? 'bg-bantay-warning' :
                        member.status === 'danger' ? 'bg-bantay-danger' :
                        'bg-gray-500'
                      }`} />
                      <span className="text-sm">{member.full_name}</span>
                    </div>
                    <span className="text-xs text-gray-400 capitalize">{member.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Safe Zones */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">🏥 Nearby Safe Zones</h3>
              <div className="space-y-2">
                {mockSafeZones.slice(0, 3).map((zone) => (
                  <div key={zone.id} className="p-3 bg-white/5 rounded-xl">
                    <p className="text-sm font-medium">{zone.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                      <span className="capitalize">{zone.type.replace('_', ' ')}</span>
                      <span>{zone.distance ? `${(zone.distance / 1000).toFixed(1)}km` : '--'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
