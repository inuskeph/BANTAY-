'use client';

import { useEffect, useRef } from 'react';

interface EmergencyQRCardProps {
  qrData: string;
  name: string;
  bloodType: string;
}

export default function EmergencyQRCard({ qrData, name, bloodType }: EmergencyQRCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !qrData) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate a simple QR-like pattern (placeholder for actual QR library)
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Create a simple hash-based pattern
    const cellSize = 8;
    const cells = size / cellSize;
    ctx.fillStyle = '#0f172a';

    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        const charCode = qrData.charCodeAt((i * cells + j) % qrData.length);
        if (charCode % 3 === 0 || (i < 3 && j < 3) || (i < 3 && j > cells - 4) || (i > cells - 4 && j < 3)) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    // Draw position markers
    const drawMarker = (x: number, y: number) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
    };

    drawMarker(0, 0);
    drawMarker((cells - 7) * cellSize, 0);
    drawMarker(0, (cells - 7) * cellSize);
  }, [qrData]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `bantay-emergency-qr-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>BANTAY Emergency QR - ${name}</title></head>
        <body style="display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:sans-serif;">
          <div style="text-align:center;">
            <h1>BANTAY Emergency QR</h1>
            <img src="${canvasRef.current.toDataURL()}" width="300" height="300"/>
            <p><strong>${name}</strong> | Blood Type: ${bloodType}</p>
            <p style="color:gray;">Scan in case of emergency</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="glass-card p-6 text-center">
      <h3 className="text-lg font-semibold mb-4">Your Emergency QR Code</h3>
      <div className="inline-block p-4 bg-white rounded-2xl mb-4">
        <canvas ref={canvasRef} className="w-[200px] h-[200px]" />
      </div>
      <div className="mb-4">
        <p className="text-white font-medium">{name}</p>
        <p className="text-sm text-gray-400">Blood Type: <span className="text-bantay-danger font-bold">{bloodType}</span></p>
      </div>
      <p className="text-xs text-gray-400 mb-6">Scan this QR code in case of emergency to access vital information.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={handleDownload} className="btn-primary text-sm">
          📥 Download
        </button>
        <button onClick={handlePrint} className="btn-safe text-sm">
          🖨️ Print
        </button>
      </div>
    </div>
  );
}
