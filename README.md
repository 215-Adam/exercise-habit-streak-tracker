# Exercise Habit Streak Tracker API  
A backend REST API built with Node.js, Express, SQLite, and Sequelize that helps users track their workout habits, log exercises, and maintain streaks to stay motivated. Users can register, log in, record workouts, view their exercise history, and track streaks over time.

---

## Project Overview
Many people start working out but struggle to stay consistent or track progress. This API solves that problem by letting users:

- Log workouts for different exercises  
- Track how many days in a row they've performed an exercise  
- View their current and longest streaks  
- Stay motivated through habit tracking  

This API supports authentication (JWT), multiple resource types, CRUD operations, and proper relational database design.

---

## Technologies Used
- Node.js  
- Express.js  
- Sequelize ORM  
- SQLite3 database  
- JWT Authentication  
- Jest + Supertest (unit tests)  

---

## Project Structure
project/
├── server.js
├── package.json
├── .env
├── database/
│ ├── setup.js
│ └── seed.js
├── models/
│ ├── User.js
│ ├── Exercise.js
│ └── Workout.js
│ └── Streak.js
├── routes/
│ ├── authRoutes.js
│ ├── exerciseRoutes.js
│ ├── workoutRoutes.js
│ └── streakRoutes.js
├── middleware/
│ ├── auth.js
│ ├── logger.js
│ └── errorHandler.js
└── tests/
2. Install dependencies
npm install

3. Configure Environment Variables

Create a .env file in the project root:

JWT_SECRET=your_secret_key_here
DB_FILE=database.sqlite

4. Set up the database
npm run db:setup
npm run db:seed

5. Run the server
npm run dev


Server runs on:

http://localhost:3000

Authentication

This API uses JWT (JSON Web Tokens).

Add this header to all protected routes:

Authorization: Bearer YOUR_TOKEN_HERE

Postman API Documentation – Exercise Habit Streak Tracker API

This collection allows users to register, log in, create workouts, view streaks, and manage exercises.
All protected routes require a JWT token in the header:

Authorization: Bearer YOUR_TOKEN_HERE

 1. AUTHENTICATION
Register User

POST /auth/register

Body
{
  "username": "adamtest",
  "email": "adam@example.com",
  "password": "password123"
}

Response
{
  "id": 1,
  "username": "adamtest",
  "email": "adam@example.com",
  "role": "user"
}

Login User

POST /auth/login

Body
{
  "email": "adam@example.com",
  "password": "password123"
}

Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

 2. WORKOUTS CRUD

Use token for all workout routes.

Create Workout

POST /workouts

Headers
Authorization: Bearer YOUR_TOKEN

Body
{
  "exerciseId": 1,
  "date": "2025-01-01",
  "duration": 45,
  "notes": "Chest day"
}

Response
{
  "id": 1,
  "userId": 1,
  "exerciseId": 1,
  "date": "2025-01-01",
  "duration": 45,
  "notes": "Chest day"
}

Get Logged-in User’s Workouts

GET /workouts/me

Response
[
  {
    "id": 1,
    "exerciseId": 1,
    "date": "2025-01-01",
    "duration": 45,
    "notes": "Chest day"
  }
]

Update Workout

PUT /workouts/:id

Body
{
  "duration": 60,
  "notes": "Updated workout details"
}

Response
{
  "message": "Workout updated",
  "updatedWorkout": {
    "id": 1,
    "duration": 60,
    "notes": "Updated workout details"
  }
}

Delete Workout

DELETE /workouts/:id

Response
{
  "message": "Workout deleted"
}

🏷 3. EXERCISES CRUD
Get All Exercises

GET /exercises

Response
[
  {
    "id": 1,
    "name": "Bench Press",
    "type": "strength"
  }
]

Create Exercise

POST /exercises

Body
{
  "name": "Running",
  "type": "cardio"
}

Response
{
  "id": 2,
  "name": "Running",
  "type": "cardio"
}

Update Exercise

PUT /exercises/:id

Body
{
  "name": "Treadmill Running",
  "type": "cardio"
}

Response
{
  "message": "Exercise updated"
}

Delete Exercise

DELETE /exercises/:id

Response
{
  "message": "Exercise deleted"
}

 4. STREAKS
Get Logged-in User Streaks

GET /streaks/me

Response
[
  {
    "exerciseId": 1,
    "currentStreak": 3,
    "longestStreak": 5,
    "lastWorkoutDate": "2025-01-01"
  }