# API Gateway for BookStore

The API Gateway is a central part of the BookStore microservices project, designed to route requests to various services like Authentication, Catalog, and Order services. It is implemented using Go, and utilizes reverse proxy functionality to handle request redirection based on the requested path.

## Technology Stack

- **Programming Language**: Go
- **Libraries**: `net/http` for handling HTTP requests, `net/http/httputil` for reverse proxy capabilities, `net/url` for URL parsing, and `github.com/joho/godotenv` for environment variable management.

## Prerequisites

Ensure you have Go installed on your system. You can download it from [the Go official website](https://golang.org/dl/).

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mifraheem/BookStore-microservices.git
   cd BookStore-microservices/api_gateway
   ```

2. No additional Go packages are required beyond the standard library and `github.com/joho/godotenv` for loading environment variables from a `.env` file. If not already installed, you can get it via:
   ```bash
   go get github.com/joho/godotenv
   ```

## Running the Gateway

To start the API Gateway, execute the following command:
```bash
go run main.go
```
This command starts the server on port 6000 and will route incoming HTTP requests to the appropriate microservice based on the URL path.

## Environment Configuration

Ensure that your `.env` file contains URLs for each microservice:
```
AUTH_SERVICE="http://localhost:8000/"
CATALOG_SERVICE="http://localhost:5000/"
ORDER_SERVICE="http://localhost:3000/"
```
Replace `<port>` with the actual ports your services are running on.

## Reverse Proxy Routing Logic

The API Gateway examines the path of incoming requests and routes them to the correct service:
- **Authentication Requests**: Routes `/auth`, `/login`, and `/register` to the Authentication Service.
- **Product Catalog Requests**: Routes any requests starting with `/products` to the Catalog Service.
- **Order Management Requests**: Routes any requests starting with `/orders` to the Order Service.

