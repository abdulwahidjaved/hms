"use client";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

type DropdownProps = {
    pageName: string;
};
export default function Dropdown({ pageName }: DropdownProps) {

    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="dropdown relative w-fit">

                <div className="contentsOfAll flex items-center gap-5 ">
                    <h1 className="font-bold text-xl">Current Role: </h1>
                    <button className="flex items-center gap-20 border-2 border-white text-lg px-2 cursor-pointer" onClick={() => { setOpen(!open) }}>{pageName}<FaAngleDown className={` transition-transform duration-300 ${open ? "rotate-180" : ""}`} /></button>
                </div>

                <div
                    className={`absolute left-37 mt-2 w-56 bg-white dark:bg-black border shadow-lg transition-all duration-300
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                >
                    <Link href="/doctor" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        Doctor
                    </Link>
                    <Link href="/receptionist" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        Receptionist
                    </Link>
                    <Link href="/inventoryManager" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        Inventory Manager
                    </Link>
                    <Link href="/hospitalAdministrator" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        Hospital Administrator
                    </Link>
                </div>
            </div>
        </>
    );
}