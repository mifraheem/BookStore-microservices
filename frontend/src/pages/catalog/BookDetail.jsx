import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const CATALOG_URL = import.meta.env.VITE_CATALOG_SERVICE;
const ORDER_URL = import.meta.env.VITE_ORDER_SERVICE;

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${CATALOG_URL}/products/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  const handleCheckout = async () => {
    try {
      const token = Cookies.get('access_token');
      const res = await fetch(`${ORDER_URL}orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customer_name: customerName,
          product_id: book.id,
          quantity,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setOrderSuccess(result.order);
        setIsCheckoutOpen(false);
      } else {
        alert(result.message || 'Order failed');
      }
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  };

  const getBackgroundColor = () => {
    const colors = ['#E9D5FF', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#FEE2E2', '#FFEDD5'];
    return book ? colors[book.id % colors.length] : colors[0];
  };

  if (loading) return <div className="text-center py-12">Loading book details...</div>;
  if (error) return <div className="text-center py-12">{error}</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <button className="button mb-6" onClick={() => navigate('/products')}>&larr; Back to Books</button>

      <div className="card">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div
              className="book-image"
              style={{ height: '300px', backgroundColor: getBackgroundColor(), borderRadius: '12px' }}
            >
              <span style={{ fontSize: '6rem' }}>{book.name.charAt(0)}</span>
            </div>
          </div>

          <div>
            <h2>{book.name}</h2>
            <p className="book-price text-lg font-semibold mb-2">${book.price.toFixed(2)}</p>
            <p className="mb-4">{book.description}</p>
            <p className="mb-2">In Stock: {book.in_stock ? 'Yes' : 'No'}</p>

            <div className="flex items-end gap-4 mt-4">
              <div className="form-group" style={{ width: '80px' }}>
                <label htmlFor="quantity">Qty</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button button-primary"
                onClick={() => setIsCheckoutOpen(true)}
                style={{ height: '40px' }}
              >
                Buy Now
              </motion.button>
            </div>

            {orderSuccess && (
              <div className="mt-4 text-green-600">
                ✅ Order #{orderSuccess.id} placed successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Order</h3>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="input w-full mb-4"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
            />

            <div className="flex justify-end gap-3">
              <button className="button" onClick={() => setIsCheckoutOpen(false)}>Cancel</button>
              <button className="button button-primary" onClick={handleCheckout}>Place Order</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BookDetail;