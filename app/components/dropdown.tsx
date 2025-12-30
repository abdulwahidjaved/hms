"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Dropdown() {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname() || "/doctor";
    // derive label from first segment
    const segment = pathname.split("/")[1] || "doctor";
    const map: Record<string, string> = {
        doctor: "Doctor",
        receptionist: "Receptionist",
        inventoryManager: "Inventory Manager",
        hospitalAdministrator: "Hospital Administrator",
    };
    const pageName = map[segment] ?? "Doctor";

    // close when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    return (
        <div ref={containerRef} className="dropdown relative w-fit">
            <div className="contentsOfAll flex items-center gap-5">
                <h1 className="text-base font-medium text-gray-700">Current Role:</h1>
                <button
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls="role-menu"
                    className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-2 text-base bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => setOpen((s) => !s)}
                >
                    {pageName}
                    <FaAngleDown className={` transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
            </div>

            <div
                id="role-menu"
                role="menu"
                className={`absolute left-0 mt-2 w-56 bg-white dark:bg-black border border-gray-100 rounded-md z-50 shadow-xl ring-1 ring-black/5 transform origin-top-left transition-all duration-150
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
                <Link href="/doctor" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>
                    Doctor
                </Link>
                <Link href="/receptionist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>
                    Receptionist
                </Link>
                <Link href="/inventoryManager" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>
                    Inventory Manager
                </Link>
                <Link href="/hospitalAdministrator" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>
                    Hospital Administrator
                </Link>
            </div>
        </div>
    );
}