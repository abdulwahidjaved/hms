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
        <div>This is Patient Record Page</div>
        </>
    );
};