"use client";
import InfoCard from "@/app/components/InfoCard";
import { CiClock2 } from "react-icons/ci";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdPeopleOutline } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import { useEffect, useState } from "react";

type Patient = {
    _id: string;
    patientId?: string;
    name?: string;
    priority?: 'Urgent' | 'High' | 'Normal' | 'Low' | string;
    phone?: string;
    assignedStaff?: string;
    status?: string;
    queueNumber?: number;
};

export default function QueueManagement() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetch('/api/patients')
            .then((res) => res.json())
            .then((data) => {
                if (!mounted) return;
                // ensure array
                const arr: Patient[] = Array.isArray(data) ? data : [];
                setPatients(arr);
            })
            .catch(() => setPatients([]))
            .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, []);

    const total = patients.length;
    const waitingCount = patients.filter(p => (p.status || '').toLowerCase() === 'waiting').length;
    const inTreatmentCount = patients.filter(p => ['in-treatment','in treatment','in-treatment'].includes((p.status||'').toLowerCase())).length;

    async function updateStatus(id: string, status: string) {
        // optimistic update
        setPatients((prev) => prev.map(p => p._id === id ? { ...p, status } : p));
        try {
            await fetch(`/api/patients/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
        } catch (e) {
            console.error('Failed to update status', e);
        }
    }

    const statusBadge = (status?: string) => {
        const s = (status || '').toLowerCase();
        if (s === 'in-treatment' || s === 'in treatment') return 'bg-purple-100 text-purple-700';
        if (s === 'admitted') return 'bg-blue-100 text-blue-700';
        if (s === 'waiting') return 'bg-yellow-100 text-yellow-700';
        return 'bg-gray-100 text-gray-700';
    };

    const priorityBadge = (p?: string) => {
        if (!p) return 'bg-gray-100 text-gray-700';
        switch (p.toLowerCase()) {
            case 'urgent': return 'bg-red-100 text-red-700';
            case 'high': return 'bg-orange-100 text-orange-700';
            case 'normal': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard title={"Total in Queue"} number={String(total)} subTitle={"Active patients"} icon={<MdPeopleOutline />} />
                <InfoCard title={"Waiting"} number={String(waitingCount)} subTitle={"Awaiting treatment"} icon={<CiClock2 />} />
                <InfoCard title={"In Treatment"} number={String(inTreatmentCount)} subTitle={"Being treated"} icon={<HiOutlineClipboardList />} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-4">Patient Queue</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-md overflow-hidden">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm text-gray-600">
                                <th className="px-6 py-3">Queue #</th>
                                <th className="px-6 py-3">Patient ID</th>
                                <th className="px-6 py-3">Patient Name</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Assigned Staff</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Update Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700 divide-y">
                            {loading ? (
                                <tr><td colSpan={8} className="p-6 text-center">Loading…</td></tr>
                            ) : patients.length === 0 ? (
                                <tr><td colSpan={8} className="p-6 text-center">No patients in queue</td></tr>
                            ) : (
                                patients.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">{p.queueNumber ?? ''}</td>
                                        <td className="px-6 py-4">{p.patientId ?? p._id.slice(0,6).toUpperCase()}</td>
                                        <td className="px-6 py-4 font-medium">{p.name ?? 'Unnamed'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityBadge(p.priority)}`}>
                                                {p.priority ?? 'Normal'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{p.phone ?? '-'}</td>
                                        <td className="px-6 py-4">{p.assignedStaff ?? '—'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge(p.status)}`}>
                                                {p.status ?? 'Waiting'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select value={p.status ?? 'Waiting'} onChange={(e) => updateStatus(p._id, e.target.value)} className="border rounded-md px-3 py-2">
                                                <option>Waiting</option>
                                                <option>Admitted</option>
                                                <option>In-Treatment</option>
                                                <option>Discharged</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}