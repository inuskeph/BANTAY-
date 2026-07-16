'use client';

import { useState } from 'react';
import { BloodType } from '@/types';
import { BLOOD_TYPES, COMMON_CONDITIONS, COMMON_ALLERGIES } from '@/lib/utils/emergency-qr';

interface FormData {
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
}

interface EmergencyProfileFormProps {
  onComplete: (data: FormData) => void;
}

export default function EmergencyProfileForm({ onComplete }: EmergencyProfileFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    date_of_birth: '',
    blood_type: 'O+',
    address: '',
    barangay: '',
    city: '',
    province: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    medical_conditions: [],
    allergies: [],
    medications: [],
  });

  const [medicationInput, setMedicationInput] = useState('');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'medical_conditions' | 'allergies', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const addMedication = () => {
    if (medicationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        medications: [...prev.medications, medicationInput.trim()],
      }));
      setMedicationInput('');
    }
  };

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = ['Personal Info', 'Address', 'Emergency Contact', 'Medical'];

  return (
    <div className="glass-card p-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step > index + 1 ? 'bg-bantay-safe text-white' :
              step === index + 1 ? 'bg-bantay-primary text-white' :
              'bg-white/10 text-gray-400'
            }`}>
              {step > index + 1 ? '✓' : index + 1}
            </div>
            <span className={`ml-2 text-xs hidden sm:inline ${
              step === index + 1 ? 'text-white' : 'text-gray-400'
            }`}>{label}</span>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                step > index + 1 ? 'bg-bantay-safe' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => updateField('full_name', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
              placeholder="Juan Dela Cruz"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => updateField('date_of_birth', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Blood Type</label>
            <div className="grid grid-cols-4 gap-2">
              {BLOOD_TYPES.map((bt) => (
                <button
                  key={bt}
                  onClick={() => updateField('blood_type', bt)}
                  className={`py-2 rounded-xl text-sm font-medium transition-all ${
                    formData.blood_type === bt
                      ? 'bg-bantay-primary text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Address */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Street Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
              placeholder="123 Rizal Street"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Barangay</label>
            <input
              type="text"
              value={formData.barangay}
              onChange={(e) => updateField('barangay', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
              placeholder="Barangay 123"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">City/Municipality</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
                placeholder="Manila"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Province</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => updateField('province', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
                placeholder="Metro Manila"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Emergency Contact */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Contact Name</label>
            <input
              type="text"
              value={formData.emergency_contact_name}
              onChange={(e) => updateField('emergency_contact_name', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
              placeholder="Maria Dela Cruz"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Contact Phone</label>
            <input
              type="tel"
              value={formData.emergency_contact_phone}
              onChange={(e) => updateField('emergency_contact_phone', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
              placeholder="+63 912 345 6789"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Relationship</label>
            <input
              type="text"
              value={formData.emergency_contact_relationship}
              onChange={(e) => updateField('emergency_contact_relationship', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary"
              placeholder="Spouse"
            />
          </div>
        </div>
      )}

      {/* Step 4: Medical */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Medical Conditions</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_CONDITIONS.map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleArrayItem('medical_conditions', condition)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    formData.medical_conditions.includes(condition)
                      ? 'bg-bantay-primary text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Allergies</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGIES.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleArrayItem('allergies', allergy)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    formData.allergies.includes(allergy)
                      ? 'bg-bantay-danger text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Medications</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={medicationInput}
                onChange={(e) => setMedicationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addMedication()}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bantay-primary text-sm"
                placeholder="Add medication..."
              />
              <button onClick={addMedication} className="btn-primary text-sm px-4 py-2">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.medications.map((med, index) => (
                <span key={index} className="px-3 py-1 bg-bantay-accent/20 text-bantay-accent rounded-lg text-xs flex items-center gap-1">
                  {med}
                  <button onClick={() => removeMedication(index)} className="hover:text-white">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            step === 1 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-white hover:bg-white/10'
          }`}
        >
          Back
        </button>
        <button onClick={handleNext} className="btn-primary">
          {step === 4 ? 'Generate QR Code' : 'Next'}
        </button>
      </div>
    </div>
  );
}
