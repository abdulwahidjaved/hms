"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { SiSimpleanalytics } from "react-icons/si";
import AnalyticsDashboard from "./analyticsDashboard/page";


export default function HospitalAdministrator() {
  const [active, setActive] = useState("analytics");

  const menuItems = [
    { label: "Analytics Dashboard", value: "analytics", icon: <SiSimpleanalytics /> }
  ];
  return (
    <>
  <div className="sidebar flex">
    <Sidebar roles={"Hospital Administrator"} menu={menuItems} onSelect={setActive} active={active} />
        <div className="main p-6 w-full">
          {active === "analytics" && <AnalyticsDashboard />}
        </div>
      </div>
    </>
  );
};

