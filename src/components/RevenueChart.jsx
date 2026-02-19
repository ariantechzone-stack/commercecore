import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import { salesData } from "../data/mockData"

function RevenueChart() {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-md mt-8">
      <h3 className="text-lg font-semibold mb-6">
        Monthly Revenue
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "8px"
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#6366f1" 
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
