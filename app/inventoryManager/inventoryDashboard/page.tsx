"use client";
import InfoCard from "@/app/components/InfoCard";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useState } from "react";


export default function InventoryDashboard() {

    const [open, setOpen] = useState(false);
    const [open01, setOpen01] = useState(false);

    const tableItems = [
        {
            priority: "Urgent",
            patient: "Robert Johnson",
            diagnosisType: "Emergency CT Scan",
            scheduledTime: "19/12/2025, 20:15",
            status: "Completed",
            lockStatus: "",
        },];
    return (
        <>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Total Items"} number={"30"} subTitle={"In inventory"} icon={<LuBox />
                } />

                <InfoCard title={"Total Value"} number={"$39326.00"} subTitle={"Stock value"} icon={<BsCurrencyDollar />
                } />

                <InfoCard title={"Low Stock"} number={"0"} subTitle={"Below minimum"} icon={<IoWarningOutline />
                } />

                <InfoCard title={"Expiring Soon"} number={"1"} subTitle={"Within 30 days"} icon={<MdOutlineCalendarToday />
                } />
            </div>

            <div className="patientRecords w-full border-2 border-gray-400 dark:border-white mt-8 rounded-2xl overflow-hidden p-5">

                <div className="contentsAll flex justify-between relative items-center">
                    <h1 className="font-bold text-3xl">Inventory items</h1>

                    <div className="buttons flex gap-5">

                        <button className="border-2 border-gray-400 dark:border-white flex items-center gap-5 px-2 py-1 cursor-pointer" onClick={() => setOpen(!open)}>
                            <span className="text-gray-400">Filter by status</span>
                            <FaAngleDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                        </button>

                        <button className="border-2 border-gray-400 dark:border-white flex items-center gap-5 px-2 py-1 cursor-pointer" onClick={() => setOpen01(!open01)}>
                            <span className="text-gray-400">All items</span>
                            <FaAngleDown className={`transition-transform duration-300 ${open01 ? "rotate-180" : ""}`} />
                        </button>
                        
                        <button className="border-2 border-gray-400 dark:border-white flex items-center gap-5 px-2 py-1 cursor-pointer">
                            <IoMdAdd />
                            <span className="text-gray-400">Restock request</span>
                            
                        </button>
                    </div>
                </div>

                <div className={`absolute ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} flex flex-col right-92 mt-2 border-2 dark:border-white w-42 transition-all duration-300 dark:bg-black cursor-pointer`}>
                    <span className="hover:bg-gray-700 px-2 py-1">All Categories</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Medication</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Antibiotic</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Supplies</span>
                </div>

                <div className={`absolute ${open01 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} flex flex-col right-48 mt-2 border-2 dark:border-white w-42 transition-all duration-300 dark:bg-black cursor-pointer`}>
                    <span className="hover:bg-gray-700 px-2 py-1">All items</span>
                    <span className="hover:bg-gray-700 px-2 py-1">30 days</span>
                    <span className="hover:bg-gray-700 px-2 py-1">60 days</span>
                    <span className="hover:bg-gray-700 px-2 py-1">90 days</span>
                </div>

                <div className="patientRecords w-full border-2 border-gray-400 dark:border-white mt-8 rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr>
                                <th className="p-3 text-left">Priority</th>
                                <th className="p-3 text-left">Patient</th>
                                <th className="p-3 text-left">Diagnosis</th>
                                <th className="p-3 text-left">Scheduled Time</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Lock</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{item.priority}</td>
                                    <td className="p-3">{item.patient}</td>
                                    <td className="p-3">{item.diagnosisType}</td>
                                    <td className="p-3">{item.scheduledTime}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3 text-left">{item.lockStatus}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    );
};