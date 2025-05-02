import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import allOrders from '../../data/orders';
import allBooks from '../../data/books';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Fetch order details
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      try {
        // Find order by id
        const foundOrder = allOrders.find(o => o.id === id);
        
        if (foundOrder) {
          setOrder(foundOrder);
          
          // Get book details for order items
          const itemsWithDetails = foundOrder.items.map(item => {
            const book = allBooks.find(b => b.id === item.bookId);
            return {
              ...item,
              book
            };
          });
          
          setOrderItems(itemsWithDetails);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Failed to load order details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

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

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="error-message">{error}</p>
        <button 
          className="button button-primary mt-4"
          onClick={() => navigate('/orders')}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        className="button mb-6"
        onClick={() => navigate('/orders')}
      >
        &larr; Back to Orders
      </button>
      
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2>Order {order.id}</h2>
          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="mb-2">Order Details</h3>
            <p><strong>Date:</strong> {formatDate(order.date)}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            {order.trackingNumber && (
              <p><strong>Tracking #:</strong> {order.trackingNumber}</p>
            )}
          </div>
          
          <div>
            <h3 className="mb-2">Shipping Address</h3>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
          
          <div>
            <h3 className="mb-2">Order Summary</h3>
            <p><strong>Items:</strong> {order.items.length}</p>
            <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="mb-4">Order Items</h3>
        
        <div className="overflow-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>Item</th>
                <th style={{ textAlign: 'center', padding: '12px 8px' }}>Quantity</th>
                <th style={{ textAlign: 'right', padding: '12px 8px' }}>Price</th>
                <th style={{ textAlign: 'right', padding: '12px 8px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ borderBottom: '1px solid var(--color-neutral-200)' }}
                >
                  <td style={{ padding: '16px 8px' }}>
                    <div className="flex items-center">
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--color-neutral-200)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 'var(--radius-md)',
                          marginRight: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {item.book?.title.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight: '500' }}>{item.book?.title}</p>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-500)' }}>{item.book?.author}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '16px 8px' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right', padding: '16px 8px' }}>${item.price.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', padding: '16px 8px', fontWeight: '500' }}>${(item.price * item.quantity).toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right', padding: '16px 8px', fontWeight: 'bold' }}>Order Total:</td>
                <td style={{ textAlign: 'right', padding: '16px 8px', fontWeight: 'bold' }}>${order.totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetail;