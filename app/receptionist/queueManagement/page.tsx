import InfoCard from "@/app/components/InfoCard";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdPeopleOutline } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function QueueManagement() {
    return (
        <>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                <InfoCard title={"Total in Queue"} number={"10"} subTitle={"Active patients"} icon={<MdPeopleOutline />

                } />

                <InfoCard title={"Waiting"} number={"3"} subTitle={"Awaiting treatment"} icon={<CiClock2 />
                } />

                <InfoCard title={"In Treatment"} number={"4"} subTitle={"Being treated"} icon={<HiOutlineClipboardList />
                } />

            </div>
        </>
    );
};