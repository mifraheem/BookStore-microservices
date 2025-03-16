# Catalog Service for BookStore

The Catalog Service is part of the BookStore microservices project, an open-source initiative designed to manage product listings including creation, update, and deletion of products. This service uses Python with the Flask framework and Flask-Migrate for database migrations. It interacts with a RabbitMQ messaging queue for real-time updates and utilizes JWT for secure API access.

## Stack

- **Programming Language**: Python
- **Framework**: Flask
- **Database**: SQLite (via SQLAlchemy)
- **Messaging**: RabbitMQ
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

Ensure you have Python 3.10 or higher installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mifraheem/BookStore-microservices.git
   cd BookStore-microservices/catalog_service
   ```

2. Install the required packages using:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the RabbitMQ service on your local machine or set up a RabbitMQ instance.

## API Documentation

### Create Product

- **Endpoint**: `POST /products`
- **Authorization**: Bearer Token Required
- **Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 19.99
  }
  ```
- **Response**:
  - **Code**: 201 CREATED
  - **Content**:
    ```json
    {
      "message": "Product created",
      "product_id": 1
    }
    ```

### Get All Products

- **Endpoint**: `GET /products`
- **Response**:
  - **Code**: 200 OK
  - **Content**: List of products
    ```json
    [
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product Description",
        "price": 19.99,
        "in_stock": true,
        "author": 1
      }
    ]
    ```

### Get Single Product

- **Endpoint**: `GET /products/<product_id>`
- **Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product Description",
      "price": 19.99,
      "in_stock": true
    }
    ```

### Update Product

- **Endpoint**: `PUT /products/<product_id>`
- **Authorization**: Required
- **Body**:
  ```json
  {
    "name": "New Product Name",
    "description": "Updated Description",
    "price": 22.99,
    "in_stock": false
  }
  ```
- **Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "id": 1,
      "name": "New Product Name",
      "description": "Updated Description",
      "price": 22.99,
      "in_stock": false
    }
    ```

### Delete Product

- **Endpoint**: `DELETE /products/<product_id>`
- **Authorization**: Required
- **Response**:
  - **Code**: 204 No Content
  - **Content**: None

## Running the Service

To start the service, execute the following command:
```bash
python app.py
```

This will also start a background consumer thread that listens for product updates from the RabbitMQ server.

