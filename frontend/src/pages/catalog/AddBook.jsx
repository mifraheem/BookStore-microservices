import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';


const CATALOG_BASE_URL = import.meta.env.VITE_CATALOG_SERVICE;

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    in_stock: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const token = Cookies.get('access_token');
      const response = await axios.post(
        `${CATALOG_BASE_URL}products`,
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          in_stock: formData.in_stock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      setIsSuccess(true);
      setTimeout(() => navigate('/products'), 1500);
    } catch (error) {
      console.error('Error adding book:', error);
      setErrors({
        general:
          error.response?.data?.message ||
          'Failed to add book. Make sure you are logged in.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="form-header">
        <h2>Add New Book</h2>
        <p>Fill in the basic details to add a new book to the catalog</p>
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

      {errors.general && (
        <div className="error-message mb-4">{errors.general}</div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Book name"
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="19.99"
              />
              {errors.price && <div className="error-message">{errors.price}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="in_stock">In Stock</label>
              <input
                id="in_stock"
                name="in_stock"
                type="checkbox"
                checked={formData.in_stock}
                onChange={handleChange}
              />
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
