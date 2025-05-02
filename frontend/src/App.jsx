import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Products from './pages/catalog/Products'
import BookDetail from './pages/catalog/BookDetail'
import AddBook from './pages/catalog/AddBook'
import Orders from './pages/orders/Orders'
import OrderDetail from './pages/orders/OrderDetail'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './styles/App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/products" replace />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<BookDetail />} />
                <Route path="add-book" element={<AddBook />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<OrderDetail />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App