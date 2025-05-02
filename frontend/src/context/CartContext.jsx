import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('bookstore_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Update totals when cart changes
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(cartTotal);
    
    // Save cart to localStorage
    localStorage.setItem('bookstore_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart(prevCart => {
      // Check if item is already in cart
      const existingItem = prevCart.find(item => item.id === book.id);
      
      if (existingItem) {
        // Increase quantity if item exists
        return prevCart.map(item => 
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};