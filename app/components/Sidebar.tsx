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
    active?: string;
};

export default function Sidebar({ roles, menu, onSelect, active }: SidebarProps) {
    return (
        <>
            <aside className="sidebar w-80 bg-blue-50 min-h-screen p-6">
                <div className="mb-6">
                    <h1 className="font-bold text-2xl">Hospital Dashboard</h1>
                    <p className="text-sm text-blue-700 mt-1">{roles}</p>
                </div>

                <nav className="work mt-4 space-y-2">
                    {menu.map((item) => {
                        const isActive = active === item.value;
                        return (
                            <button
                                key={item.value}
                                onClick={() => onSelect(item.value)}
                                className={`flex gap-3 items-center w-full text-left px-3 py-3 rounded-lg transition-colors duration-150 ${isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:bg-white/60'}`}>
                                <span className="w-6 h-6 text-blue-600 flex items-center justify-center">
                                    {item.icon}
                                </span>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};