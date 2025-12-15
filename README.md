Exercise Habit Streak Tracker API

This project is a backend REST API built with Node.js, Express, Sequelize, and a relational database. The goal of the API is to help users stay consistent with working out by letting them log workouts, track exercises, and see streaks based on how often they train. Users can create an account, log in, record workouts, and view their progress over time.

The API is fully authenticated using JSON Web Tokens, includes role based authorization, and is deployed to Render so it can be accessed publicly.

Project Overview

A lot of people start working out but fall off because they do not track their progress or stay consistent. This API solves that problem by letting users log their workouts and automatically calculate streaks for each exercise. The streak system helps users see how many days in a row they have stayed consistent and what their longest streak has been.

The project was built to demonstrate real backend concepts like authentication, authorization, relational databases, CRUD operations, testing, and production deployment.

Technologies Used

This project was built using Node.js and Express for the server and routing. Sequelize is used as the ORM to interact with the database. SQLite is used for local development and PostgreSQL is used in production. Authentication is handled using JSON Web Tokens and passwords are securely hashed using bcrypt. Unit testing is done using Jest and Supertest. The application is deployed on Render.

Project Structure

The server entry point is server.js. Database configuration and setup live in the database folder. All models such as User, Exercise, Workout, and Streak are stored in the models folder. API routes are separated into route files for authentication, workouts, exercises, and streaks. Middleware such as authentication, logging, and error handling live in the middleware folder. All tests are stored in the tests folder.

Setup Instructions for Local Development

First clone the repository from GitHub and navigate into the project folder. Then install all dependencies using npm install.

Next create a .env file in the root of the project and add a JWT_SECRET value. This secret is used to sign and verify authentication tokens.

After that, set up the database by running npm run db setup and npm run db seed. This will create the tables and insert sample data.

Finally start the server using npm run dev. The server will run on http://localhost:3000
.

Authentication Guide

This API uses JSON Web Tokens for authentication. Users must register and then log in to receive a token. That token must be included in the Authorization header for all protected endpoints.

The header should look like this
Authorization Bearer YOUR_TOKEN_HERE

Register

POST /auth/register

This endpoint creates a new user account.

Request body example

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}


The response returns the newly created user information without the password.

Login

POST /auth/login

This endpoint authenticates a user and returns a JWT token.

Request body example

{
  "email": "test@example.com",
  "password": "password123"
}


Response example

{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "user"
  }
}


The token returned here is required for all protected routes.

User Roles and Permissions

This API uses role based access control with two roles, user and admin.

A regular user can create, view, update, and delete their own workouts. Users can also view their own streaks and exercise history. Users are not allowed to access admin only endpoints.

An admin user can access endpoints that return data across all users. Admin only endpoints are protected and return a forbidden response when accessed by non admin users.

API Endpoints
Workouts

Users can create workouts, view their own workouts, update them, and delete them. All workout routes require authentication and users can only access workouts that belong to them.

POST /workouts creates a workout
GET /workouts/me returns workouts for the logged in user
GET /workouts/:id returns a single workout owned by the user
PUT /workouts/:id updates a workout
DELETE /workouts/:id deletes a workout

Exercises

Exercises allow users to organize workouts by type.

POST /exercises creates an exercise
GET /exercises returns exercises
PUT /exercises/:id updates an exercise
DELETE /exercises/:id deletes an exercise

All exercise routes require authentication.

Streaks

Streaks track how consistent a user is with each exercise.

GET /streaks/me returns all streaks for the logged in user
GET /streaks/me/:exerciseId returns a streak for a specific exercise
GET /streaks/user/:userId returns streaks for any user and is restricted to admins only

Error Handling

The API uses proper HTTP status codes and clear error messages. A 401 response is returned when a request is missing a token or has an invalid token. A 403 response is returned when a user tries to access an endpoint they do not have permission for. A 404 response is returned when a resource is not found. A 500 response is returned for server errors.

Running Tests

Tests can be run using npm test. The test suite covers authentication, protected routes, role based authorization, and error scenarios.

API Documentation

The API is fully documented using Postman. The documentation includes example requests and responses for all CRUD endpoints, authentication examples, and permission behavior.

Postman documentation link
PASTE YOUR POSTMAN LINK HERE

Deployment

The API is deployed on Render and publicly accessible. All authentication, authorization, CRUD operations, and relationships were tested in the deployed environment using Postman.
