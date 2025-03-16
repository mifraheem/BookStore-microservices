# BookStore Microservices Project

Welcome to the BookStore project, an open-source initiative designed to demonstrate the architecture, communication, and operational strategies of microservices. This project is ideal for freshers and DevOps beginners to gain insights into how different services within a microservices architecture interact through APIs and message brokers like RabbitMQ.

## Project Overview

The BookStore project consists of multiple microservices, each handling a different aspect of the bookstore's functionality:

- **Authentication Service**: Manages user authentication and token generation.
- **Catalog Service**: Handles product listings, including adding, updating, and deleting products.
- **Order Service**: Manages customer orders and communicates with the Catalog Service to update product stock.
- **API Gateway**: Routes incoming requests to the appropriate services based on the URL path.

These services communicate with each other using both HTTP REST APIs and asynchronous messaging via RabbitMQ.

## Technology Stack

- **Programming Languages**: Python, JavaScript (Node.js), and Go
- **Web Frameworks**: Django, Express, Flask
- **Database**: SQLite, PostgreSQL
- **Messaging**: RabbitMQ
- **Containerization**: Docker

## Getting Started

To get started with the BookStore project, you need to set up the RabbitMQ server using Docker. This will enable message queuing functionalities required by the services.

### Prerequisites

- Docker installed on your machine. Download Docker from [Docker's official website](https://www.docker.com/products/docker-desktop).

### Setup RabbitMQ

1. In the main directory of the repository, you'll find a `docker-compose.yml` file configured for RabbitMQ service.

2. Start the RabbitMQ container:
   ```bash
   docker-compose up -d
   ```

   This command will start RabbitMQ in a Docker container with the management interface accessible at `http://localhost:15672/` and the default username and password both set to `guest`.

## Contribution Guidelines

Contributions are welcome to help extend the functionality and improve the project. If you're interested in contributing, please follow the standard fork-clone-branch-pull request workflow. Make sure to adhere to the coding standards and guidelines of each service for consistency and quality.

## Understanding Microservices

This project serves as a practical example to understand:
- How microservices are architected and isolated.
- Communication patterns between services such as synchronous RESTful APIs and asynchronous message queuing.
- The role of an API gateway in managing service requests.

---

This README should serve as a comprehensive guide for beginners to set up and understand the project while providing clear instructions for more experienced developers to contribute effectively. Adjust and expand as necessary to suit the specifics of your project setup and the technologies used.