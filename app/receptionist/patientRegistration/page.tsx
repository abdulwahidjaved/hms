
"use client";
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    patientId: '',
    gender: '',
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    insuranceProvider: '',
    address: '',
    insuranceNumber: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // simple success UX
        alert("Patient registered successfully");
        setFormData({
          patientId: '', gender: '', firstName: '', lastName: '', dob: '', phone: '', email: '', insuranceProvider: '', address: '', insuranceNumber: ''
        });
      } else {
        const text = await res.text();
        alert(`Registration failed: ${text}`);
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed - network error');
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (k: string, v: any) => setFormData((s) => ({ ...s, [k]: v }));

  return (
    <div className="p-6">
      <form onSubmit={handleRegister} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">Patient Registration</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Patient ID</label>
            <input value={formData.patientId} onChange={(e) => setField('patientId', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="P021" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Gender</label>
            <select value={formData.gender} onChange={(e) => setField('gender', e.target.value)} className="w-full rounded-md border px-4 py-2">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">First Name</label>
            <input value={formData.firstName} onChange={(e) => setField('firstName', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="John" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Last Name</label>
            <input value={formData.lastName} onChange={(e) => setField('lastName', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="Doe" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
            <input type="date" value={formData.dob} onChange={(e) => setField('dob', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="dd/mm/yyyy" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone</label>
            <input value={formData.phone} onChange={(e) => setField('phone', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="555-1234" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setField('email', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="john.doe@email.com" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Insurance Provider</label>
            <input value={formData.insuranceProvider} onChange={(e) => setField('insuranceProvider', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="BlueCross" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Address</label>
            <input value={formData.address} onChange={(e) => setField('address', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="123 Main St, City, State 12345" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 mb-2">Insurance Number</label>
            <input value={formData.insuranceNumber} onChange={(e) => setField('insuranceNumber', e.target.value)} className="w-full rounded-md border px-4 py-2" placeholder="BC123456" />
          </div>

        </div>

        <div className="mt-6">
          <button type="submit" disabled={submitting} className="w-full bg-black text-white rounded-md px-4 py-3 flex items-center justify-center gap-3">
            <FaUserPlus />
            {submitting ? 'Registering…' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}