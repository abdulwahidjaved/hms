import InfoCard from "@/app/components/InfoCard";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";


export default function InventoryDashboard() {
    return (
        <>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Total Items"} number={"30"} subTitle={"In inventory"} icon={<LuBox />
                } />

                <InfoCard title={"Total Value"} number={"$39326.00"} subTitle={"Stock value"} icon={<BsCurrencyDollar />
                } />

                <InfoCard title={"Low Stock"} number={"0"} subTitle={"Below minimum"} icon={<IoWarningOutline />
                } />

                <InfoCard title={"Expiring Soon"} number={"1"} subTitle={"Within 30 days"} icon={<MdOutlineCalendarToday />
                } />
            </div>
        </>
    );
};