import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobile, closeMobileMenu }) => {
  const { currentUser, logout } = useAuth();

  const handleNavClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  // Navigation items with icons
  const navItems = [
    {
      to: '/products',
      label: 'Books',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      to: '/orders',
      label: 'Orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      to: '/add-book',
      label: 'Add Book',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      className={`sidebar ${isCollapsed && !isMobile ? 'sidebar-collapse' : ''}`}
      animate={{ width: isCollapsed && !isMobile ? '80px' : '260px' }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        <div className="flex justify-between items-center">
          {!isCollapsed && (
            <div className="sidebar-logo">
              <span>Bookstore</span>
            </div>
          )}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
            onClick={handleNavClick}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.div>
            {(!isCollapsed || isMobile) && <span className="nav-text">{item.label}</span>}
          </NavLink>
        ))}
      </div>
      
      <div className="sidebar-nav" style={{ marginTop: 'auto', marginBottom: '16px' }}>
        <a 
          onClick={(e) => {
            e.preventDefault();
            logout();
          }} 
          href="#"
          className="nav-item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          {(!isCollapsed || isMobile) && <span className="nav-text">Logout</span>}
        </a>
      </div>
    </motion.div>
  );
};

export default Sidebar;