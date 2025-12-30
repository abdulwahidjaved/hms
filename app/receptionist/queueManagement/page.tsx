import InfoCard from "@/app/components/InfoCard";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdPeopleOutline } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function QueueManagement() {

    const tableItems = [
        {
            queue: "Q001",
            patient_id: "P021",
            patient_name: "Rahul Sharma",
            priority: "High",
            phone: "9876543210",
            assigned_staff: "Dr. Mehta",
            status: "Waiting",
            update_status: "Pending",
        },
        {
            queue: "Q002",
            patient_id: "P022",
            patient_name: "Anita Verma",
            priority: "Medium",
            phone: "9876543211",
            assigned_staff: "Nurse Priya",
            status: "In Progress",
            update_status: "Checked In",
        },
        {
            queue: "Q003",
            patient_id: "P023",
            patient_name: "Rohit Singh",
            priority: "Low",
            phone: "9876543212",
            assigned_staff: "Dr. Kapoor",
            status: "Waiting",
            update_status: "Pending",
        },
        {
            queue: "Q004",
            patient_id: "P024",
            patient_name: "Neha Gupta",
            priority: "High",
            phone: "9876543213",
            assigned_staff: "Dr. Arora",
            status: "In Treatment",
            update_status: "Under Observation",
        },
        {
            queue: "Q005",
            patient_id: "P025",
            patient_name: "Amit Patel",
            priority: "Medium",
            phone: "9876543214",
            assigned_staff: "Nurse Kavya",
            status: "Completed",
            update_status: "Discharged",
        },
        {
            queue: "Q006",
            patient_id: "P026",
            patient_name: "Sneha Iyer",
            priority: "High",
            phone: "9876543215",
            assigned_staff: "Dr. Rao",
            status: "Waiting",
            update_status: "Critical Review",
        },
        {
            queue: "Q007",
            patient_id: "P027",
            patient_name: "Karan Malhotra",
            priority: "Low",
            phone: "9876543216",
            assigned_staff: "Nurse Asha",
            status: "Completed",
            update_status: "Discharged",
        },
        {
            queue: "Q008",
            patient_id: "P028",
            patient_name: "Pooja Nair",
            priority: "Medium",
            phone: "9876543217",
            assigned_staff: "Dr. Menon",
            status: "In Progress",
            update_status: "Vitals Checked",
        }
    ];

    return (
        <>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Total in Queue"} number={"10"} subTitle={"Active patients"} icon={<MdPeopleOutline />

                } />

                <InfoCard title={"Waiting"} number={"3"} subTitle={"Awaiting treatment"} icon={<CiClock2 />
                } />

                <InfoCard title={"In Treatment"} number={"4"} subTitle={"Being treated"} icon={<HiOutlineClipboardList />
                } />

            </div>

            <div className="patientRecordsMain flex flex-col border dark:border-white p-5 rounded-md mt-5">

                <h1 className="font-bold text-3xl">Patient Search</h1>

                <div className="patientRecords w-full border-2 border-white mt-8 rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr>
                                <th className="p-3 text-left">Queue #</th>
                                <th className="p-3 text-left">Patient ID</th>
                                <th className="p-3 text-left">Patient Name</th>
                                <th className="p-3 text-left">Priority</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Assigned Staff</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Update Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{item.queue}</td>
                                    <td className="p-3">{item.patient_id}</td>
                                    <td className="p-3">{item.patient_name}</td>
                                    <td className="p-3">{item.priority}</td>
                                    <td className="p-3">{item.phone}</td>
                                    <td className="p-3">{item.assigned_staff}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3">{item.update_status}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    );
};