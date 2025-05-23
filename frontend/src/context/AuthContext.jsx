// context/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Add at top
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_SERVICE;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('bookstore_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${AUTH_BASE_URL}auth/register/`, {
        username: name,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Registration failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Something went wrong',
      };
    }
  };
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${AUTH_BASE_URL}auth/login/`, {
        username,
        password,
      });
  
      if (response.data && response.data.access) {
        // Decode token to extract user_id
        const decoded = jwtDecode(response.data.access);
        const userData = {
          username,
          user_id: decoded.user_id, // 👈 pulled from JWT payload
        };
  
        Cookies.set('access_token', response.data.access, { expires: 7 });
        Cookies.set('refresh_token', response.data.refresh, { expires: 7 });
        localStorage.setItem('bookstore_user', JSON.stringify(userData));
        setCurrentUser(userData);
  
        return { success: true };
      } else {
        return { success: false, error: 'Invalid response from server' };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials',
      };
    }
  };
  
    

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bookstore_user');
    navigate('/login');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
