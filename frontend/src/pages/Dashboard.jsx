import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const Dashboard = ({ toggleDarkMode, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Check for mobile viewport on mount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsMobileMenuOpen(false);
      }
    };

    // Initialize
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMobileMenu}
        />
      )}
      
      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || !isCollapsed || window.innerWidth >= 768) && (
          <Sidebar 
            isCollapsed={isCollapsed} 
            toggleSidebar={toggleSidebar}
            isMobile={window.innerWidth < 768}
            closeMobileMenu={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={isDarkMode}
          toggleMobileMenu={toggleMobileMenu}
        />
        
        <motion.main 
          className="main-content"
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;