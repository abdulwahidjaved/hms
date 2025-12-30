"use client";
import InfoCard from "@/app/components/InfoCard";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useEffect, useState } from "react";

type InventoryItem = {
    _id: string;
    itemName: string;
    quantity: number;
    minStock?: number;
    status?: string;
};

export default function InventoryDashboard() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/inventory');
                const data = await response.json();
                setItems(data || []);
            } catch (error) {
                console.error("Failed to fetch:", error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate these from your 'items' state
    const totalItems = items.length;
    const lowStockCount = items.filter(item => item.quantity < (item.minStock ?? 0)).length;
    const totalValue = items.reduce((acc, item) => acc + (item.quantity * 10), 0); // Assuming $10/unit for now

    return (
        <div className="p-6 space-y-6">
            {/* Top stats row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <InfoCard title={"Total Items"} number={String(totalItems)} subTitle={"In inventory"} icon={<LuBox />} />
                <InfoCard title={"Total Value"} number={`$${totalValue.toLocaleString()}`} subTitle={"Stock value"} icon={<BsCurrencyDollar />} />
                <InfoCard title={"Low Stock"} number={String(lowStockCount)} subTitle={"Below minimum"} icon={<IoWarningOutline />} />
                <InfoCard title={"Expiring Soon"} number={"1"} subTitle={"Within 30 days"} icon={<MdOutlineCalendarToday />} />
            </div>

            {/* Inventory table card (matches screenshot layout) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Inventory Items</h2>
                        <div className="text-sm text-gray-500">Inventory Manager</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <select className="border rounded-md px-3 py-2 bg-white">
                            <option>Category</option>
                        </select>
                        <select className="border rounded-md px-3 py-2 bg-white">
                            <option>All items</option>
                        </select>
                        <button className="bg-black text-white px-4 py-2 rounded-md">+ Restock Request</button>
                    </div>
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
                                    <td className="px-6 py-4">{(item as any).itemCode ?? item._id.slice(0,6).toUpperCase()}</td>
                                    <td className="px-6 py-4">{item.itemName}</td>
                                    <td className="px-6 py-4">{(item as any).category ?? 'Medication'}</td>
                                    <td className="px-6 py-4">{item.quantity}</td>
                                    <td className="px-6 py-4">{item.minStock ?? '-'}</td>
                                    <td className="px-6 py-4">{(item as any).expiration ?? '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.quantity < (item.minStock ?? 0) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {item.status ?? (item.quantity < (item.minStock ?? 0) ? 'Expiring Soon' : 'OK')}
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