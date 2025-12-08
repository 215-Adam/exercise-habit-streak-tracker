# Exercise Habit Streak Tracker API

This is your final project backend: a Node.js + Express + Sequelize API that tracks workouts and exercise streaks with authentication and authorization.

## How to run (after unzipping)

1. Open the folder in VS Code.
2. In the terminal, run:

   ```bash
   npm install
   npm run db:setup
   npm run db:seed
   npm run dev
   ```

3. The server will run on `http://localhost:3000`.

You can then use Postman to test routes like `/auth/register`, `/auth/login`, `/workouts`, and `/streaks/me`.
