import { motion } from "framer-motion"

function StatsCard({ title, value, change }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#1e293b] p-6 rounded-xl shadow-md"
    >
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <span className={`text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
        {change >= 0 ? "+" : ""}
        {change}%
      </span>
    </motion.div>
  )
}

export default StatsCard
