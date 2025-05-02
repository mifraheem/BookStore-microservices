import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  const title = book?.name || 'Untitled';
  const firstLetter = title.charAt(0).toUpperCase();

  const getBackgroundColor = (id) => {
    const colors = [
      '#E9D5FF', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#FEE2E2',
      '#FFEDD5', '#F5F3FF', '#E0E7FF', '#CCFBF1', '#F3F4F6'
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
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
          <h3 className="book-title">{title}</h3>
          <p className="book-author">by Author #{book?.author || 'N/A'}</p>
          <div className="flex justify-between items-center">
            <p className="book-price">${book?.price?.toFixed(2) || '0.00'}</p>
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