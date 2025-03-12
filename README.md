# BookStore Microservices Project
=====================================
### Overview
This project is a simple implementation of a BookStore microservices architecture. It consists of three microservices : `catalog`, `order`, and `auth`. Each microservice is responsible for a specific business function.
### Catalog Microservice
#### Overview
The `catalog` microservice is responsible for managing the catalog of books. It provides APIs for creating , reading, updating, and deleting books.
#### Endpoints
* `GET /books`: Retrieves a list of all books in the catalog.
* `GET /books/{id}`: Retrieves a specific book by its ID.
* `POST /books`: Creates a new book in the catalog.
* `PUT /books/{id}`: Updates a specific book in the catalog.
* `DELETE /books/{id}`: Deletes a specific book from the catalog.
#### Implementation
The `catalog` microservice is implemented using Node.js and Express.js. It uses a MongoDB databas to store the catalog data.