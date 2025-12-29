import InfoCard from "@/app/components/InfoCard";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Diagnoses() {
    return (
        <>
            {/* <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Pending"} number={"4"} subTitle={"Awaiting schedule"} icon={<AiOutlineExclamationCircle />
                } />

                <InfoCard title={"Scheduled"} number={"4"} subTitle={"Appointments set"} icon={<IoCalendarClearOutline />
                } />

                <InfoCard title={"In Progress"} number={"3"} subTitle={"Active diagnoses"} icon={<CiClock2 />
                } />

                <InfoCard title={"Completed"} number={"9"} subTitle={"Locked records"} icon={<IoMdCheckmarkCircleOutline />
                } />
            </div>
            <div className="infos"></div> */}
            <div>This Diagnoses Page</div>
        </>
    );
};