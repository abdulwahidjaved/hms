import Dropdown from "../components/dropdown";
import Sidebar from "../components/Sidebar";
import { FaStethoscope } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";

export default function Doctor() {
  return (
    <>
      <div className="p-6">
        <Dropdown pageName="Doctor" />
      </div>

      <div className="sidebar border-t-2 dark:border-white mt-6 flex">
        <Sidebar roles={"Doctor"} feature1={"Diagnoses"} feature2={"Pateint Records"} icon1={<FaStethoscope />} icon2={<MdPeopleAlt />} />
      </div>
    </>
  );
}
