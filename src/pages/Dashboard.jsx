import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatsCard from "../components/StatsCard"
import RevenueChart from "../components/RevenueChart"

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-gray-200">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-8">

          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Dashboard Overview
            </h2>
            <p className="text-gray-400 mt-2">
              Monitor your store performance and analytics in real time.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatsCard 
              title="Total Revenue"
              value="$24,500"
              change={12}
            />

            <StatsCard 
              title="Total Orders"
              value="1,230"
              change={8}
            />

            <StatsCard 
              title="New Customers"
              value="320"
              change={15}
            />

            <StatsCard 
              title="Refund Rate"
              value="2.4%"
              change={-3}
            />
            
<RevenueChart />

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard
