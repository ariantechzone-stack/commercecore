import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const initialOrders = [
  { id: "ORD-1001", customer: "Alice Johnson", email: "alice@example.com", date: "2025-01-15", total: 149.99, status: "Delivered", items: 2 },
  { id: "ORD-1002", customer: "Bob Smith", email: "bob@example.com", date: "2025-01-18", total: 89.50, status: "Processing", items: 1 },
  { id: "ORD-1003", customer: "Carol White", email: "carol@example.com", date: "2025-01-20", total: 320.00, status: "Shipped", items: 4 },
  { id: "ORD-1004", customer: "David Brown", email: "david@example.com", date: "2025-01-22", total: 55.00, status: "Cancelled", items: 1 },
  { id: "ORD-1005", customer: "Eva Green", email: "eva@example.com", date: "2025-01-25", total: 210.75, status: "Delivered", items: 3 },
  { id: "ORD-1006", customer: "Frank Lee", email: "frank@example.com", date: "2025-02-01", total: 99.99, status: "Processing", items: 2 },
  { id: "ORD-1007", customer: "Grace Kim", email: "grace@example.com", date: "2025-02-03", total: 450.00, status: "Shipped", items: 5 },
  { id: "ORD-1008", customer: "Henry Zhang", email: "henry@example.com", date: "2025-02-05", total: 33.00, status: "Delivered", items: 1 },
  { id: "ORD-1009", customer: "Isla Torres", email: "isla@example.com", date: "2025-02-07", total: 175.20, status: "Processing", items: 2 },
  { id: "ORD-1010", customer: "Jake Park", email: "jake@example.com", date: "2025-02-10", total: 88.00, status: "Cancelled", items: 1 },
  { id: "ORD-1011", customer: "Karen Liu", email: "karen@example.com", date: "2025-02-12", total: 500.00, status: "Shipped", items: 6 },
  { id: "ORD-1012", customer: "Liam Carter", email: "liam@example.com", date: "2025-02-14", total: 62.40, status: "Delivered", items: 1 },
]

const STATUS_OPTIONS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"]

const statusStyles = {
  Processing: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Shipped:    "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Delivered:  "bg-green-500/20 text-green-400 border border-green-500/30",
  Cancelled:  "bg-red-500/20 text-red-400 border border-red-500/30",
}

const STATUS_FLOW = ["Processing", "Shipped", "Delivered"]

const ITEMS_PER_PAGE = 8

function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortField, setSortField] = useState("date")
  const [sortDir, setSortDir] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Filter
  let filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || o.status === statusFilter
    return matchSearch && matchStatus
  })

  // Sort
  filtered.sort((a, b) => {
    let valA = a[sortField]
    let valB = b[sortField]
    if (sortField === "total") {
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
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }))
    }
  }

  const handleDelete = (orderId) => {
    setOrders(orders.filter((o) => o.id !== orderId))
    if (selectedOrder?.id === orderId) setSelectedOrder(null)
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-600 ml-1">↕</span>
    return <span className="text-indigo-400 ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
  }

  // Summary stats
  const totalRevenue = orders.reduce((sum, o) => o.status !== "Cancelled" ? sum + o.total : sum, 0)
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex bg-[#0f172a] min-h-screen text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Orders</h2>
            <p className="text-gray-400 mt-1">Manage and track all customer orders.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Processing</p>
              <p className="text-2xl font-bold text-yellow-400">{statusCounts["Processing"] || 0}</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-red-400">{statusCounts["Cancelled"] || 0}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Search by order ID, customer, email..."
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
                  <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("id")}>
                    Order ID <SortIcon field="id" />
                  </th>
                  <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("customer")}>
                    Customer <SortIcon field="customer" />
                  </th>
                  <th className="px-4 py-3 cursor-pointer hover:text-white hidden md:table-cell" onClick={() => handleSort("date")}>
                    Date <SortIcon field="date" />
                  </th>
                  <th className="px-4 py-3 hidden sm:table-cell">Items</th>
                  <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort("total")}>
                    Total <SortIcon field="total" />
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((order) => (
                  <tr key={order.id} className="border-t border-gray-700/50 hover:bg-[#0f172a]/50 transition">
                    <td className="px-4 py-3 font-mono text-indigo-400 font-medium">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{order.customer}</div>
                      <div className="text-gray-500 text-xs">{order.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{order.date}</td>
                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{order.items}</td>
                    <td className="px-4 py-3 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-xs bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded hover:bg-indigo-600/40 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
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
                      No orders found.
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-[#1e293b] rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold font-mono text-indigo-400">{selectedOrder.id}</h3>
                <p className="text-gray-400 text-sm mt-1">{selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Customer</span>
                <span className="font-medium">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email</span>
                <span className="text-sm">{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Items</span>
                <span>{selectedOrder.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="font-bold text-lg">${selectedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Status update buttons */}
            {selectedOrder.status !== "Cancelled" && (
              <div>
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_FLOW.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedOrder.id, s)}
                      disabled={selectedOrder.status === s}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        selectedOrder.status === s
                          ? "opacity-40 cursor-not-allowed bg-gray-700 text-gray-400"
                          : "bg-[#0f172a] border border-gray-600 hover:border-indigo-500 text-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, "Cancelled")}
                    className="px-3 py-1 rounded text-xs font-medium bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/40 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders