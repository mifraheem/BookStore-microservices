import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import allBooks from '../../data/books';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Fetch book details
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      try {
        const foundBook = allBooks.find(b => b.id === parseInt(id));
        
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to load book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= book.inventory) {
      setQuantity(value);
    }
  };

  // Add to cart with specified quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
  };

  // First letter for image
  const getFirstLetter = () => {
    return book?.title.charAt(0).toUpperCase() || 'B';
  };

  // Generate background color based on book id
  const getBackgroundColor = () => {
    const colors = [
      '#E9D5FF', // Purple 200
      '#DBEAFE', // Blue 100
      '#D1FAE5', // Green 100
      '#FEF3C7', // Yellow 100
      '#FEE2E2', // Red 100
      '#FFEDD5', // Orange 100
    ];
    return book ? colors[book.id % colors.length] : colors[0];
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="error-message">{error}</p>
        <button 
          className="button button-primary mt-4"
          onClick={() => navigate('/products')}
        >
          Back to Books
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
        onClick={() => navigate('/products')}
      >
        &larr; Back to Books
      </button>
      
      <div className="card">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="book-image"
              style={{ 
                height: '300px',
                backgroundColor: getBackgroundColor(),
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <span style={{ fontSize: '6rem' }}>{getFirstLetter()}</span>
            </motion.div>
          </div>
          
          <div>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {book.title}
            </motion.h2>
            
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="book-author"
            >
              by {book.author}
            </motion.p>
            
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="book-price"
              style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}
            >
              ${book.price.toFixed(2)}
            </motion.p>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <p>{book.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <div>
                <label className="info-label">ISBN</label>
                <p>{book.isbn}</p>
              </div>
              <div>
                <label className="info-label">Language</label>
                <p>{book.language}</p>
              </div>
              <div>
                <label className="info-label">Pages</label>
                <p>{book.pageCount}</p>
              </div>
              <div>
                <label className="info-label">Publisher</label>
                <p>{book.publisher}</p>
              </div>
              <div>
                <label className="info-label">Published Date</label>
                <p>{new Date(book.publishedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="info-label">In Stock</label>
                <p>{book.inventory} copies</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-end gap-4"
            >
              <div className="form-group" style={{ width: '80px' }}>
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={book.inventory}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button button-primary"
                onClick={handleAddToCart}
                style={{ height: '40px' }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetail;