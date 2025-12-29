"use client";
import Dropdown from "../components/dropdown";
import Sidebar from "../components/Sidebar";
import { MdInventory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import InventoryDashboard from "./inventoryDashboard/page";
import RestockRequest from "./restockRequest/page";


export default function InventoryManager() {

  const [active, setActive] = useState("inventory");

  const menuItem = [
    { label: "Inventory Manager", value: "inventory", icon: <MdInventory /> },
    { label: "Restock Requests", value: "restock", icon: <FaShoppingCart /> }
  ];
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Inventory Manager" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex">
        <Sidebar roles={"Inventory Manager"} menu={menuItem} onSelect={setActive} />
        <div className="main p-8 w-full">
          {active === "inventory" && <InventoryDashboard />}
          {active === "restock" && <RestockRequest />}
        </div>
      </div>
    </>
  );
};

