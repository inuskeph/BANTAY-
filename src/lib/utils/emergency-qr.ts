import { EmergencyProfile, BloodType } from '@/types';

export const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const COMMON_CONDITIONS: string[] = [
  'Hypertension',
  'Diabetes Type 1',
  'Diabetes Type 2',
  'Asthma',
  'Heart Disease',
  'Epilepsy',
  'Cancer',
  'Kidney Disease',
  'Liver Disease',
  'Tuberculosis',
  'HIV/AIDS',
  'Stroke History',
  'Arthritis',
  'Thyroid Disorder',
  'COPD',
];

export const COMMON_ALLERGIES: string[] = [
  'Penicillin',
  'Sulfa Drugs',
  'Aspirin',
  'Ibuprofen',
  'Latex',
  'Peanuts',
  'Shellfish',
  'Eggs',
  'Milk',
  'Soy',
  'Wheat',
  'Bee Stings',
  'Dust Mites',
  'Pollen',
  'Mold',
];

export interface QRData {
  app: string;
  version: string;
  profile: {
    name: string;
    dob: string;
    blood: BloodType;
    address: string;
    barangay: string;
    city: string;
    province: string;
  };
  emergency: {
    contact_name: string;
    contact_phone: string;
    relationship: string;
  };
  medical: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
}

export function generateEmergencyQRData(profile: EmergencyProfile): string {
  const qrData: QRData = {
    app: 'BANTAY',
    version: '1.0',
    profile: {
      name: profile.full_name,
      dob: profile.date_of_birth,
      blood: profile.blood_type,
      address: profile.address,
      barangay: profile.barangay,
      city: profile.city,
      province: profile.province,
    },
    emergency: {
      contact_name: profile.emergency_contact_name,
      contact_phone: profile.emergency_contact_phone,
      relationship: profile.emergency_contact_relationship,
    },
    medical: {
      conditions: profile.medical_conditions,
      allergies: profile.allergies,
      medications: profile.medications,
    },
  };

  return JSON.stringify(qrData);
}

export function parseEmergencyQRData(data: string): QRData | null {
  try {
    const parsed = JSON.parse(data);
    if (parsed.app !== 'BANTAY') {
      return null;
    }
    return parsed as QRData;
  } catch {
    return null;
  }
}
