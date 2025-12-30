"use client";
import InfoCard from "@/app/components/InfoCard";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscLock } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";

export default function Diagnoses() {

    const tableItems = [
        {
            priority: "Urgent",
            patient: "Robert Johnson",
            diagnosisType: "Emergency CT Scan",
            scheduledTime: "19/12/2025, 20:15",
            status: "Completed",
            lockStatus: <VscLock />,
        },
        {
            priority: "Normal",
            patient: "Emily Clark",
            diagnosisType: "Routine Checkup",
            scheduledTime: "20/12/2025, 10:30",
            status: "Pending",
            lockStatus: <VscLock />,
        },
        {
            priority: "High",
            patient: "Michael Brown",
            diagnosisType: "MRI Scan",
            scheduledTime: "21/12/2025, 14:00",
            status: "Scheduled",
            lockStatus: "Editable",
        },
    ];
    const [open, setOpen] = useState(false);
    return (

        <>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Pending"} number={"4"} subTitle={"Awaiting schedule"} icon={<AiOutlineExclamationCircle />
                } />

                <InfoCard title={"Scheduled"} number={"4"} subTitle={"Appointments set"} icon={<IoCalendarClearOutline />
                } />

                <InfoCard title={"In Progress"} number={"3"} subTitle={"Active diagnoses"} icon={<CiClock2 />
                } />

                <InfoCard title={"Completed"} number={"9"} subTitle={"Locked records"} icon={<IoMdCheckmarkCircleOutline />
                } />
            </div>

            <div className="patientRecords w-full border-2 border-gray-400 dark:border-white mt-8 rounded-2xl overflow-hidden p-5">

                <div className="contentsAll flex justify-between relative items-center">
                    <h1 className="font-bold text-3xl">Diagnosis Queue</h1>
                    <button className="border-2 border-gray-400 dark:border-white flex items-center gap-5 px-2 py-1 cursor-pointer" onClick={() => setOpen(!open)}>
                        <span className="text-gray-400">Filter by status</span>
                        <FaAngleDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                </div>

                <div className={`absolute ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} flex flex-col right-5 mt-2 border-2 dark:border-white w-48 transition-all duration-300 dark:bg-black cursor-pointer`}>
                    <span className="hover:bg-gray-700 px-2 py-1">All Statuses</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Pending</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Scheduled</span>
                    <span className="hover:bg-gray-700 px-2 py-1">In Progress</span>
                    <span className="hover:bg-gray-700 px-2 py-1">Completed</span>
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