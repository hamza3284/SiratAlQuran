import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../services/auth';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";

  useEffect(() => {
    if (token) {
      setAuthToken(token); // Set the token in the API instance
      setLoading(true);
      getCurrentUser(token)
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setAuthToken(null); // Clear the token if not present
      setLoading(false);
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setAuthToken(token); // Set token immediately on login
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    if (token) await logoutUser(token);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
