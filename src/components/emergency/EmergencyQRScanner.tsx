'use client';

import { useState, useRef, useEffect } from 'react';
import { parseEmergencyQRData, QRData } from '@/lib/utils/emergency-qr';

export default function EmergencyQRScanner() {
  const [inputData, setInputData] = useState('');
  const [parsedData, setParsedData] = useState<QRData | null>(null);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError('');
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setCameraError('Camera access denied. Please use manual input below or allow camera permissions.');
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => { stopCamera(); };
  }, []);

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
    stopCamera();
  };

  const handleReset = () => {
    setParsedData(null);
    setInputData('');
    setError('');
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-2">🔍 Scan Emergency QR</h3>
      <p className="text-sm text-gray-400 mb-4">
        For first responders — scan or paste a BANTAY Emergency QR to view patient info.
      </p>

      {!parsedData && (
        <div className="space-y-4">
          {/* Camera Scanner */}
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            {scanning ? (
              <div className="relative">
                <video ref={videoRef} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-bantay-primary rounded-xl animate-pulse" />
                </div>
                <button onClick={stopCamera} className="absolute top-2 right-2 px-3 py-1 bg-bantay-danger rounded-lg text-xs text-white">
                  Stop
                </button>
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <p className="text-xs text-white bg-black/50 backdrop-blur rounded px-2 py-1">Point camera at BANTAY QR code</p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <span className="text-4xl block mb-3">📷</span>
                <button onClick={startCamera} className="btn-primary text-sm">
                  Open Camera Scanner
                </button>
                {cameraError && (
                  <p className="text-xs text-bantay-warning mt-3">{cameraError}</p>
                )}
              </div>
            )}
          </div>

          {/* Manual Input */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-2">Or paste QR data manually:</p>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-bantay-primary resize-none"
              placeholder='Paste QR data here (JSON starting with {"app":"BANTAY"...})'
            />
            <button onClick={handleScan} className="btn-primary w-full mt-3">
              🔍 Parse QR Data
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-bantay-danger/20 border border-bantay-danger/50 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {parsedData && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-bantay-safe/10 border border-bantay-safe/30 rounded-xl flex-1">
              <p className="text-sm text-bantay-safe font-medium">✓ Valid BANTAY Emergency QR</p>
            </div>
            <button onClick={handleReset} className="ml-3 px-3 py-2 bg-white/10 rounded-xl text-xs text-gray-300 hover:bg-white/20">
              Scan Another
            </button>
          </div>

          {/* Critical Info Banner */}
          <div className="p-4 bg-bantay-danger/10 border border-bantay-danger/30 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-bantay-danger rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">{parsedData.profile.blood}</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg">{parsedData.profile.name}</p>
                <p className="text-gray-400 text-sm">DOB: {parsedData.profile.dob}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Address</h4>
            <p className="text-sm text-white">{parsedData.profile.address}, {parsedData.profile.barangay}, {parsedData.profile.city}, {parsedData.profile.province}</p>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 bg-bantay-warning/10 border border-bantay-warning/30 rounded-xl">
            <h4 className="text-xs font-semibold text-bantay-warning uppercase mb-2">Emergency Contact</h4>
            <p className="text-white font-medium">{parsedData.emergency.contact_name}</p>
            <p className="text-sm text-gray-400">{parsedData.emergency.relationship}</p>
            <a href={`tel:${parsedData.emergency.contact_phone}`} className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-bantay-safe rounded-xl text-white text-sm font-medium hover:bg-green-700 transition-all">
              📞 Call {parsedData.emergency.contact_phone}
            </a>
          </div>

          {/* Medical Info */}
          {parsedData.medical.conditions.length > 0 && (
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-xs font-semibold text-bantay-danger uppercase mb-2">Medical Conditions</h4>
              <div className="flex flex-wrap gap-1">
                {parsedData.medical.conditions.map((c) => (
                  <span key={c} className="px-2 py-1 bg-bantay-danger/20 text-bantay-danger rounded-lg text-xs">{c}</span>
                ))}
              </div>
            </div>
          )}

          {parsedData.medical.allergies.length > 0 && (
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-xs font-semibold text-bantay-warning uppercase mb-2">Allergies</h4>
              <div className="flex flex-wrap gap-1">
                {parsedData.medical.allergies.map((a) => (
                  <span key={a} className="px-2 py-1 bg-bantay-warning/20 text-bantay-warning rounded-lg text-xs">{a}</span>
                ))}
              </div>
            </div>
          )}

          {parsedData.medical.medications.length > 0 && (
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-xs font-semibold text-bantay-accent uppercase mb-2">Medications</h4>
              <div className="flex flex-wrap gap-1">
                {parsedData.medical.medications.map((m) => (
                  <span key={m} className="px-2 py-1 bg-bantay-accent/20 text-bantay-accent rounded-lg text-xs">{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
