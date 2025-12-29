import InfoCard from "@/app/components/InfoCard";
import { IoPeopleOutline } from "react-icons/io5";
import { LuBed } from "react-icons/lu";
import { TbActivityHeartbeat } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";


export default function AnalyticsDashboard() {
    return (
        <>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Staff to Patient Ratio"} number={"2.9:1"} subTitle={"Patients per doctor"} icon={<IoPeopleOutline />
                } />

                <InfoCard title={"Bed Occupancy"} number={"20.0%"} subTitle={"Current capacity"} icon={<LuBed />
                } />

                <InfoCard title={"Active Patients"} number={"20"} subTitle={"Currently admitted"} icon={<TbActivityHeartbeat />
                } />

                <InfoCard title={"Total Revenue"} number={"$5583K"} subTitle={"Selected period"} icon={<BsGraphUpArrow />
                } />
            </div>
        </>
    );
};