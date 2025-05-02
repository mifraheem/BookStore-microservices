import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OrderCard.css'; // Custom styles

const OrderCard = ({ order }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dateString ? new Date(dateString).toLocaleDateString(undefined, options) : 'N/A';
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return 'badge default';
    switch (status.toLowerCase()) {
      case 'delivered': return 'badge delivered';
      case 'shipped': return 'badge shipped';
      case 'processing': return 'badge processing';
      case 'pending': return 'badge pending';
      default: return 'badge default';
    }
  };

  return (
    <motion.div
      className="order-card-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="order-card-header">
        <div>
          <h3>Order #{order.id}</h3>
          <p className="customer-name">Customer: {order.customer_name}</p>
        </div>
        <span className={getStatusBadgeClass(order.order_status)}>
          {order.order_status || 'Unknown'}
        </span>
      </div>

      <div className="order-card-details">
        <div>
          <label>Product ID</label>
          <p>{order.product_id}</p>
        </div>
        <div>
          <label>Quantity</label>
          <p>{order.quantity}</p>
        </div>
        <div>
          <label>Order Date</label>
          <p>{formatDate(order.date)}</p>
        </div>
      </div>

      <div className="order-card-footer">
        <Link to={`/orders/${order.id}`}>View Details →</Link>
      </div>
    </motion.div>
  );
};

export default OrderCard;
