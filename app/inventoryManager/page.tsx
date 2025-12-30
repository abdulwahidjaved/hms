"use client";
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
  <div className="sidebar flex">
    <Sidebar roles={"Inventory Manager"} menu={menuItem} onSelect={setActive} active={active} />
        <div className="main p-6 w-full">
          {active === "inventory" && <InventoryDashboard />}
          {active === "restock" && <RestockRequest />}
        </div>
      </div>
    </>
  );
};

