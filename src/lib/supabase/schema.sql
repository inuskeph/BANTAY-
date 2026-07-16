-- BANTAY Database Schema
-- PostgreSQL schema for Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emergency profiles
CREATE TABLE emergency_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  blood_type TEXT NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  address TEXT NOT NULL,
  barangay TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  emergency_contact_relationship TEXT NOT NULL,
  medical_conditions TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  medications TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family groups
CREATE TABLE family_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invite_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family members
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  family_group_id UUID REFERENCES family_groups(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN ('safe', 'warning', 'danger', 'offline')),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  battery_level INTEGER CHECK (battery_level >= 0 AND battery_level <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, family_group_id)
);

-- Family locations
CREATE TABLE family_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fire hotspots
CREATE TABLE fire_hotspots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  intensity TEXT NOT NULL CHECK (intensity IN ('low', 'medium', 'high', 'critical')),
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'contained', 'extinguished')),
  affected_radius_meters DOUBLE PRECISION NOT NULL DEFAULT 0,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Traffic incidents
CREATE TABLE traffic_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('accident', 'congestion', 'road_closure', 'construction', 'flood', 'landslide')),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  reported_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'monitoring')),
  affected_routes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safe zones
CREATE TABLE safe_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('evacuation_center', 'hospital', 'fire_station', 'police_station', 'school', 'church', 'barangay_hall')),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 0,
  current_occupancy INTEGER NOT NULL DEFAULT 0,
  contact_number TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disaster alerts
CREATE TABLE disaster_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('typhoon', 'earthquake', 'flood', 'volcanic_eruption', 'tsunami', 'landslide', 'fire')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('advisory', 'watch', 'warning', 'emergency')),
  affected_areas TEXT[] DEFAULT '{}',
  instructions TEXT[] DEFAULT '{}',
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  source TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_family_locations_member ON family_locations(member_id);
CREATE INDEX idx_family_locations_recorded ON family_locations(recorded_at DESC);
CREATE INDEX idx_fire_hotspots_status ON fire_hotspots(status);
CREATE INDEX idx_fire_hotspots_detected ON fire_hotspots(detected_at DESC);
CREATE INDEX idx_traffic_incidents_status ON traffic_incidents(status);
CREATE INDEX idx_traffic_incidents_reported ON traffic_incidents(reported_at DESC);
CREATE INDEX idx_safe_zones_active ON safe_zones(is_active);
CREATE INDEX idx_disaster_alerts_active ON disaster_alerts(is_active);
CREATE INDEX idx_disaster_alerts_severity ON disaster_alerts(severity);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_locations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own emergency profile" ON emergency_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own emergency profile" ON emergency_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Family members can view group" ON family_groups FOR SELECT USING (
  EXISTS (SELECT 1 FROM family_members WHERE family_group_id = family_groups.id AND user_id = auth.uid())
);

CREATE POLICY "Family members can view members" ON family_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM family_members fm WHERE fm.family_group_id = family_members.family_group_id AND fm.user_id = auth.uid())
);

-- Public read for disaster info
CREATE POLICY "Public can view fire hotspots" ON fire_hotspots FOR SELECT USING (true);
CREATE POLICY "Public can view traffic incidents" ON traffic_incidents FOR SELECT USING (true);
CREATE POLICY "Public can view safe zones" ON safe_zones FOR SELECT USING (true);
CREATE POLICY "Public can view disaster alerts" ON disaster_alerts FOR SELECT USING (true);
