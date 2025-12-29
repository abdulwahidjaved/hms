import { ReactNode } from "react";
import { IoGitMerge } from "react-icons/io5";

type MenuItem = {
    label: string;
    icon: ReactNode;
    value: string;
};

type SidebarProps = {
    roles: string;
    menu: MenuItem[];
    onSelect: (value: string) => void;
};

export default function Sidebar({ roles, menu, onSelect }: SidebarProps) {
    return (
        <>
            <div className="sidebar w-[25vw] h-screen shadow-2xl dark:shadow-white p-3 overflow-hidden">
                <h1 className="font-bold text-2xl">Hospital Dashboard</h1>
                <h1>{roles}</h1>

                <div className="work mt-10">
                    {menu.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => onSelect(item.value)}
                            className="flex gap-2 text-lg hover:bg-gray-500 transition-all rounded-lg duration-100 cursor-pointer p-2 w-full items-center">
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};