'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface EmergencyQRCardProps {
  qrData: string;
  name: string;
  bloodType: string;
}

export default function EmergencyQRCard({ qrData, name, bloodType }: EmergencyQRCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!canvasRef.current || !qrData) return;
    
    QRCode.toCanvas(canvasRef.current, qrData, {
      width: 250,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
      .then(() => setGenerated(true))
      .catch((err) => setError('Failed to generate QR code: ' + err.message));
  }, [qrData]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `bantay-emergency-qr-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>BANTAY Emergency QR - ${name}</title>
        <style>
          body { display:flex; justify-content:center; align-items:center; min-height:100vh; font-family:system-ui,sans-serif; }
          .card { text-align:center; border:3px solid #2563eb; border-radius:16px; padding:40px; max-width:400px; }
          .logo { font-size:28px; font-weight:900; color:#2563eb; margin-bottom:4px; }
          .subtitle { font-size:11px; color:#666; margin-bottom:20px; }
          .blood { display:inline-block; background:#dc2626; color:white; padding:6px 16px; border-radius:20px; font-weight:bold; font-size:18px; margin:10px 0; }
          .name { font-size:20px; font-weight:bold; margin-top:16px; }
          .footer { margin-top:20px; font-size:10px; color:#999; }
        </style></head>
        <body>
          <div class="card">
            <div class="logo">BANTAY</div>
            <div class="subtitle">Emergency Medical Information</div>
            <img src="${canvasRef.current.toDataURL()}" width="250" height="250" />
            <div class="blood">${bloodType}</div>
            <div class="name">${name}</div>
            <div class="footer">Scan QR code for complete emergency info<br/>BANTAY - National Safety Monitor</div>
          </div>
          <script>setTimeout(()=>window.print(),500);</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="glass-card p-6 text-center">
      <h3 className="text-lg font-semibold mb-2">Your Emergency QR Code</h3>
      <p className="text-xs text-gray-400 mb-4">This QR code contains your emergency medical info. Show it to first responders.</p>
      
      {error && (
        <div className="p-3 bg-bantay-danger/20 border border-bantay-danger/30 rounded-xl mb-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="inline-block p-4 bg-white rounded-2xl shadow-lg shadow-bantay-primary/20 mb-4">
        <canvas ref={canvasRef} />
      </div>

      <div className="mb-4">
        <p className="text-white font-semibold text-lg">{name}</p>
        <p className="text-sm text-gray-400">
          Blood Type: <span className="text-bantay-danger font-bold text-lg">{bloodType}</span>
        </p>
      </div>

      <div className="p-3 bg-bantay-safe/10 border border-bantay-safe/30 rounded-xl mb-6">
        <p className="text-xs text-bantay-safe">✓ QR code generated successfully — scannable with any QR reader</p>
      </div>

      <div className="flex gap-3 justify-center">
        <button onClick={handleDownload} disabled={!generated} className="btn-primary text-sm disabled:opacity-50">
          📥 Download PNG
        </button>
        <button onClick={handlePrint} disabled={!generated} className="btn-safe text-sm disabled:opacity-50">
          🖨️ Print Card
        </button>
      </div>
    </div>
  );
}
