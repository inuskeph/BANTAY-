'use client';

import { useState } from 'react';
import { FamilyMember } from '@/types';
import { mockFamilyMembers, mockFamilyGroup } from '@/lib/utils/mock-data';
import { formatDistance } from '@/lib/utils/geolocation';
import Toast from '@/components/ui/Toast';

export default function FamilyMonitorPanel() {
  const [members, setMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const [showInviteCode, setShowInviteCode] = useState(false);

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

  const handleSOS = (member: FamilyMember) => {
    setToast({ message: `🚨 SOS Alert sent to ${member.full_name}!`, type: 'error' });
    // Simulate status change
    setMembers(prev => prev.map(m => m.id === member.id ? { ...m, status: 'danger' as const } : m));
  };

  const handleMarkSafe = (member: FamilyMember) => {
    setToast({ message: `✅ ${member.full_name} marked as safe`, type: 'success' });
    setMembers(prev => prev.map(m => m.id === member.id ? { ...m, status: 'safe' as const } : m));
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setToast({ message: '📍 Location shared with your family group!', type: 'success' }),
        () => setToast({ message: '📍 Location shared (simulated)', type: 'info' })
      );
    } else {
      setToast({ message: '📍 Location shared (simulated)', type: 'info' });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mockFamilyGroup.invite_code).then(
      () => setToast({ message: '📋 Invite code copied!', type: 'success' }),
      () => setToast({ message: `Code: ${mockFamilyGroup.invite_code}`, type: 'info' })
    );
  };

  const safeMemberCount = members.filter(m => m.status === 'safe').length;

  return (
    <div className="glass-card p-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{mockFamilyGroup.name}</h3>
          <p className="text-sm text-gray-400">{safeMemberCount}/{members.length} members safe</p>
        </div>
        <button onClick={() => setShowInviteCode(!showInviteCode)} className="px-3 py-2 bg-white/10 rounded-xl text-xs text-gray-300 hover:bg-white/20 transition-all">
          {showInviteCode ? 'Hide' : '🔗 Invite'}
        </button>
      </div>

      {showInviteCode && (
        <div className="p-3 bg-bantay-primary/20 border border-bantay-primary/40 rounded-xl mb-4">
          <p className="text-xs text-blue-300 mb-1">Share this code to add family members:</p>
          <div className="flex items-center gap-2">
            <code className="text-lg font-mono font-bold text-white tracking-widest">{mockFamilyGroup.invite_code}</code>
            <button onClick={handleCopyCode} className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300 hover:bg-white/20">Copy</button>
          </div>
        </div>
      )}

      {/* Safety bar */}
      <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-white/5 mb-4">
        {members.map(m => <div key={m.id} className={`flex-1 ${getStatusColor(m.status)}`} />)}
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-bantay-primary/30 rounded-full flex items-center justify-center text-sm font-bold">
                    {member.full_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-bantay-dark ${member.status === 'safe' ? 'animate-pulse' : ''}`} />
                </div>
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
                    {member.distance !== undefined && <span>📍 {formatDistance(member.distance)}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${getBatteryColor(member.battery_level)}`}>
                  {member.battery_level && member.battery_level <= 20 ? '🪫' : '🔋'} {member.battery_level ?? '--'}%
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleSOS(member)} className="flex-1 px-3 py-1.5 bg-bantay-danger/20 text-bantay-danger border border-bantay-danger/30 rounded-lg text-xs hover:bg-bantay-danger/30 transition-all font-medium">
                🚨 SOS
              </button>
              <button onClick={() => handleMarkSafe(member)} className="flex-1 px-3 py-1.5 bg-bantay-safe/20 text-bantay-safe border border-bantay-safe/30 rounded-lg text-xs hover:bg-bantay-safe/30 transition-all font-medium">
                ✅ Mark Safe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleShareLocation} className="px-3 py-2 bg-bantay-primary/20 border border-bantay-primary/30 text-blue-300 rounded-xl text-xs hover:bg-bantay-primary/30 transition-all font-medium">
            📍 Share My Location
          </button>
          <button onClick={() => setToast({ message: '💬 Group chat coming soon!', type: 'info' })} className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-xs hover:bg-purple-500/30 transition-all font-medium">
            💬 Group Chat
          </button>
        </div>
      </div>
    </div>
  );
}
