import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    isbn: '',
    description: '',
    publishedDate: '',
    language: '',
    pageCount: '',
    publisher: '',
    inventory: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();

  // Categories for dropdown
  const categories = [
    'Fiction',
    'Non-fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Thriller',
    'Horror',
    'Biography',
    'History',
    'Self-help',
    'Business'
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.publishedDate) {
      newErrors.publishedDate = 'Published date is required';
    }
    
    if (!formData.inventory) {
      newErrors.inventory = 'Inventory is required';
    } else if (isNaN(parseInt(formData.inventory)) || parseInt(formData.inventory) < 0) {
      newErrors.inventory = 'Inventory must be a valid non-negative number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request with delay
    setTimeout(() => {
      console.log('Book added:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: '',
          author: '',
          price: '',
          category: '',
          isbn: '',
          description: '',
          publishedDate: '',
          language: '',
          pageCount: '',
          publisher: '',
          inventory: ''
        });
        setIsSuccess(false);
        navigate('/products');
      }, 1500);
    }, 1000);
  };

  return (
    <div>
      <div className="form-header">
        <h2>Add New Book</h2>
        <p>Fill in the details to add a new book to the catalog</p>
      </div>
      
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4"
          style={{ 
            backgroundColor: 'var(--color-success-300)',
            color: 'var(--color-success-700)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          Book successfully added to the catalog!
        </motion.div>
      )}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Book title"
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
              />
              {errors.author && <div className="error-message">{errors.author}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="19.99"
              />
              {errors.price && <div className="error-message">{errors.price}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <div className="error-message">{errors.category}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="isbn">ISBN *</label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="9780123456789"
              />
              {errors.isbn && <div className="error-message">{errors.isbn}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="publishedDate">Published Date *</label>
              <input
                id="publishedDate"
                name="publishedDate"
                type="date"
                value={formData.publishedDate}
                onChange={handleChange}
              />
              {errors.publishedDate && <div className="error-message">{errors.publishedDate}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input
                id="language"
                name="language"
                type="text"
                value={formData.language}
                onChange={handleChange}
                placeholder="English"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="pageCount">Page Count</label>
              <input
                id="pageCount"
                name="pageCount"
                type="number"
                min="1"
                value={formData.pageCount}
                onChange={handleChange}
                placeholder="300"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                id="publisher"
                name="publisher"
                type="text"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Publisher name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="inventory">Inventory *</label>
              <input
                id="inventory"
                name="inventory"
                type="number"
                min="0"
                value={formData.inventory}
                onChange={handleChange}
                placeholder="Number of copies available"
              />
              {errors.inventory && <div className="error-message">{errors.inventory}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Book description"
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>
          
          <div className="form-actions">
            <motion.button
              type="button"
              className="button"
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Adding Book...' : 'Add Book'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;