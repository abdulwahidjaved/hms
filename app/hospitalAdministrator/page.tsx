"use client";
import { useState } from "react";
import Dropdown from "../components/dropdown";
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
      <div className="p-6">
        <Dropdown pageName="Hospital Administrator" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex h-[86vh] overflow-hidden">
        <Sidebar roles={"Hospital Administrator"} menu={menuItems} onSelect={setActive} />
        <div className="main p-8 w-full overflow-y-auto">
          {active === "analytics" && <AnalyticsDashboard />}
        </div>
      </div>
    </>
  );
};

