

This repository contains the backend code 

## Setup Instructions

### Prerequisites

- Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- MongoDB installed and running locally or accessible via a connection string.
- SMTP server credentials for sending confirmation emails.

### Installation

1. Clone the repository to your local machine:

- `git clone https://github.com/ashishpatil3101/innobyte-assignment.git`
- Navigate to the project directory

### Install dependencies
- `npm install`

### Set up environment variables
- create .env file in root directory.
- paste env variables from .env-example file  and assign value to it

### Running the Server
- `npm start`

### API Information

### 1. User sign-up
- **Endpoint:** `{{base_url}}/api/signup`
- **Method:** POST
- **Request Params:** In request  body `{email, password, userName}`

### 2. User log-in
- **Endpoint:** `{{base_url}}/api/login`
- **Method:** POST
- **Request Params:** In request  body `{email, password}`

### 2. fetch user profile
- **Endpoint:** `{{base_url}}/api/profile`
- **Method:** GET
- **Request Params:** Bearer token in headers
