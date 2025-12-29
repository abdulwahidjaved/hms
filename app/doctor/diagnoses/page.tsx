import InfoCard from "@/app/components/InfoCard";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscLock } from "react-icons/vsc";

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
            lockStatus: <VscLock />,
        },
    ];
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

            <div className="patientRecords w-full border-2 border-white mt-8 rounded-2xl overflow-hidden">
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
                        {tableItems.map((items, index) => (
                            <tr className="border-t" key={index} >
                                <td className="p-3">{items.priority}</td>
                                <td className="p-3">{items.patient}</td>
                                <td className="p-3">{items.diagnosisType}</td>
                                <td className="p-3">{items.scheduledTime}</td>
                                <td className="p-3">{items.status}</td>
                                <td className="p-3 text-center">{items.lockStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};