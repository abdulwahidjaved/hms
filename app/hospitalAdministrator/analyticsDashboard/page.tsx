"use client";
import InfoCard from "@/app/components/InfoCard";
import { IoPeopleOutline } from "react-icons/io5";
import { LuBed } from "react-icons/lu";
import { TbActivityHeartbeat } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function AnalyticsDashboard() {

    const performance = [
        { issue: "Cardiology", profit: "Profit: $84,000", revenue: "$830,000" },
        { issue: "Neurology", profit: "Profit: $65,500", revenue: "$710,000" },
        { issue: "Orthopedics", profit: "Profit: $92,300", revenue: "$950,000" },
        { issue: "Pediatrics", profit: "Profit: $48,200", revenue: "$520,000" },
        { issue: "Dermatology", profit: "Profit: $36,900", revenue: "$410,000" },
        { issue: "Oncology", profit: "Profit: $120,000", revenue: "$1,250,000" },
        { issue: "Gynecology", profit: "Profit: $58,750", revenue: "$640,000" },
        { issue: "ENT", profit: "Profit: $41,300", revenue: "$390,000" }
    ];

    const data = [
        { date: "01/11/24", sale: 100 },
        { date: "02/11/24", sale: 120 },
        { date: "03/11/24", sale: 95 },
        { date: "04/11/24", sale: 140 },
        { date: "05/11/24", sale: 160 },
        { date: "06/11/24", sale: 180 },
        { date: "07/11/24", sale: 210 },
        { date: "08/11/24", sale: 195 },
        { date: "09/11/24", sale: 220 },
    ];

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

            <div className="charts flex flex-row gap-5 mt-8">

                <div className="chart1 border-white border p-4 w-full h-87.5 rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sale" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart2 border-white border p-4 w-full h-87.5 rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sale" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>


            <div className="performanceSummary w-full border border-white mt-8 rounded-2xl overflow-hidden p-5">
                <h1 className="font-bold text-2xl">Department Performance Summary</h1>

                <div className="summary mt-5">
                    {performance.map((item, index) => (
                        <div key={index} className="w-full p-4 mt-3 border dark:border-white flex flex-row justify-between items-center rounded-lg">
                            <div className="flex w-full justify-between">

                                <div className="col1 flex flex-col">
                                    <span className="text-xl">{item.issue}</span>
                                    <span>Profit: ${item.profit}</span>
                                </div>

                                <div className="col2 flex flex-col text-right">
                                    <span>${item.revenue}</span>
                                    <span className="text-sm">Revenue</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};