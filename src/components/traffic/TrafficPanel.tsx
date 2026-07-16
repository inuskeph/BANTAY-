'use client';

import { useState } from 'react';
import { TrafficIncident, AirTraffic, MaritimeVessel } from '@/types';
import { mockTrafficIncidents, mockAirTraffic, mockMaritimeVessels } from '@/lib/utils/mock-data';

type Tab = 'land' | 'air' | 'maritime';

export default function TrafficPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('land');
  const [incidents] = useState<TrafficIncident[]>(mockTrafficIncidents);
  const [airTraffic] = useState<AirTraffic[]>(mockAirTraffic);
  const [maritime] = useState<MaritimeVessel[]>(mockMaritimeVessels);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-bantay-safe/20 text-bantay-safe border-bantay-safe/30';
      case 'medium': return 'bg-bantay-warning/20 text-bantay-warning border-bantay-warning/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical': return 'bg-bantay-danger/20 text-bantay-danger border-bantay-danger/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'accident': return '💥';
      case 'congestion': return '🚗';
      case 'road_closure': return '🚧';
      case 'construction': return '👷';
      case 'flood': return '🌊';
      case 'landslide': return '⛰️';
      default: return '⚠️';
    }
  };

  const getFlightStatusColor = (status: string) => {
    switch (status) {
      case 'on_time': return 'text-bantay-safe';
      case 'delayed': return 'text-bantay-warning';
      case 'cancelled': return 'text-bantay-danger';
      case 'diverted': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getVesselStatusColor = (status: string) => {
    switch (status) {
      case 'sailing': return 'text-bantay-safe';
      case 'docked': return 'text-bantay-primary';
      case 'anchored': return 'text-bantay-warning';
      case 'distress': return 'text-bantay-danger';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass-card p-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-6">
        {(['land', 'air', 'maritime'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-bantay-primary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab === 'land' && '🚗 Land'}
            {tab === 'air' && '✈️ Air'}
            {tab === 'maritime' && '🚢 Maritime'}
          </button>
        ))}
      </div>

      {/* Land Traffic */}
      {activeTab === 'land' && (
        <div className="space-y-3">
          <h4 className="text-sm text-gray-400 font-medium mb-3">Active Incidents ({incidents.length})</h4>
          {incidents.map((incident) => (
            <div key={incident.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(incident.type)}</span>
                  <div>
                    <p className="text-sm font-medium">{incident.address}</p>
                    <p className="text-xs text-gray-400">{incident.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-xs border ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
              </div>
              {incident.affected_routes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {incident.affected_routes.map((route) => (
                    <span key={route} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-300">
                      {route}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Air Traffic */}
      {activeTab === 'air' && (
        <div className="space-y-3">
          <h4 className="text-sm text-gray-400 font-medium mb-3">Flight Monitor ({airTraffic.length})</h4>
          {airTraffic.map((flight) => (
            <div key={flight.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">{flight.flight_number}</p>
                  <p className="text-xs text-gray-400">{flight.airline}</p>
                </div>
                <span className={`text-xs font-medium ${getFlightStatusColor(flight.status)}`}>
                  {flight.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{flight.origin}</span>
                <span>→</span>
                <span>{flight.destination}</span>
              </div>
              {flight.altitude && flight.altitude > 0 && (
                <p className="text-xs text-gray-500 mt-1">Alt: {flight.altitude.toLocaleString()}ft | Speed: {flight.speed}kph</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Maritime */}
      {activeTab === 'maritime' && (
        <div className="space-y-3">
          <h4 className="text-sm text-gray-400 font-medium mb-3">Vessel Tracking ({maritime.length})</h4>
          {maritime.map((vessel) => (
            <div key={vessel.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">{vessel.vessel_name}</p>
                  <p className="text-xs text-gray-400 capitalize">{vessel.vessel_type}</p>
                </div>
                <span className={`text-xs font-medium ${getVesselStatusColor(vessel.status)}`}>
                  {vessel.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{vessel.origin_port}</span>
                <span>→</span>
                <span>{vessel.destination_port}</span>
              </div>
              {vessel.speed_knots !== undefined && vessel.speed_knots > 0 && (
                <p className="text-xs text-gray-500 mt-1">Speed: {vessel.speed_knots} knots</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
