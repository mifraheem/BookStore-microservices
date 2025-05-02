import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderCard from '../../components/common/OrderCard';
import { useAuth } from '../../context/AuthContext';
import allOrders from '../../data/orders';

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch user's orders
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      // In a real app, filter by userId from the API
      // For now, we'll assume the currentUser is user with id: 1
      const userOrders = allOrders.filter(order => order.userId === 1);
      
      // Apply status filter if needed
      let filteredOrders = userOrders;
      if (filter !== 'all') {
        filteredOrders = userOrders.filter(order => 
          order.status.toLowerCase() === filter.toLowerCase()
        );
      }
      
      // Sort by date (newest first)
      filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setOrders(filteredOrders);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentUser, filter]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Count orders by status
  const getStatusCounts = () => {
    // Use allOrders filtered by current user
    const userOrders = allOrders.filter(order => order.userId === 1);
    
    const statusCounts = {
      all: userOrders.length,
      delivered: userOrders.filter(o => o.status.toLowerCase() === 'delivered').length,
      shipped: userOrders.filter(o => o.status.toLowerCase() === 'shipped').length,
      processing: userOrders.filter(o => o.status.toLowerCase() === 'processing').length
    };
    
    return statusCounts;
  };

  const statusCounts = getStatusCounts();

  // Animation variants for list
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <p>Track and view your order history</p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="form-group" 
          style={{ minWidth: '200px', marginTop: '16px' }}
        >
          <select
            value={filter}
            onChange={handleFilterChange}
            className="form-control"
          >
            <option value="all">All Orders ({statusCounts.all})</option>
            <option value="delivered">Delivered ({statusCounts.delivered})</option>
            <option value="shipped">Shipped ({statusCounts.shipped})</option>
            <option value="processing">Processing ({statusCounts.processing})</option>
          </select>
        </motion.div>
      </div>
      
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p>Loading orders...</p>
        </motion.div>
      ) : orders.length > 0 ? (
        <motion.div 
          className="order-list"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p>No orders found with the selected filter.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Orders;