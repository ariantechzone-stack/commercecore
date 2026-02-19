import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-gray-200">
      <p className="text-8xl font-black text-indigo-500 mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-8 text-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg text-sm font-semibold transition"
      >
        ← Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound