'use client';

import { useState, useEffect } from 'react';

interface MapPin {
  id: string;
  lat: number;
  lng: number;
  label: string;
  color: string;
  icon?: string;
  pulse?: boolean;
}

interface SimulatedMapProps {
  pins: MapPin[];
  centerLat?: number;
  centerLng?: number;
  title?: string;
  showUserLocation?: boolean;
}

export default function SimulatedMap({ pins, centerLat = 14.5995, centerLng = 120.9842, title, showUserLocation = true }: SimulatedMapProps) {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [userLat, setUserLat] = useState(centerLat);
  const [userLng, setUserLng] = useState(centerLng);
  const [gpsActive, setGpsActive] = useState(false);

  // Simulate slight GPS movement
  useEffect(() => {
    if (!showUserLocation) return;
    setGpsActive(true);
    const interval = setInterval(() => {
      setUserLat((p) => p + (Math.random() - 0.5) * 0.0002);
      setUserLng((p) => p + (Math.random() - 0.5) * 0.0002);
    }, 3000);
    return () => clearInterval(interval);
  }, [showUserLocation]);

  // Convert lat/lng to pixel position relative to map view
  const toPixel = (lat: number, lng: number) => {
    const scale = 8000; // pixels per degree (zoom level simulation)
    const x = (lng - centerLng) * scale + 50; // 50% center
    const y = (centerLat - lat) * scale + 50;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="glass-card p-4 h-full">
      {title && <h3 className="text-sm font-semibold text-gray-300 mb-3">{title}</h3>}
      
      {/* Map container */}
      <div className="relative w-full h-[450px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-white/10 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Simulated roads */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-yellow-400" />
          <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-yellow-400" />
          <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-yellow-400" />
          <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-yellow-400" />
          <div className="absolute top-[20%] left-[10%] right-[30%] h-[1px] bg-gray-400 rotate-12" />
          <div className="absolute top-[60%] left-[20%] right-[10%] h-[1px] bg-gray-400 -rotate-6" />
        </div>

        {/* 10km radius circle */}
        {showUserLocation && (
          <div
            className="absolute border-2 border-bantay-primary/30 rounded-full"
            style={{
              width: '70%', height: '70%',
              top: '15%', left: '15%',
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-bantay-primary/20 rounded text-[9px] text-bantay-primary font-medium">
              10km radius
            </div>
          </div>
        )}

        {/* User location */}
        {showUserLocation && gpsActive && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${toPixel(userLat, userLng).x}%`, top: `${toPixel(userLat, userLng).y}%` }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg shadow-blue-500/50" />
              <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-40" />
            </div>
          </div>
        )}

        {/* Map pins */}
        {pins.map((pin) => {
          const pos = toPixel(pin.lat, pin.lng);
          return (
            <div
              key={pin.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-125"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}
            >
              <div className="relative">
                {pin.pulse && (
                  <div className={`absolute -inset-2 rounded-full animate-ping opacity-30`} style={{ backgroundColor: pin.color }} />
                )}
                <div className="flex flex-col items-center">
                  <span className="text-lg drop-shadow-lg">{pin.icon || '📍'}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected pin popup */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 z-30 bg-bantay-dark/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedPin.icon || '📍'}</span>
                <div>
                  <p className="text-sm font-medium text-white">{selectedPin.label}</p>
                  <p className="text-[10px] text-gray-400">{selectedPin.lat.toFixed(4)}, {selectedPin.lng.toFixed(4)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPin(null)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
          </div>
        )}

        {/* GPS indicator */}
        {showUserLocation && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur rounded-lg">
            <div className={`w-2 h-2 rounded-full ${gpsActive ? 'bg-bantay-safe animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-[10px] text-gray-300">{gpsActive ? 'GPS Active' : 'GPS Off'}</span>
          </div>
        )}

        {/* Coordinates */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded-lg">
          <span className="text-[10px] text-gray-400">{userLat.toFixed(4)}°N, {userLng.toFixed(4)}°E</span>
        </div>
      </div>
    </div>
  );
}
