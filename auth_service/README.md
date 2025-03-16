# Authentication Service for BookStore

This service is part of the BookStore microservices project, an open-source initiative. It handles user registration, login, token refresh, and token verification functionalities. This service is implemented using:
1. Python
2. Django
3. Django REST Framework

## Prerequisites

Ensure you have Python 3.10 or higher installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mifraheem/BookStore-microservices.git
   cd BookStore-microservices/auth_service
   ```

2. Install the required packages using:
   ```bash
   pip install -r requirements.txt
   ```
   
3. Run the server using:
   ```bash
   python manage.py runserver
   ```


## API Documentation

### User Registration

- **URL**: `/register/`
- **Method**: `POST`
- **Data Params**:
  ```json
  {
    "username": "username",
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Success Response**:
  - **Code**: 201 CREATED
  - **Content**:
    ```json
    {
      "id": 1,
      "username": "username",
      "email": "user@example.com"
    }
    ```
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: Error message in JSON format depending on the input error.

### User Login

- **URL**: `/login/`
- **Method**: `POST`
- **Data Params**:
  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "refresh": "refresh_token",
      "access": "access_token"
    }
    ```

### Token Refresh

- **URL**: `/refresh/`
- **Method**: `POST`
- **Data Params**:
  ```json
  {
    "refresh": "refresh_token"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "access": "new_access_token"
    }
    ```

### Token Verification

- **URL**: `/verify/`
- **Method**: `POST`
- **Data Params**:
  ```json
  {
    "token": "access_token"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: Error message in JSON format indicating an invalid token.

