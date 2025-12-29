import { ReactNode } from "react";

type SidebarProps = {
    roles: string;
    feature1: string;
    feature2: string;
    icon1: ReactNode;
    icon2: ReactNode;
};
export default function Sidebar({ roles, feature1, feature2, icon1, icon2 }: SidebarProps) {
    return (
        <>
            <div className="sidebar w-[25vw] h-screen shadow-2xl dark:shadow-white p-3">
                <h1 className="font-bold text-2xl">Hospital Dashboard</h1>
                <h1>{roles}</h1>

                <div className="work mt-10">
                    <button className="flex gap-2 text-lg hover:bg-gray-500 transition-all rounded-lg duration-100 cursor-pointer p-2 w-full items-center">{icon1}<span>{feature1}</span></button>
                    <button className="flex gap-2 text-lg hover:bg-gray-500 transition-all rounded-lg duration-100 cursor-pointer p-2 w-full items-center">{icon2}<span>{feature2}</span></button>
                </div>
            </div>
        </>
    );
};