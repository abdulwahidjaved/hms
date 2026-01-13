"use client";
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import PatientModal from './components/PatientModal';
import { useSearchParams, useRouter } from 'next/navigation';

type Patient = {
  _id: string;
  patientId?: string;
  name?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  admissionDate?: string;
};

export default function PatientRecords() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // open modal when ?open=<id>
  useEffect(() => {
    const open = searchParams?.get('open');
    if (open) setSelectedId(open);
  }, [searchParams]);

  const fetchPatients = (q?: string) => {
    setLoading(true);
    const url = q ? `/api/patients?q=${encodeURIComponent(q)}` : '/api/patients';
    fetch(url)
      .then((r) => r.json())
      .then((data) => setPatients(Array.isArray(data) ? data : []))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('patients-updates');
      bc.onmessage = () => fetchPatients(search);
      return () => bc.close();
    }
  }, []);

  // close modal when an update happens elsewhere
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('patients-updates');
      bc.onmessage = () => { fetchPatients(search); if (selectedId) setSelectedId(null); };
      return () => bc.close();
    }
  }, [selectedId]);

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    fetchPatients(search);
  };

  const filtered = patients.filter((p) => {
    if (!date) return true;
    // patient.admissionDate may be stored as 'dd/mm/yyyy' or with time; convert date input yyyy-mm-dd to dd/mm/yyyy
    const parts = date.split('-');
    if (parts.length !== 3) return true;
    const d = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return (p.admissionDate || '').startsWith(d);
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Patient Search</h1>
        <div className="flex items-center gap-3">
          <form onSubmit={onSearch} className="flex items-center gap-2">
            <div className="relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or patient ID..." className="border rounded-md px-4 py-2 w-80" />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-gray-600"><FiSearch /></button>
            </div>
          </form>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-md px-4 py-2" />
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-3">Patient ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">DOB</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Admission Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center">No patients found</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedId(p._id); router.replace(`/doctor/patientRecords?open=${p._id}`, { scroll: false }); }}>
                    <td className="px-6 py-4">{p.patientId ?? p._id.slice(0,6).toUpperCase()}</td>
                    <td className="px-6 py-4 font-medium text-blue-600">{p.name ?? 'Unnamed'}</td>
                    <td className="px-6 py-4">{p.dob ?? '-'}</td>
                    <td className="px-6 py-4">{p.gender ?? '-'}</td>
                    <td className="px-6 py-4">{p.phone ?? '-'}</td>
                    <td className="px-6 py-4">{p.admissionDate ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedId && (
        <PatientModal id={selectedId} onClose={() => { setSelectedId(null); router.replace('/doctor/patientRecords', { scroll: false }); }} />
      )}

    </div>
  );
}