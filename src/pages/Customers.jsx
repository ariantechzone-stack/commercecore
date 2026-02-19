import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const initialCustomers = [
  { id: "CUST-001", name: "Alice Johnson", email: "alice@example.com", phone: "+1 555-0101", location: "New York, US", joined: "2024-03-12", orders: 8, totalSpent: 1240.50, status: "Active" },
  { id: "CUST-002", name: "Bob Smith", email: "bob@example.com", phone: "+1 555-0102", location: "Los Angeles, US", joined: "2024-05-20", orders: 3, totalSpent: 320.00, status: "Active" },
  { id: "CUST-003", name: "Carol White", email: "carol@example.com", phone: "+44 7700-900103", location: "London, UK", joined: "2024-01-08", orders: 15, totalSpent: 4890.75, status: "VIP" },
  { id: "CUST-004", name: "David Brown", email: "david@example.com", phone: "+1 555-0104", location: "Chicago, US", joined: "2024-07-30", orders: 1, totalSpent: 55.00, status: "Inactive" },
  { id: "CUST-005", name: "Eva Green", email: "eva@example.com", phone: "+33 6 12 34 56 78", location: "Paris, FR", joined: "2024-02-14", orders: 11, totalSpent: 2750.20, status: "VIP" },
  { id: "CUST-006", name: "Frank Lee", email: "frank@example.com", phone: "+1 555-0106", location: "Houston, US", joined: "2024-09-01", orders: 4, totalSpent: 410.00, status: "Active" },
  { id: "CUST-007", name: "Grace Kim", email: "grace@example.com", phone: "+82 10-1234-5678", location: "Seoul, KR", joined: "2024-04-22", orders: 7, totalSpent: 980.50, status: "Active" },
  { id: "CUST-008", name: "Henry Zhang", email: "henry@example.com", phone: "+86 138 0013 8000", location: "Shanghai, CN", joined: "2024-06-17", orders: 2, totalSpent: 130.00, status: "Inactive" },
  { id: "CUST-009", name: "Isla Torres", email: "isla@example.com", phone: "+34 612 345 678", location: "Madrid, ES", joined: "2024-08-05", orders: 6, totalSpent: 870.40, status: "Active" },
  { id: "CUST-010", name: "Jake Park", email: "jake@example.com", phone: "+1 555-0110", location: "Seattle, US", joined: "2024-11-03", orders: 1, totalSpent: 88.00, status: "Inactive" },
  { id: "CUST-011", name: "Karen Liu", email: "karen@example.com", phone: "+1 555-0111", location: "San Francisco, US", joined: "2023-12-01", orders: 22, totalSpent: 6120.00, status: "VIP" },
  { id: "CUST-012", name: "Liam Carter", email: "liam@example.com", phone: "+61 4 1234 5678", location: "Sydney, AU", joined: "2024-10-19", orders: 3, totalSpent: 215.80, status: "Active" },
]

const STATUS_OPTIONS = ["All", "Active", "VIP", "Inactive"]

const statusStyles = {
  Active:   "bg-green-500/20 text-green-400 border border-green-500/30",
  VIP:      "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Inactive: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
}

const ITEMS_PER_PAGE = 8

function Avatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const colors = [
    "bg-indigo-500", "bg-pink-500", "bg-emerald-500",
    "bg-amber-500", "bg-cyan-500", "bg-rose-500",
    "bg-violet-500", "bg-teal-500",
  ]
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={`${color} w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  )
}

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortField, setSortField] = useState("joined")
  const [sortDir, setSortDir] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", location: "" })
  const [formError, setFormError] = useState("")

  // Filter
  let filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  // Sort
  filtered.sort((a, b) => {
    let valA = a[sortField]
    let valB = b[sortField]
    if (sortField === "totalSpent" || sortField === "orders") {
      valA = Number(valA)
      valB = Number(valB)
    }
    if (valA < valB) return sortDir === "asc" ? -1 : 1
    if (valA > valB) return sortDir === "asc" ? 1 : -1
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("asc")
    }
    setCurrentPage(1)
  }

  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(customers.map((c) => c.id === customerId ? { ...c, status: newStatus } : c))
    if (selectedCustomer?.id === customerId) {
      setSelectedCustomer((prev) => ({ ...prev, status: newStatus }))
    }
  }

  const handleDelete = (customerId) => {
    setCustomers(customers.filter((c) => c.id !== customerId))
    if (selectedCustomer?.id === customerId) setSelectedCustomer(null)
  }

  const handleAddCustomer = (e) => {
    e.preventDefault()
    if (!newCustomer.name || !newCustomer.email) {
      setFormError("Name and email are required.")
      return
    }
    const customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, "0")}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone || "—",
      location: newCustomer.location || "—",
      joined: new Date().toISOString().split("T")[0],
      orders: 0,
      totalSpent: 0,
      status: "Active",
    }
    setCustomers([customer, ...customers])
    setNewCustomer({ name: "", email: "", phone: "", location: "" })
    setFormError("")
    setIsAddModalOpen(false)
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-600 ml-1">↕</span>
    return <span className="text-indigo-400 ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
  }

  // Summary stats
  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const vipCount = customers.filter((c) => c.status === "VIP").length
  const activeCount = customers.filter((c) => c.status === "Active").length

  return (
    <div className="flex bg-[#0f172a] min-h-screen text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold">Customers</h2>
              <p className="text-gray-400 mt-1">Manage your customer base and relationships.</p>
            </div>
            <button
              onClick={() => { setIsAddModalOpen(true); setFormError("") }}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              + Add Customer
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Total Customers</p>
              <p className="text-2xl font-bold">{customers.length}</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Lifetime Revenue</p>
              <p className="text-2xl font-bold">${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Active</p>
              <p className="text-2xl font-bold text-green-400">{activeCount}</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">VIP</p>
              <p className="text-2xl font-bold text-purple-400">{vipCount}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Search by name, email, location..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              className="flex-1 min-w-[220px] p-2 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <div className="flex gap-2 flex-wrap">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === s
                      ? "bg-indigo-600 text-white"
                      : "bg-[#1e293b] text-gray-400 hover:bg-[#334155]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0f172a] text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("name")}>
                    Customer <SortIcon field="name" />
                  </th>
                  <th className="px-4 py-3 hidden lg:table-cell">Location</th>
                  <th className="px-4 py-3 cursor-pointer hover:text-white hidden md:table-cell" onClick={() => handleSort("joined")}>
                    Joined <SortIcon field="joined" />
                  </th>
                  <th className="px-4 py-3 cursor-pointer hover:text-white hidden sm:table-cell" onClick={() => handleSort("orders")}>
                    Orders <SortIcon field="orders" />
                  </th>
                  <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("totalSpent")}>
                    Spent <SortIcon field="totalSpent" />
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((customer) => (
                  <tr key={customer.id} className="border-t border-gray-700/50 hover:bg-[#0f172a]/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={customer.name} />
                        <div>
                          <div className="font-medium text-white">{customer.name}</div>
                          <div className="text-gray-500 text-xs">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{customer.location}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{customer.joined}</td>
                    <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">{customer.orders}</td>
                    <td className="px-4 py-3 font-semibold">${customer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[customer.status]}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-xs bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded hover:bg-indigo-600/40 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-1 rounded hover:bg-red-600/40 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-10 text-center text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-[#1e293b] text-gray-400 hover:bg-[#334155] disabled:opacity-40"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-[#1e293b] text-gray-400 hover:bg-[#334155]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-[#1e293b] text-gray-400 hover:bg-[#334155] disabled:opacity-40"
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="bg-[#1e293b] rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Avatar name={selectedCustomer.name} />
                <div>
                  <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedCustomer.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ["Email", selectedCustomer.email],
                ["Phone", selectedCustomer.phone],
                ["Location", selectedCustomer.location],
                ["Member Since", selectedCustomer.joined],
                ["Total Orders", selectedCustomer.orders],
                ["Total Spent", `$${selectedCustomer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[selectedCustomer.status]}`}>
                  {selectedCustomer.status}
                </span>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Update Status</p>
              <div className="flex gap-2">
                {["Active", "VIP", "Inactive"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selectedCustomer.id, s)}
                    disabled={selectedCustomer.status === s}
                    className={`flex-1 py-1.5 rounded text-xs font-medium transition ${
                      selectedCustomer.status === s
                        ? "opacity-40 cursor-not-allowed bg-gray-700 text-gray-400"
                        : s === "VIP"
                        ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/40"
                        : s === "Inactive"
                        ? "bg-gray-600/20 text-gray-400 border border-gray-500/30 hover:bg-gray-600/40"
                        : "bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-[#1e293b] rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Customer</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email *</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Phone</label>
                <input
                  type="text"
                  placeholder="+1 555-0100"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Location</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={newCustomer.location}
                  onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {formError && <p className="text-red-400 text-xs">{formError}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customers