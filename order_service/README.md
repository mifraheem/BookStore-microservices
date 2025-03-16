# Order Service for BookStore

The Order Service is a crucial component of the BookStore microservices project. This service manages customer orders, integrating with a RabbitMQ messaging queue to update product stock statuses and uses a Node.js/Express backend with a SQLite database.

## Technology Stack

- **Programming Language**: JavaScript (Node.js)
- **Framework**: Express
- **Database**: SQLite
- **Messaging**: RabbitMQ

## Prerequisites

Ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mifraheem/BookStore-microservices.git
   cd BookStore-microservices/order_service
   ```

2. Install the required Node.js packages:
   ```bash
   npm install
   ```

3. Ensure RabbitMQ is set up and running on your local machine or accessible via network.

## API Documentation

### Get Orders

- **Endpoint**: `GET /orders`
- **Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "success",
      "data": [
        {
          "id": 1,
          "customer_name": "John Doe",
          "product_id": 123,
          "quantity": 1,
          "order_status": "pending",
          "user_id": 2
        }
      ]
    }
    ```

### Create Order

- **Endpoint**: `POST /orders`
- **Authorization**: Bearer Token Required
- **Body**:
  ```json
  {
    "customer_name": "John Doe",
    "product_id": 123,
    "quantity": 2
  }
  ```
- **Response**:
  - **Code**: 201 CREATED
  - **Content**:
    ```json
    {
      "message": "Order created successfully",
      "order": {
        "id": 1,
        "customer_name": "John Doe",
        "product_id": 123,
        "quantity": 2,
        "user_id": 2
      }
    }
    ```

### Running the Service

To start the service, execute the following command:
```bash
node app.js
```
This command will start the Express server on the designated port and begin listening for incoming requests.

## Additional Features

This service also includes a function to send messages to a RabbitMQ queue when orders are created, which facilitates the real-time update of product stock levels.
