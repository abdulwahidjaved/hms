import Dropdown from "../components/dropdown";
import Sidebar from "../components/Sidebar";
import { SiSimpleanalytics } from "react-icons/si";


export default function HospitalAdministrator() {
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Hospital Administrator" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex">
        <Sidebar roles={"Hospital Administrator"} feature1={"Analytics Dashboard"} feature2={""} icon1={<SiSimpleanalytics />
        } icon2={""} />
      </div>
    </>
  );
};

