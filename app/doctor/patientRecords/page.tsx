import { FiSearch } from "react-icons/fi";

export default function PatientRecords() {

    const tableItems = [
        {
            patient_id: "P015",
            name: "Joseph Harris",
            dob: "28/03/1991",
            gender: "Male",
            phone: "555-1015",
            admission_date: "23/12/2025, 16:30:00",
        },
        {
            patient_id: "P016",
            name: "Emily Carter",
            dob: "14/07/1994",
            gender: "Female",
            phone: "555-1016",
            admission_date: "24/12/2025, 10:15:00",
        },
        {
            patient_id: "P017",
            name: "Michael Brown",
            dob: "02/11/1988",
            gender: "Male",
            phone: "555-1017",
            admission_date: "24/12/2025, 11:45:00",
        },
        {
            patient_id: "P018",
            name: "Sophia Wilson",
            dob: "19/05/1996",
            gender: "Female",
            phone: "555-1018",
            admission_date: "25/12/2025, 09:20:00",
        },
        {
            patient_id: "P019",
            name: "Daniel Martinez",
            dob: "30/01/1990",
            gender: "Male",
            phone: "555-1019",
            admission_date: "25/12/2025, 14:10:00",
        },
        {
            patient_id: "P020",
            name: "Ava Johnson",
            dob: "08/09/1998",
            gender: "Female",
            phone: "555-1020",
            admission_date: "26/12/2025, 12:40:00",
        }
    ];

    return (
        <>
            <div className="patientRecordsMain flex flex-col border dark:border-white p-5 rounded-md">

                <h1 className="font-bold text-3xl">Patient Search</h1>

                <div className="inputs mt-4 flex gap-5">
                    <input type="text" name="" id="" placeholder="Search by name or patient ID..." className="p-2 w-full border dark:border-white rounded-md" />
                    <input type="text" name="" id="" placeholder="dd-mm-yy" className="p-2 border dark:border-white w-1/4 rounded-md" />
                    <button className="border dark:border-white p-2 px-3 cursor-pointer rounded-md"><FiSearch /></button>
                </div>

                <div className="patientRecords w-full border-2 dark:border-white mt-8 rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr>
                                <th className="p-3 text-left">Patient ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">DOB</th>
                                <th className="p-3 text-left">Gender</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Admission Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{item.patient_id}</td>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.dob}</td>
                                    <td className="p-3">{item.gender}</td>
                                    <td className="p-3">{item.phone}</td>
                                    <td className="p-3">{item.admission_date}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    );
};