"use client";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function RestockRequest() {

    const [open, setOpen] = useState(false);

    const tableItems = [
        {
            items: "Amoxicillin 500mg",
            category: "Antibiotic",
            quantity: "100",
            urgency: "High",
            requested_by: "Karen Taylor",
            status: "Pending",
            date: "23/12/2025",
        },
        {
            items: "Paracetamol 650mg",
            category: "Analgesic",
            quantity: "250",
            urgency: "Medium",
            requested_by: "John Smith",
            status: "Approved",
            date: "22/12/2025",
        },
        {
            items: "Insulin Injection",
            category: "Hormone",
            quantity: "40",
            urgency: "High",
            requested_by: "Dr. Meera Patel",
            status: "Pending",
            date: "21/12/2025",
        },
        {
            items: "Cough Syrup",
            category: "Respiratory",
            quantity: "60",
            urgency: "Low",
            requested_by: "Rahul Verma",
            status: "Delivered",
            date: "20/12/2025",
        },
        {
            items: "Vitamin D3 Capsules",
            category: "Supplement",
            quantity: "150",
            urgency: "Low",
            requested_by: "Anita Sharma",
            status: "Approved",
            date: "19/12/2025",
        },
    ];

    return (
        <>
            <div className="patientRecords w-full border-2 border-gray-400 dark:border-white mt-8 rounded-2xl overflow-hidden p-5">

                <div className="contentsAll flex justify-between relative items-center">
                    <h1 className="font-bold text-3xl">Restock Requests</h1>
                    <button className="border-2 border-gray-400 dark:border-white flex items-center gap-5 px-2 py-1 cursor-pointer" onClick={() => setOpen(!open)}>
                        <span className="text-gray-400">Filter by status</span>
                        <FaAngleDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                </div>

                <div className={`absolute ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} flex flex-col right-5 mt-2 border-2 dark:border-white w-48 transition-all duration-300 dark:bg-black cursor-pointer`}>
                    <span className="hover:bg-gray-700 px-2 py-1">All Statuses</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Pending</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Approved</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Completed</span>
                </div>

                <div className="patientRecords w-full border-2 border-gray-400 dark:border-white mt-8 rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr>
                                <th className="p-3 text-left">Items</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Quantity</th>
                                <th className="p-3 text-left">Urgency</th>
                                <th className="p-3 text-left">Requested By</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{item.items}</td>
                                    <td className="p-3">{item.category}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">{item.urgency}</td>
                                    <td className="p-3">{item.requested_by}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    );
};