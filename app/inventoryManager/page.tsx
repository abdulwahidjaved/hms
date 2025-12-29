import Dropdown from "../components/dropdown";
import Sidebar from "../components/Sidebar";
import { MdInventory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";


export default function InventoryManager() {
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Inventory Manager" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex">
        <Sidebar roles={"Inventory Manager"} feature1={"Inventory Dashboard"} feature2={"Request Stocks"} icon1={<MdInventory />} icon2={<FaShoppingCart />} />
      </div>
    </>
  );
};

