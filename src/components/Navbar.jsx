import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { user } = useAuth()

  return (
    <div className="bg-[#1e293b] p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <span className="text-gray-400">{user?.email}</span>
    </div>
  )
}

export default Navbar
