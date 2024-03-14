# User Management System - Node.js

This repository contains the backend code for a user management system implemented in Node.js.

## Overview

This user management system provides functionality for user registration, login, profile retrieval, and email confirmation. It utilizes MongoDB as the database for storing user information, JWT for authentication, bcrypt for password hashing, and SMTP for sending confirmation emails.

## Features

- User registration with email verification
- User login with JWT token generation
- Retrieval of user profile information
- Email confirmation for registered users

## Setup Instructions

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- MongoDB installed and running locally or accessible via a connection string.
- SMTP server credentials for sending confirmation emails.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository_url>

Navigate to the project directory:

bash
Copy code
cd user-management-system-node
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and define the following variables:

plaintext
Copy code
PORT=3000
MONGODB_URI=<your_mongodb_connection_string>
SECRET_KEY=<your_secret_key>
SMTP_USERNAME=<your_smtp_username>
SMTP_PASSWORD=<your_smtp_password>
Running the Server
To start the server, run the following command:

bash
Copy code
npm start
By default, the server runs on port 3000. You can access it at http://localhost:3000.

Endpoints
The following endpoints are available:

POST /signup: Register a new user and send an email with OTP for two-step verification.
POST /login: Log in the user and return a JWT token.
GET /profile: Retrieve user information based on the JWT token.
GET /verify/:token: Confirm user email with the provided OTP.
Additional Notes
Ensure that the SECRET_KEY environment variable is a long, random string to ensure the security of JWT tokens.
MongoDB connection string should be provided in the .env file.
SMTP credentials provided in the .env file should be valid and have permission to send emails.
Handle errors and edge cases gracefully in the code.
Consider implementing additional security measures such as rate limiting, input validation, and logging for production use.