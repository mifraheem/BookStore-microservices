import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderCard = ({ order }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'badge-success';
      case 'shipped':
        return 'badge-warning';
      case 'processing':
        return 'badge-error';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/orders/${order.id}`} className="order-card">
        <div className="order-header">
          <span className="order-id">{order.id}</span>
          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="order-info">
          <div className="info-item">
            <span className="info-label">Date</span>
            <span className="info-value">{formatDate(order.date)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Items</span>
            <span className="info-value">{order.items.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total</span>
            <span className="info-value">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default OrderCard;