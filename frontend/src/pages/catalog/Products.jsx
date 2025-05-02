import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookCard from '../../components/common/BookCard';
import SearchBar from '../../components/common/SearchBar';
import allBooks from '../../data/books';

const Products = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Get unique categories from books
  const categories = ['All', ...new Set(allBooks.map(book => book.category))];

  // Filter books based on search query and category
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      let filteredBooks = [...allBooks];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (selectedCategory && selectedCategory !== 'All') {
        filteredBooks = filteredBooks.filter(book => 
          book.category === selectedCategory
        );
      }
      
      setBooks(filteredBooks);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle category filter
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
            <option value="">All Categories</option>
            {categories.filter(cat => cat !== 'All').map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>
      </div>
      
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p>Loading books...</p>
        </motion.div>
      ) : books.length > 0 ? (
        <motion.div 
          className="book-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p>No books found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Products;