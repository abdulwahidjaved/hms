import InfoCard from "@/app/components/InfoCard";
import { IoPeopleOutline } from "react-icons/io5";
import { LuBed } from "react-icons/lu";
import { TbActivityHeartbeat } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";

export default function AnalyticsDashboard() {
  const departments = [
    { name: "Cardiology", revenue: "$830K", profit: "$84,000", revWidth: "75%", expWidth: "25%" },
    { name: "Emergency", revenue: "$920K", profit: "$210,000", revWidth: "80%", expWidth: "20%" },
    { name: "Neurology", revenue: "$225K", profit: "$72,000", revWidth: "20%", expWidth: "10%" },
    { name: "Oncology", revenue: "$1060K", profit: "$250,000", revWidth: "90%", expWidth: "30%" },
    { name: "Pediatrics", revenue: "$193K", profit: "$62,000", revWidth: "15%", expWidth: "8%" },
  ];

  const outcomes = [
    { date: "Dec 21", m: 0, r: 0, avg: "2.0d" },
    { date: "Dec 22", m: 0, r: 0, avg: "2.0d" },
    { date: "Dec 23", m: 0, r: 0, avg: "2.0d" },
    { date: "Dec 25", m: 0, r: 1, avg: "1.0d" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Info Cards */}
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard title="Staff to Patient Ratio" number="2.9:1" subTitle="Patients per doctor" icon={<IoPeopleOutline />} />
        <InfoCard title="Bed Occupancy" number="20.0%" subTitle="Current capacity" icon={<LuBed />} />
        <InfoCard title="Active Patients" number="20" subTitle="Currently admitted" icon={<TbActivityHeartbeat />} />
        <InfoCard title="Total Revenue" number="$5583K" subTitle="Selected period" icon={<BsGraphUpArrow />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Department Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-bold mb-6">Revenue by Department</h3>
          <div className="space-y-6">
            {departments.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{dept.name}</span>
                  <span className="font-semibold text-gray-400">{dept.revenue}</span>
                </div>
                <div className="flex h-8 w-full gap-1">
                  <div style={{ width: dept.revWidth }} className="bg-blue-500 rounded-sm"></div>
                  <div style={{ width: dept.expWidth }} className="bg-red-400 rounded-sm"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Revenue</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded-full"></div> Expenses</div>
          </div>
        </div>

        {/* Patient Outcomes Trend */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-bold mb-4">Patient Outcomes Trend</h3>
          <div className="grid grid-cols-3 gap-2 mb-6 text-center">
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="text-2xl font-bold text-red-600">0</p>
              <p className="text-[10px] text-gray-500 uppercase">Total Mortality</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="text-2xl font-bold text-blue-600">1</p>
              <p className="text-[10px] text-gray-500 uppercase">Readmissions</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="text-2xl font-bold text-blue-400">1.8</p>
              <p className="text-[10px] text-gray-500 uppercase">Avg Stay (days)</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-500">Recent Outcomes</p>
            {outcomes.map((row) => (
              <div key={row.date} className="flex justify-between items-center text-xs py-2 border-b last:border-0">
                <span className="text-gray-400">{row.date}</span>
                <div className="flex gap-4">
                  <span className="text-red-500">M: {row.m}</span>
                  <span className="text-red-500">R: {row.r}</span>
                  <span className="text-blue-400 font-medium">Avg: {row.avg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance Summary List */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-bold mb-6">Department Performance Summary</h3>
        <div className="space-y-2">
          {departments.map((dept) => (
            <div key={dept.name} className="flex justify-between items-center p-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-800">{dept.name}</p>
                <p className="text-xs text-gray-400">Profit: {dept.profit}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{dept.revenue}</p>
                <p className="text-[10px] text-gray-400 uppercase">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}