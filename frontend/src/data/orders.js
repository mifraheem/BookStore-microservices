const orders = [
  {
    id: "ORD-2025-4001",
    userId: 1,
    date: "2025-04-10",
    status: "Delivered",
    items: [
      {
        bookId: 1,
        quantity: 1,
        price: 15.99
      },
      {
        bookId: 5,
        quantity: 1,
        price: 18.50
      }
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    totalAmount: 34.49,
    paymentMethod: "Credit Card",
    trackingNumber: "TRK45678901"
  },
  {
    id: "ORD-2025-4002",
    userId: 1,
    date: "2025-04-05",
    status: "Shipped",
    items: [
      {
        bookId: 7,
        quantity: 1,
        price: 24.99
      }
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    totalAmount: 24.99,
    paymentMethod: "PayPal",
    trackingNumber: "TRK45678902"
  },
  {
    id: "ORD-2025-3001",
    userId: 1,
    date: "2025-03-22",
    status: "Delivered",
    items: [
      {
        bookId: 3,
        quantity: 1,
        price: 12.99
      },
      {
        bookId: 9,
        quantity: 1,
        price: 13.75
      },
      {
        bookId: 11,
        quantity: 1,
        price: 19.99
      }
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    totalAmount: 46.73,
    paymentMethod: "Credit Card",
    trackingNumber: "TRK45678903"
  },
  {
    id: "ORD-2025-3002",
    userId: 1,
    date: "2025-03-15",
    status: "Delivered",
    items: [
      {
        bookId: 2,
        quantity: 1,
        price: 14.95
      },
      {
        bookId: 6,
        quantity: 1,
        price: 11.50
      }
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    totalAmount: 26.45,
    paymentMethod: "Credit Card",
    trackingNumber: "TRK45678904"
  },
  {
    id: "ORD-2025-2001",
    userId: 1,
    date: "2025-02-28",
    status: "Delivered",
    items: [
      {
        bookId: 10,
        quantity: 2,
        price: 16.25
      }
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    totalAmount: 32.50,
    paymentMethod: "PayPal",
    trackingNumber: "TRK45678905"
  },
  {
    id: "ORD-2025-4003",
    userId: 1,
    date: "2025-04-12",
    status: "Processing",
    items: [
      {
        bookId: 8,
        quantity: 1,
        price: 29.99
      },
      {
        bookId: 12,
        quantity: 1,
        price: 14.50
      }
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "USA"
    },
    totalAmount: 44.49,
    paymentMethod: "Credit Card"
  }
];

export default orders;