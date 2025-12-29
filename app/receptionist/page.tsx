import Dropdown from "../components/dropdown";
import Sidebar from "../components/Sidebar";
import { IoPersonAdd } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";


export default function Receptionist() {
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Receptionist" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex">
        <Sidebar roles={"Receptionist"} feature1={"Patient Registration"} feature2={"Queue Management"} icon1={<IoPersonAdd />} icon2={<FaClipboardList />
        } />
      </div>
    </>
  );
};


