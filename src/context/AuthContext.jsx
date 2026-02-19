import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("commerceUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email, password) => {
    // simple mock validation
    if (email === "admin@commerce.com" && password === "1234") {
      const userData = { email, role: "admin" }
      setUser(userData)
      localStorage.setItem("commerceUser", JSON.stringify(userData))
      navigate("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("commerceUser")
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
