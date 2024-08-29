---

# D-Talks Backend

Welcome to the backend repository of **D-Talks**, an over-engineered platform designed to facilitate interactive learning through features like video calls, real-time chat, blogging, AI-powered answers, and more. This project is unique in that it utilizes two separate backend directories, each serving distinct purposes.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Setting Up the Express & PostgreSQL Backend](#setting-up-the-express--postgresql-backend)
  - [Setting Up the Express & MongoDB Backend](#setting-up-the-express--mongodb-backend)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Express & PostgreSQL Backend](#express--postgresql-backend)
  - [Express & MongoDB Backend](#express--mongodb-backend)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository is divided into two distinct backend directories:

1. **Express & PostgreSQL Backend**: A minimal setup with two routes—one for saving a username with an email and another for retrieving a username by email. This part is responsible for handling specific user details using PostgreSQL.

2. **Express & MongoDB Backend**: The main backend of the D-Talks application, handling the majority of the platform's features like authentication, real-time chat, blogging, and more, excluding the video call functionality.

## Technology Stack

- **Backend Framework**: Express.js
- **Database**:
  - **PostgreSQL**: For storing specific user details.
  - **MongoDB**: For storing general application data.
- **Other Integrations**:
  - Firebase Auth (for authentication)
  - Pusher (for real-time updates)
  - Cloudinary (for image storage)
  - Socket.IO (for real-time communication)
  - Gemini API (for AI-powered features)

## Project Structure

```bash
D-Talks-backend/
│
├── PG_BACKEND/              # Express & PostgreSQL backend
│   ├── routes/                 # Route handlers (save and get username)
│   ├── controllers/                 # Sequelize models
│   ├── db.js/                 # Database configuration
│   ├── app.js                  # Main entry point for this backend
│ 
│
├── backend/                    # Main backend with Express & MongoDB
│   ├── controllers/            # API routes and controllers
│   ├── models/                 # Mongoose models
│   ├── middleware/             # Express middlewares
│   ├── db/                     # database services integration
│   ├── routes/                 # Route handlers 
│   ├── utils/                  # Utility functions and helpers
│   ├── app.js                  # Main entry point for this backend
│   └── index.js                # database connection and app calling
│
└── README.md                   # Project documentation
```

## Installation

### Prerequisites

- **Node.js** (version 14.x or later)
- **npm** (or **yarn**)
- **PostgreSQL** and **MongoDB** databases

### Setting Up the Express & PostgreSQL Backend

1. **Navigate to the directory**:

   ```bash
   cd PG_BACKEND
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Fill in the required environment variables (see the [Environment Variables](#environment-variables) section).

4. **Run the development server**:

   ```bash
   npm run dev
   ```

### Setting Up the Express & MongoDB Backend

1. **Navigate to the directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Fill in the required environment variables (see the [Environment Variables](#environment-variables) section).

4. **Run the development server**:

   ```bash
   npm run dev
   ```

## Environment Variables

Each backend requires its own set of environment variables.

### Express & PostgreSQL Backend

```bash
# Server
PORT=3001

# PostgreSQL Database
POSTGRES_URI=postgres://user:password@localhost:5432/d_talks_users
```

### Express & MongoDB Backend

```bash
# Server
PORT=3000

# MongoDB Database
MONGO_URI=mongodb://localhost:27017/d_talks

# Pusher
PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=your-pusher-cluster

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret


## API Documentation

### Express & PostgreSQL Backend

This backend provides two simple routes:

- **Save Username with Email**: Stores a username with the corresponding email.

  - **Endpoint**: `POST /users`
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "name": "John Doe"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User saved successfully."
    }
    ```

- **Get Username by Email**: Retrieves the username associated with an email.

  - **Endpoint**: `GET /users/:email`
  - **Query Params**: `email`
  - **Response**:
    ```json
    {
      "name": "John Doe"
    }
    ```

### Express & MongoDB Backend

This backend handles all other functionalities of D-Talks, including authentication, real-time chat, blogging, AI-powered features, and more. The API documentation includes detailed information about each available endpoint, request/response formats, and required authentication.

- **Base URL**: `http://localhost:3000/api/v1`
- **Endpoints**:
  - `/users`: User details
  - `/chats`: User chat details
  - `/questions`: CRUD operations for questions
  - `/votes`: CRUD operations for votes
  - `/blogs`: Blog post management
  - **...and more**

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) for submitting pull requests, reporting issues, and proposing features.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README should provide clear instructions and context for developers and collaborators, outlining how to work with both backend directories effectively.
