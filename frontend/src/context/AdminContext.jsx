import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '../services/api'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authApi.login(credentials)
      const t = res.data.token
      localStorage.setItem('admin_token', t)
      setToken(t)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }, [])

  return (
    <AdminContext.Provider value={{ token, isAuthenticated: !!token, login, logout, loading, error }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
