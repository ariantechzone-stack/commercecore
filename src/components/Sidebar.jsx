import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/products", label: "Products", icon: "⬡" },
  { to: "/orders", label: "Orders", icon: "◈" },
  { to: "/customers", label: "Customers", icon: "◉" },
]

function Sidebar() {
  const { logout } = useAuth()

  return (
    <div className="w-64 bg-[#1e293b] min-h-screen p-6 flex flex-col justify-between">

      <div>
        <h2 className="text-2xl font-bold mb-10 text-indigo-500">
          CommerceCore
        </h2>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center justify-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 p-2.5 rounded-lg text-sm font-medium transition mt-10"
      >
        ⎋ Logout
      </button>

    </div>
  )
}

export default Sidebar