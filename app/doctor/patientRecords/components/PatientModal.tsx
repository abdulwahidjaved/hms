"use client";
import React, { useEffect, useState } from 'react';

type ClinicalNote = { date: string; author?: string; type?: string; description?: string };

export default function PatientModal({ id, onClose }: { id: string; onClose: () => void }) {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'demographics'|'notes'|'dicom'>('demographics');
  const [images, setImages] = useState<any[]>([]);
  const [newNote, setNewNote] = useState({ type: 'Examination', description: '' });

  async function fetchPatient() {
    setLoading(true);
    try {
      // 1. Fetch patient details using the MongoDB _id
      const res = await fetch(`/api/patients/${id}`);
      if (!res.ok) throw new Error('Failed to fetch patient');
      const data = await res.json();
      setPatient(data);

      // 2. Fetch images using the short patientId (e.g., "P092") to match image records
      // We use data.patientId specifically because that is how images are indexed in your DB
      const imgRes = await fetch(`/api/patient-images?patientId=${data.patientId}`);
      const imgData = await imgRes.json();
      setImages(Array.isArray(imgData) ? imgData : []);
    } catch (e) {
      console.error("Fetch Error:", e);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchPatient();
  }, [id]);

  // ... handleAddNote, handleReviewNote, handleSealNote remain the same ...
  async function handleAddNote() {
    if (!newNote.description) { alert('Please provide note content'); return; }
    try {
      const res = await fetch(`/api/patients/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: 'Doctor', type: newNote.type, description: newNote.description })
      });
      if (!res.ok) {
        const err = await res.json();
        alert('Failed: ' + (err?.error || 'server error'));
        return;
      }
      setNewNote({ type: 'Examination', description: '' });
      await fetchPatient();
    } catch (e) {
      console.error(e);
      alert('Failed to add note');
    }
  }

  async function handleReviewNote(noteId: string) {
    try {
      const res = await fetch(`/api/patients/${id}/notes/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ op: 'review', actor: 'Doctor' })
      });
      const data = await res.json();
      if (!res.ok) { alert(data?.error || 'Failed to mark reviewed'); return; }
      await fetchPatient();
    } catch (e) {
      console.error(e);
      alert('Failed to mark reviewed');
    }
  }

  async function handleSealNote(noteId: string) {
    try {
      const res = await fetch(`/api/patients/${id}/notes/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ op: 'seal', actor: 'Doctor' })
      });
      const data = await res.json();
      if (!res.ok) { alert(data?.error || 'Failed to seal note'); return; }
      await fetchPatient();
    } catch (e) {
      console.error(e);
      alert('Failed to seal note');
    }
  }

  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!patient) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
        <p className="text-gray-600 mb-4">Patient record not found.</p>
        <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Close</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Patient Details: {patient.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-gray-50 border-b">
          {(['demographics', 'notes', 'dicom'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                activeTab === tab ? 'bg-white shadow-sm border text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'demographics' ? 'Demographics' : tab === 'notes' ? 'Clinical Notes' : 'DICOM Viewer'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto">
          {activeTab === 'demographics' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 border-b pb-2">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <InfoBlock label="Patient ID" value={patient.patientId} />
                <InfoBlock label="Full Name" value={patient.name} />
                <InfoBlock label="Date of Birth" value={patient.dob} />
                <InfoBlock label="Gender" value={patient.gender} />
                <InfoBlock label="Phone" value={patient.phone} />
                <InfoBlock label="Email" value={patient.email} />
                <InfoBlock label="Address" value={patient.address} />
                <InfoBlock label="Insurance Provider" value={patient.insuranceProvider} />
                <InfoBlock label="Insurance Number" value={patient.insuranceNumber} />
                <InfoBlock label="Admission Date" value={patient.admissionDate} />
                <InfoBlock label="Discharge Date" value={patient.dischargeDate || 'Not discharged'} />
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Note adding UI remains unchanged */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-2xl font-bold mb-4">Add Clinical Note</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Note Type</label>
                    <select value={newNote.type} onChange={(e) => setNewNote((s) => ({ ...s, type: e.target.value }))} className="w-full rounded-md border px-4 py-2">
                      <option>Examination</option>
                      <option>Treatment</option>
                      <option>Prescription</option>
                      <option>Follow-up</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Note Content</label>
                    <textarea value={newNote.description} onChange={(e) => setNewNote((s) => ({ ...s, description: e.target.value }))} className="w-full rounded-md border px-4 py-2" rows={5} placeholder="Enter clinical observations..." />
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleAddNote} className="bg-black text-white px-4 py-2 rounded">+ Add Note</button>
                    <p className="text-sm text-gray-500">Notes are editable until reviewed and sealed by a doctor.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Clinical Notes</h3>
                {patient.clinicalNotes?.length > 0 ? (
                  patient.clinicalNotes.map((note: any) => (
                    <div key={note._id} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-gray-900">{note.type || 'Note'}</h4>
                            <div className="text-xs text-gray-500">By {note.author} • {new Date(note.date).toLocaleString()}</div>
                          </div>
                          <p className="text-gray-700 mt-3">{note.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          {note.reviewed ? (
                            <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded">Reviewed</span>
                          ) : (
                            <button onClick={() => handleReviewNote(note._id)} className="bg-white border rounded px-3 py-1 text-sm hover:bg-gray-50">Mark Reviewed</button>
                          )}
                          <button
                            onClick={() => handleSealNote(note._id)}
                            disabled={!note.reviewed || note.sealed}
                            className={`flex items-center gap-2 px-3 py-2 rounded ${note.sealed ? 'bg-gray-100 text-gray-500' : note.reviewed ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                          >
                            <span>{note.sealed ? 'Sealed' : 'Seal to Blockchain'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No clinical history recorded.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'dicom' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={img._id || i} className="group relative rounded-lg border overflow-hidden bg-black flex items-center justify-center">
                  <img 
                    // Support both Direct URLs (image_url) and Base64 Data
                    src={img.image_url ? img.image_url : `data:${img.contentType};base64,${img.data}`} 
                    className="w-full h-48 object-contain opacity-90 group-hover:opacity-100 transition" 
                    alt={img.title || img.fileName}
                  />
                  <div className="absolute bottom-0 w-full bg-black/70 p-2 text-[10px] text-white">
                    {img.title || img.fileName || "Medical Scan"}
                  </div>
                </div>
              ))}
              {images.length === 0 && <p className="col-span-full text-center text-gray-400 py-12">No medical scans available.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-gray-900 font-semibold">{value || '—'}</p>
    </div>
  );
}