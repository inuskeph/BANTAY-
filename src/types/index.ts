export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type IncidentType = 'accident' | 'congestion' | 'road_closure' | 'construction' | 'flood' | 'landslide';

export type SafeZoneType = 'evacuation_center' | 'hospital' | 'fire_station' | 'police_station' | 'school' | 'church' | 'barangay_hall';

export type DisasterType = 'typhoon' | 'earthquake' | 'flood' | 'volcanic_eruption' | 'tsunami' | 'landslide' | 'fire';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyProfile {
  id: string;
  user_id: string;
  full_name: string;
  date_of_birth: string;
  blood_type: BloodType;
  address: string;
  barangay: string;
  city: string;
  province: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  medical_conditions: string[];
  allergies: string[];
  medications: string[];
  created_at: string;
  updated_at: string;
}

export interface FamilyGroup {
  id: string;
  name: string;
  created_by: string;
  invite_code: string;
  created_at: string;
}

export interface FamilyMember {
  id: string;
  user_id: string;
  family_group_id: string;
  full_name: string;
  role: string;
  avatar_url?: string;
  status: 'safe' | 'warning' | 'danger' | 'offline';
  last_location?: GeoLocation;
  last_seen: string;
  battery_level?: number;
  distance?: number;
}

export interface FireHotspot {
  id: string;
  location: GeoLocation;
  address: string;
  confidence: number;
  intensity: 'low' | 'medium' | 'high' | 'critical';
  detected_at: string;
  status: 'active' | 'contained' | 'extinguished';
  affected_radius_meters: number;
  source: string;
}

export interface TrafficIncident {
  id: string;
  type: IncidentType;
  location: GeoLocation;
  address: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reported_at: string;
  status: 'active' | 'resolved' | 'monitoring';
  affected_routes: string[];
}

export interface AirTraffic {
  id: string;
  flight_number: string;
  airline: string;
  origin: string;
  destination: string;
  status: 'on_time' | 'delayed' | 'cancelled' | 'diverted';
  altitude?: number;
  speed?: number;
  location?: GeoLocation;
  estimated_arrival: string;
}

export interface MaritimeVessel {
  id: string;
  vessel_name: string;
  vessel_type: 'cargo' | 'passenger' | 'fishing' | 'military' | 'coast_guard';
  origin_port: string;
  destination_port: string;
  status: 'sailing' | 'docked' | 'anchored' | 'distress';
  location?: GeoLocation;
  speed_knots?: number;
  estimated_arrival: string;
}

export interface SafeZone {
  id: string;
  name: string;
  type: SafeZoneType;
  location: GeoLocation;
  address: string;
  capacity: number;
  current_occupancy: number;
  contact_number?: string;
  is_active: boolean;
  distance?: number;
}

export interface DisasterAlert {
  id: string;
  type: DisasterType;
  title: string;
  description: string;
  severity: 'advisory' | 'watch' | 'warning' | 'emergency';
  affected_areas: string[];
  instructions: string[];
  issued_at: string;
  expires_at?: string;
  source: string;
  is_active: boolean;
}
