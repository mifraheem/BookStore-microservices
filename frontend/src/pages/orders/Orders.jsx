import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import OrderCard from '../../components/common/OrderCard';
import { useAuth } from '../../context/AuthContext';

const ORDER_BASE_URL = import.meta.env.VITE_ORDER_SERVICE;

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('access_token');
        const response = await axios.get(`${ORDER_BASE_URL}orders/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userOrders = response.data.data.filter(order => order.user_id === currentUser?.user_id);

        setOrders(userOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchOrders();
  }, [currentUser]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return (order.order_status || '').toLowerCase() === filter.toLowerCase();
  });

  const getStatusCounts = () => {
    const statusCounts = {
      all: orders.length,
      delivered: orders.filter(o => o.order_status?.toLowerCase() === 'delivered').length,
      shipped: orders.filter(o => o.order_status?.toLowerCase() === 'shipped').length,
      processing: orders.filter(o => o.order_status?.toLowerCase() === 'processing').length,
      pending: orders.filter(o => o.order_status?.toLowerCase() === 'pending').length,
    };
    return statusCounts;
  };
  

  const statusCounts = getStatusCounts()
  

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      ) : filteredOrders.length > 0 ? (
        <motion.div
          className="order-list"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredOrders.map(order => (
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
