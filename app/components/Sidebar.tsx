import { ReactNode } from "react";

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
        <aside className="sidebar w-64 bg-gradient-to-b from-blue-900 to-teal-500 min-h-screen p-6 shadow-xl">
            <div className="mb-8">
                <h1 className="font-bold text-2xl text-white tracking-tight">Hospital Dashboard</h1>
                <p className="text-sm text-blue-100 mt-2 font-medium">{roles}</p>
            </div>

            <nav className="work mt-6 space-y-1">
                {menu.map((item) => {
                    const isActive = active === item.value;
                    return (
                        <button
                            key={item.value}
                            onClick={() => onSelect(item.value)}
                            className={`flex gap-3 items-center w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-white text-blue-700 shadow-lg scale-105 font-semibold' 
                                    : 'text-blue-50 hover:bg-blue-500/40 hover:scale-[1.02] hover:shadow-md'
                            }`}>
                            <span className={`w-5 h-5 flex items-center justify-center ${isActive ? 'text-blue-600' : ''}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};