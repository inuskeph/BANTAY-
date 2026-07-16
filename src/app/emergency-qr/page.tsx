'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import EmergencyProfileForm from '@/components/emergency/EmergencyProfileForm';
import EmergencyQRCard from '@/components/emergency/EmergencyQRCard';
import EmergencyQRScanner from '@/components/emergency/EmergencyQRScanner';
import { generateEmergencyQRData } from '@/lib/utils/emergency-qr';
import { EmergencyProfile } from '@/types';

type Tab = 'create' | 'view' | 'scan';

export default function EmergencyQRPage() {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [qrData, setQrData] = useState<string | null>(null);
  const [profileName, setProfileName] = useState('');
  const [profileBlood, setProfileBlood] = useState('');

  const handleFormComplete = (data: Omit<EmergencyProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    const profile: EmergencyProfile = {
      ...data,
      id: 'temp-id',
      user_id: 'temp-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const generated = generateEmergencyQRData(profile);
    setQrData(generated);
    setProfileName(data.full_name);
    setProfileBlood(data.blood_type);
    setActiveTab('view');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-[Poppins]">🆘 Emergency QR Code</h1>
            <p className="text-sm text-gray-400 mt-1">
              Create a QR code containing your vital emergency information for first responders.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {(['create', 'view', 'scan'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-bantay-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab === 'create' && '📝 Create'}
                {tab === 'view' && '📱 View'}
                {tab === 'scan' && '🔍 Scan'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'create' && (
            <EmergencyProfileForm onComplete={handleFormComplete} />
          )}

          {activeTab === 'view' && (
            qrData ? (
              <EmergencyQRCard qrData={qrData} name={profileName} bloodType={profileBlood} />
            ) : (
              <div className="glass-card p-12 text-center">
                <span className="text-4xl mb-4 block">📱</span>
                <p className="text-gray-400">No QR code generated yet.</p>
                <p className="text-sm text-gray-500 mt-1">Create your emergency profile first to generate a QR code.</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="btn-primary mt-4"
                >
                  Create Profile
                </button>
              </div>
            )
          )}

          {activeTab === 'scan' && (
            <EmergencyQRScanner />
          )}
        </main>
      </div>
    </div>
  );
}
