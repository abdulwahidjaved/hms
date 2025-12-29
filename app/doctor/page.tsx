"use client";
import Dropdown from "../components/dropdown";
import InfoCard from "../components/InfoCard";
import Sidebar from "../components/Sidebar";
import { FaStethoscope } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import Diagnoses from "./diagnoses/page";
import PatientRecords from "./patientRecords/page";
import { useState } from "react";

export default function Doctor() {

  const [active, setActive] = useState("diagnoses");

  const menuItems = [
    { label: "Diagnoses", value: "diagnoses", icon: <FaStethoscope /> },
    { label: "Patient Records", value: "patients", icon: <MdPeopleAlt /> },
  ];
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Doctor" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex h-[86vh] overflow-hidden">
        <Sidebar roles={"Doctor"} menu={menuItems} onSelect={setActive} />

        <div className="main p-8 w-full overflow-y-auto">
          {active === "diagnoses" && <Diagnoses />}
          {active === "patients" && <PatientRecords />}
        </div>
        
      </div>
    </>
  );
}
