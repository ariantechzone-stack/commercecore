import { useState } from "react"
import { useAuth } from "../context/AuthContext"

function Login() {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-gray-200">
      <form onSubmit={handleSubmit} className="bg-[#1e293b] p-8 rounded-xl w-80 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#0f172a] border border-gray-600"
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#0f172a] border border-gray-600"
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold">
          Sign In
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          E-Mail: admin@commerce.com / Pass: 1234
        </p>
      </form>
    </div>
  )
}

export default Login
