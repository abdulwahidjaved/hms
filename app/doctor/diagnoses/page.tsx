import React, { useState, useEffect } from 'react';
import InfoCard from '@/app/components/InfoCard';
import { CiClock2 } from 'react-icons/ci';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCalendarClearOutline } from 'react-icons/io5';

// Types
interface DiagnosisItem {
  id: string;
  priority: 'Urgent' | 'High' | 'Normal' | 'Low';
  patient: string;
  diagnosisType: string;
  scheduledTime: string;
  status: 'Completed' | 'Scheduled' | 'Pending' | 'In-Progress';
  lockStatus: 'Locked' | 'Editable';
}

const Doctor = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchPatients = () => {
      setLoading(true);
      fetch('/api/patients')
        .then(r => r.json())
        .then((data) => { if (!mounted) return; setPatients(Array.isArray(data) ? data : []); })
        .catch(() => setPatients([]))
        .finally(() => { if (mounted) setLoading(false); });
    };

    fetchPatients();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('patients-updates');
      bc.onmessage = () => fetchPatients();
      return () => { mounted = false; bc.close(); };
    }

    return () => { mounted = false; };
  }, []);

  function mapToDiagnosisStatus(p: any) {
    const s = (p.status || '').toString().toLowerCase();

    if (s === 'waiting' || s === '') return 'Pending';
    if (s === 'scheduled') return 'Scheduled';
    if (s === 'in-treatment' || s === 'admitted' || s === 'in-progress') return 'In-Progress';
    if (s === 'completed' || s === 'discharged') return 'Completed';

    // If queueNumber exists (patient assigned a slot), treat as Scheduled
    if (p.queueNumber) return 'Scheduled';

    return 'Pending';
  }

  const diagnosisData = patients.map((p, idx) => ({
    id: p._id,
    priority: p.priority || 'Normal',
    patient: p.name || p.patientId || ('Patient ' + (idx + 1)),
    diagnosisType: p.reason || 'General Consultation',
    scheduledTime: p.queueNumber ? `Queue ${p.queueNumber}` : '—',
    status: mapToDiagnosisStatus(p),
    lockStatus: (p.clinicalNotes && p.clinicalNotes.some((n: any) => n.sealed)) ? 'Locked' : 'Editable',
    requestedDoctors: p.requestedDoctors || []
  }));

  // Stats
  const pendingCount = diagnosisData.filter(d => d.status === 'Pending').length;
  const scheduledCount = diagnosisData.filter(d => d.status === 'Scheduled').length;
  const inProgressCount = diagnosisData.filter(d => d.status === 'In-Progress').length;
  const completedCount = diagnosisData.filter(d => d.status === 'Completed').length;

  const filteredData = filterStatus === 'all' ? diagnosisData : diagnosisData.filter(d => d.status.toLowerCase() === filterStatus.toLowerCase());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Normal': return 'bg-blue-100 text-blue-700';
      case 'Low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'In-Progress': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <section className="cards grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 mb-6">
        <InfoCard title={"Pending"} number={String(pendingCount)} subTitle={"Awaiting schedule"} icon={<CiClock2 />} />
        <InfoCard title={"Scheduled"} number={String(scheduledCount)} subTitle={"Appointments set"} icon={<IoCalendarClearOutline />} />
        <InfoCard title={"In Progress"} number={String(inProgressCount)} subTitle={"Active diagnoses"} icon={<IoMdCheckmarkCircleOutline />} />
        <InfoCard title={"Completed"} number={String(completedCount)} subTitle={"Locked records"} icon={<IoMdCheckmarkCircleOutline />} />
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Diagnosis Queue</h2>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Filter by status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Requested Doctors</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.diagnosisType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{(item.requestedDoctors || []).join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.lockStatus === 'Locked' ? (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ) : (
                      <span className="text-sm text-gray-500">Editable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Doctor;