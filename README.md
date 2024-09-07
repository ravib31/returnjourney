# AllMeetings Application

This project is a React-based web application that allows users to view, create, update, and delete meetings. The application features a search function, pagination, and authentication using JWT. It also incorporates Tailwind CSS for UI styling.


FrontEnd - 
## Features

- Authentication: JWT-based authentication for securing the application.
- CRUD Operations: Users can create, view, update, and delete meetings.
- Search Functionality: Allows users to search for meetings by title.
- Pagination: Meetings are displayed with pagination, showing a limited number of meetings per page.
- Responsive Design: The application is fully responsive using Tailwind CSS.

## Technologies Used

- React: Frontend JavaScript library for building user interfaces.
- Axios: HTTP client for making API requests.
- Tailwind CSS: Utility-first CSS framework for styling.
- JWT: JSON Web Tokens for authentication.
- React Router: Library for navigation between different components.
  
## Installation

1. Clone the repository
   git clone https://github.com/yourusername/allmeetings.git


The application will be available at http://localhost:3000.

API Endpoints
The following API endpoints are expected for the backend:

GET /api/meetings: Fetches all meetings.
POST /api/meetings: Creates a new meeting.
PUT /api/meetings/:id: Updates a meeting by ID.
DELETE /api/meetings/:id: Deletes a meeting by ID.
Make sure to configure the backend with the appropriate routes.

📦frontend
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜AllMeetings.js        # Main component for displaying all meetings
 ┃ ┃ ┣ 📜Calendar.js        # Component for creating/updating a meeting
 ┃ ┃ ┣ 📜Login.js        # Component for creating/updating a meeting
 ┃ ┃ ┣ 📜Signup.js        # Component for creating/updating a meeting
 ┃ ┗ 📜App.js                  # Main app component
 ┣ 📜package.json              # Dependencies and scripts
 ┣ 📜README.md                 # Project documentation



Backend - 
# AllMeetings Backend API

This repository contains the backend for the AllMeetings application, which provides a RESTful API for managing meetings. It is built using Node.js, Express, and MongoDB and secured with JWT-based authentication.

## Features

- Authentication: Secure user login and access control using JSON Web Tokens (JWT).
- CRUD Operations: API supports creating, reading, updating, and deleting meetings.
- User Management: Supports user registration and login.
- JWT-based Authorization: Protects routes and ensures that only authenticated users can create, update, or delete meetings.

## Technologies Used

- Node.js: JavaScript runtime environment for building the backend.
- Express.js: Web framework for Node.js.
- MongoDB: NoSQL database for storing meetings and user data.
- Mongoose: ODM library for MongoDB and Node.js.
- JWT: JSON Web Token for authentication and authorization.
- bcrypt: Library for hashing passwords.
- dotenv: Environment variable management.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user and receive a JWT.

### Meetings

- `GET /api/meetings`: Get a list of all meetings (requires JWT).
- `POST /api/meetings`: Create a new meeting (requires JWT).
- `GET /api/meetings/:id`: Get a specific meeting by ID (requires JWT).
- `PUT /api/meetings/:id`: Update a specific meeting by ID (requires JWT).
- `DELETE /api/meetings/:id`: Delete a specific meeting by ID (requires JWT).

## Installation

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)

### Setup Instructions

1. Clone the repository:
   git clone https://github.com/yourusername/allmeetings-backend.git


📦allmeetings-backend
 ┣ 📂controllers
 ┃ ┣ 📜authController.js       # Handles user authentication and JWT
 ┃ ┣ 📜meetingController.js    # Handles CRUD operations for meetings
 ┣ 📂middleware
 ┃ ┣ 📜authMiddleware.js       # Middleware for protecting routes with JWT
 ┣ 📂models
 ┃ ┣ 📜User.js                 # Mongoose schema and model for users
 ┃ ┣ 📜Meeting.js              # Mongoose schema and model for meetings
 ┣ 📂routes
 ┃ ┣ 📜authRoutes.js           # Authentication routes (register, login)
 ┃ ┣ 📜meetingRoutes.js        # Meeting CRUD routes
 ┣ 📜.env                      # Environment variables (not included in version control)
 ┣ 📜app.js                    # Main Express application setup
 ┣ 📜server.js                 # Entry point for the server
 ┣ 📜package.json              # Dependencies and scripts
 ┣ 📜README.md                 # Project documentation
