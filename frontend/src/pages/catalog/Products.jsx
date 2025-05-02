import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BookCard from '../../components/common/BookCard';
import SearchBar from '../../components/common/SearchBar';

const CATALOG_BASE_URL = import.meta.env.VITE_CATALOG_SERVICE;

const Products = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${CATALOG_BASE_URL}products`);
        if (Array.isArray(response.data)) {
          setBooks(response.data);
          setFilteredBooks(response.data);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = ['All', ...new Set(books.map(book => book.in_stock ? 'In Stock' : 'Out of Stock'))];

  useEffect(() => {
    let filtered = [...books];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.name?.toLowerCase().includes(q) ||
        book.description?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(book =>
        selectedCategory === 'In Stock' ? book.in_stock : !book.in_stock
      );
    }

    setFilteredBooks(filtered);
  }, [searchQuery, selectedCategory, books]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h2>Book Catalog</h2>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="form-group"
          style={{ minWidth: '200px', marginTop: '16px', marginBottom: '16px' }}
        >
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-control"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </motion.div>
      </div>

      {loading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p>Loading books...</p>
        </motion.div>
      ) : filteredBooks.length > 0 ? (
        <motion.div
          className="book-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p>No books found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Products;
