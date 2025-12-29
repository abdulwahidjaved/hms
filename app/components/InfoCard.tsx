import { ReactNode } from "react";

type InfoCardProps = {
    title : string
    number : string;
    subTitle : string;
    icon : ReactNode;

};

export default function InofCard({ title, icon, number, subTitle} : InfoCardProps) {
    return(
        <>
        <div className="inofCard dark:border-black dark:shadow-white shadow-md hover:shadow-lg hover:transition-transform hover:-translate-y-3 p-5 w-full transition-all duration-300 rounded-2xl">

        <div className="flex items-center justify-between">
            <span>{title}</span>
            {icon}
        </div>

        <div className="number mt-3">
            <span className="font-bold text-3xl">{number}</span>
        </div>

        <div className="subTitle text-sm mt-2">
            <span>{subTitle}</span>
        </div>
        </div>
        </>
    );
};