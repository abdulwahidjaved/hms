"use client";
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
  <div className="flex">
    <Sidebar roles={"Receptionist"} menu={menuItems} onSelect={setActive} active={active} />

        <div className="main p-6 w-full">
          {active === "patient" && <PatientRegistration />}
          {active === "queue" && <QueueManagement />}
        </div>
      </div>
    </>
  );
};


