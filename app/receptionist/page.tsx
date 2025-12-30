"use client";
import Dropdown from "../components/dropdown";
import Sidebar from "../components/Sidebar";
import { IoPersonAdd } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { useState } from "react";
import PatientRegistration from "./patientRegistration/page";
import QueueManagement from "./queueManagement/page";


export default function Receptionist() {

  const [active, setActive] = useState("patient");

  const menuItems = [
    { label: "Patient Registration", value: "patient", icon: <IoPersonAdd /> },
    { label: "Queue Management", value: "queue", icon: <FaClipboardList /> },
  ];
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Receptionist" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex h-[86vh] overflow-hidden">
        <Sidebar roles={"Receptionist"} menu={menuItems} onSelect={setActive} />

        <div className="main p-8 w-full overflow-y-auto">
          {active === "patient" && <PatientRegistration />}
          {active === "queue" && <QueueManagement />}
        </div>
      </div>
    </>
  );
};


