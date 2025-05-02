import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  
  // Extract first letter for the book image
  const firstLetter = book.title.charAt(0).toUpperCase();
  
  // Generate a consistent background color based on the book id
  const getBackgroundColor = (id) => {
    const colors = [
      '#E9D5FF', // Purple 200
      '#DBEAFE', // Blue 100
      '#D1FAE5', // Green 100
      '#FEF3C7', // Yellow 100
      '#FEE2E2', // Red 100
      '#FFEDD5', // Orange 100
      '#F5F3FF', // Violet 100
      '#E0E7FF', // Indigo 100
      '#CCFBF1', // Teal 100
      '#F3F4F6'  // Gray 100
    ];
    return colors[id % colors.length];
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Link to={`/products/${book.id}`} className="book-card card">
        <div 
          className="book-image"
          style={{ backgroundColor: getBackgroundColor(book.id) }}
        >
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {firstLetter}
          </motion.span>
        </div>
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="flex justify-between items-center">
            <p className="book-price">${book.price.toFixed(2)}</p>
            <motion.button 
              className="button button-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;