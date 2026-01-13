"use client";
import React, { useEffect, useState } from 'react';

type RR = {
  _id: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  urgency: 'Low' | 'Normal' | 'High';
  notes?: string;
  status: string;
  requestedBy?: string;
  createdAt?: string;
}

export default function RestockRequest() {
  const [list, setList] = useState<RR[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchList = () => {
    setLoading(true);
    fetch('/api/restock')
      .then(r => r.json())
      .then((d) => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchList();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('restock-updates');
      bc.onmessage = () => fetchList();
      return () => bc.close();
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restock Requests</h1>

      <div className="bg-white rounded-xl border p-6">
        {loading ? <div>Loading…</div> : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-gray-600 uppercase tracking-wider">
                  <th className="px-6 py-3">Item</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Urgency</th>
                  <th className="px-6 py-3">Requested By</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {list.map(r => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{r.itemName} ({r.itemCode})</td>
                    <td className="px-6 py-4">{r.quantity}</td>
                    <td className="px-6 py-4">{r.urgency}</td>
                    <td className="px-6 py-4">{r.requestedBy ?? '-'}</td>
                    <td className="px-6 py-4">{r.status}</td>
                    <td className="px-6 py-4">{r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}