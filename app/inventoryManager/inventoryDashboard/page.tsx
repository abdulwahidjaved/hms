"use client";
import InfoCard from "@/app/components/InfoCard";
import { LuBox } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useEffect, useState } from "react";

// Keep the minimal fields we use in the UI
type InventoryItem = {
  _id: string;
  itemCode?: string;
  itemName?: string;
  category?: string;
  quantity?: number;
  minStock?: number;
  expiration?: string;
  status?: string;
};

const AVAILABLE_ITEMS = [
  { code: "MED003", name: "Amoxicillin 500mg", category: "antibiotics" },
  { code: "MED020", name: "Azithromycin 250mg", category: "antibiotics" },
  { code: "MED002", name: "Ibuprofen 200mg", category: "medication" },
  { code: "MED008", name: "Levothyroxine 50mcg", category: "medication" },
  { code: "SUP015", name: "Face Masks (Box)", category: "supplies" },
  { code: "SUP013", name: "Surgical Gloves (Box)", category: "supplies" },
  { code: "SUP006", name: "Gauze Pads (Pack)", category: "supplies" },
  { code: "SUP019", name: "Bandages (Roll)", category: "supplies" },
  { code: "MED001", name: "Aspirin 100mg", category: "medication" },
];

export default function InventoryDashboard() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ itemCode: "", quantity: 100, urgency: "Normal", notes: "" });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/inventory");

        // If the response is not OK, log the body text for diagnostics and bail out safely
        if (!res.ok) {
          const text = await res.text();
          console.error("/api/inventory returned non-OK status:", res.status, text);
          if (mounted) setItems([]);
          return;
        }

        // Guard against empty responses (which causes `res.json()` to throw)
        const bodyText = await res.text();
        if (!bodyText) {
          if (mounted) setItems([]);
          return;
        }

        // Parse JSON defensively
        let data: any;
        try {
          data = JSON.parse(bodyText);
        } catch (e) {
          console.error("Invalid JSON from /api/inventory:", e, "body:", bodyText);
          if (mounted) setItems([]);
          return;
        }

        if (mounted) setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch /api/inventory:", error);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleItemChange = (code: string) => {
    const it = AVAILABLE_ITEMS.find((i) => i.code === code);
    setForm((f) => ({ ...f, itemCode: code, notes: it ? it.name : "" }));
  };

  const submitRestock = async () => {
    if (!form.itemCode || !form.quantity) {
      alert("Please select an item and quantity");
      return;
    }

    try {
      const payload = {
        itemCode: form.itemCode,
        itemName: (AVAILABLE_ITEMS.find((i) => i.code === form.itemCode)?.name) || "",
        quantity: form.quantity,
        urgency: form.urgency,
        notes: form.notes,
        requestedBy: "Inventory Manager",
      };

      const res = await fetch("/api/restock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Failed: " + text);
        return;
      }

      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const bc = new BroadcastChannel("restock-updates");
        bc.postMessage({ type: "update" });
        bc.close();
      }

      alert("Restock request submitted");
      setModalOpen(false);
      setForm({ itemCode: "", quantity: 100, urgency: "Normal", notes: "" });
    } catch (e) {
      console.error(e);
      alert("Submit failed");
    }
  };

  // Derived values
  const totalItems = items.length;
  const lowStockCount = items.filter((it) => (it.quantity ?? 0) < (it.minStock ?? 0)).length;
  const totalValue = items.reduce((acc, it) => acc + ((it.quantity ?? 0) * 10), 0); // TODO: replace placeholder unit price

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InfoCard title={"Total Items"} number={String(totalItems)} subTitle={"In inventory"} icon={<LuBox />} />
        <InfoCard title={"Total Value"} number={`$${totalValue.toLocaleString()}`} subTitle={"Stock value"} icon={<BsCurrencyDollar />} />
        <InfoCard title={"Low Stock"} number={String(lowStockCount)} subTitle={"Below minimum"} icon={<IoWarningOutline />} />
        <InfoCard title={"Expiring Soon"} number={"1"} subTitle={"Within 30 days"} icon={<MdOutlineCalendarToday />} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Inventory Items</h2>
            <div className="text-sm text-gray-500">Inventory Manager</div>
          </div>

          <div className="flex items-center gap-3">
            <select value={""} onChange={() => {}} className="border rounded-md px-3 py-2 bg-white">
              <option value="all">All Categories</option>
              <option value="medication">Medication</option>
              <option value="supplies">Supplies</option>
              <option value="antibiotics">Antibiotics</option>
            </select>

            <select value={""} onChange={() => {}} className="border rounded-md px-3 py-2 bg-white">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>

            <button onClick={() => setModalOpen(true)} className="bg-black text-white px-4 py-2 rounded-md">+ Restock Request</button>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg w-[560px] p-6 relative">
                <button onClick={() => setModalOpen(false)} className="absolute right-4 top-4 text-gray-500">×</button>
                <h3 className="text-xl font-semibold mb-4">Create Restock Request</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Item</label>
                    <select value={form.itemCode} onChange={(e) => handleItemChange(e.target.value)} className="w-full rounded-md border px-4 py-2">
                      <option value="">Select item</option>
                      {AVAILABLE_ITEMS.map((i) => (
                        <option key={i.code} value={i.code}>
                          {i.name} ({i.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Quantity</label>
                    <input type="number" value={form.quantity} onChange={(e) => setForm((s) => ({ ...s, quantity: Number(e.target.value) }))} className="w-full rounded-md border px-4 py-2" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Urgency</label>
                    <select value={form.urgency} onChange={(e) => setForm((s) => ({ ...s, urgency: e.target.value }))} className="w-full rounded-md border px-4 py-2">
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Notes (Optional)</label>
                    <textarea value={form.notes} onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))} className="w-full rounded-md border px-4 py-2" rows={4} />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button onClick={submitRestock} className="bg-black text-white px-4 py-2 rounded">Submit Request</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="px-6 py-3">Item Code</th>
                <th className="px-6 py-3">Item Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Min Stock</th>
                <th className="px-6 py-3">Expiration</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{item.itemCode ?? item._id.slice(0, 6).toUpperCase()}</td>
                  <td className="px-6 py-4">{item.itemName ?? "-"}</td>
                  <td className="px-6 py-4">{item.category ?? "Medication"}</td>
                  <td className="px-6 py-4">{item.quantity ?? 0}</td>
                  <td className="px-6 py-4">{item.minStock ?? "-"}</td>
                  <td className="px-6 py-4">{item.expiration ?? "-"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        (item.quantity ?? 0) < (item.minStock ?? 0) ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status ?? ((item.quantity ?? 0) < (item.minStock ?? 0) ? "Expiring Soon" : "OK")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};