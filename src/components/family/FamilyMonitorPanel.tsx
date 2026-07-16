'use client';

import { useState } from 'react';
import { FamilyMember } from '@/types';
import { mockFamilyMembers, mockFamilyGroup } from '@/lib/utils/mock-data';
import { formatDistance } from '@/lib/utils/geolocation';

export default function FamilyMonitorPanel() {
  const [members] = useState<FamilyMember[]>(mockFamilyMembers);

  const getStatusColor = (status: FamilyMember['status']) => {
    switch (status) {
      case 'safe': return 'bg-bantay-safe';
      case 'warning': return 'bg-bantay-warning';
      case 'danger': return 'bg-bantay-danger';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: FamilyMember['status']) => {
    switch (status) {
      case 'safe': return 'Safe';
      case 'warning': return 'Warning';
      case 'danger': return 'In Danger';
      case 'offline': return 'Offline';
    }
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400';
    if (level > 50) return 'text-bantay-safe';
    if (level > 20) return 'text-bantay-warning';
    return 'text-bantay-danger';
  };

  const getBatteryIcon = (level?: number) => {
    if (!level) return '🔋';
    if (level > 75) return '🔋';
    if (level > 50) return '🔋';
    if (level > 20) return '🪫';
    return '🪫';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{mockFamilyGroup.name}</h3>
          <p className="text-sm text-gray-400">Code: {mockFamilyGroup.invite_code}</p>
        </div>
        <button className="btn-primary text-sm">+ Add Member</button>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-bantay-primary/30 rounded-full flex items-center justify-center text-sm font-bold">
                  {member.full_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-bantay-dark`} />
              </div>

              {/* Info */}
              <div>
                <p className="text-sm font-medium">{member.full_name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    member.status === 'safe' ? 'bg-bantay-safe/20 text-bantay-safe' :
                    member.status === 'warning' ? 'bg-bantay-warning/20 text-bantay-warning' :
                    member.status === 'danger' ? 'bg-bantay-danger/20 text-bantay-danger' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {getStatusLabel(member.status)}
                  </span>
                  {member.distance !== undefined && (
                    <span>📍 {formatDistance(member.distance)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Battery */}
              <div className={`flex items-center gap-1 text-xs ${getBatteryColor(member.battery_level)}`}>
                <span>{getBatteryIcon(member.battery_level)}</span>
                <span>{member.battery_level ?? '--'}%</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-bantay-danger/20 text-bantay-danger border border-bantay-danger/30 rounded-lg text-xs hover:bg-bantay-danger/30 transition-all">
                  SOS
                </button>
                <button className="px-3 py-1.5 bg-bantay-safe/20 text-bantay-safe border border-bantay-safe/30 rounded-lg text-xs hover:bg-bantay-safe/30 transition-all">
                  Mark Safe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
