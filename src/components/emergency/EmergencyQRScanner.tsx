'use client';

import { useState } from 'react';
import { parseEmergencyQRData, QRData } from '@/lib/utils/emergency-qr';

export default function EmergencyQRScanner() {
  const [inputData, setInputData] = useState('');
  const [parsedData, setParsedData] = useState<QRData | null>(null);
  const [error, setError] = useState('');

  const handleScan = () => {
    setError('');
    setParsedData(null);

    if (!inputData.trim()) {
      setError('Please enter QR data to scan.');
      return;
    }

    const result = parseEmergencyQRData(inputData);
    if (!result) {
      setError('Invalid BANTAY QR code data. Make sure this is a valid emergency QR.');
      return;
    }
    setParsedData(result);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Scan Emergency QR</h3>
      <p className="text-sm text-gray-400 mb-4">
        Paste the QR code data below to view emergency information.
      </p>

      <div className="space-y-4">
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-bantay-primary resize-none"
          placeholder='Paste QR data here (JSON format starting with {"app":"BANTAY"...})'
        />
        <button onClick={handleScan} className="btn-primary w-full">
          🔍 Parse QR Data
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-bantay-danger/20 border border-bantay-danger/50 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {parsedData && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-bantay-safe/10 border border-bantay-safe/30 rounded-xl">
            <p className="text-sm text-bantay-safe font-medium mb-1">✓ Valid BANTAY Emergency QR</p>
          </div>

          {/* Personal Info */}
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="text-sm font-semibold text-bantay-primary mb-2">Personal Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-400">Name:</p>
              <p className="text-white">{parsedData.profile.name}</p>
              <p className="text-gray-400">DOB:</p>
              <p className="text-white">{parsedData.profile.dob}</p>
              <p className="text-gray-400">Blood Type:</p>
              <p className="text-bantay-danger font-bold">{parsedData.profile.blood}</p>
              <p className="text-gray-400">Address:</p>
              <p className="text-white">{parsedData.profile.address}, {parsedData.profile.barangay}, {parsedData.profile.city}, {parsedData.profile.province}</p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="text-sm font-semibold text-bantay-warning mb-2">Emergency Contact</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-400">Name:</p>
              <p className="text-white">{parsedData.emergency.contact_name}</p>
              <p className="text-gray-400">Phone:</p>
              <p className="text-white">{parsedData.emergency.contact_phone}</p>
              <p className="text-gray-400">Relationship:</p>
              <p className="text-white">{parsedData.emergency.relationship}</p>
            </div>
          </div>

          {/* Medical Info */}
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="text-sm font-semibold text-bantay-danger mb-2">Medical Information</h4>
            {parsedData.medical.conditions.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-gray-400 mb-1">Conditions:</p>
                <div className="flex flex-wrap gap-1">
                  {parsedData.medical.conditions.map((c) => (
                    <span key={c} className="px-2 py-0.5 bg-bantay-warning/20 text-bantay-warning rounded text-xs">{c}</span>
                  ))}
                </div>
              </div>
            )}
            {parsedData.medical.allergies.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-gray-400 mb-1">Allergies:</p>
                <div className="flex flex-wrap gap-1">
                  {parsedData.medical.allergies.map((a) => (
                    <span key={a} className="px-2 py-0.5 bg-bantay-danger/20 text-bantay-danger rounded text-xs">{a}</span>
                  ))}
                </div>
              </div>
            )}
            {parsedData.medical.medications.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Medications:</p>
                <div className="flex flex-wrap gap-1">
                  {parsedData.medical.medications.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-bantay-accent/20 text-bantay-accent rounded text-xs">{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
