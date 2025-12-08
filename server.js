require("dotenv").config();
const express = require("express");
const { sequelize } = require("./database/setup");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const streakRoutes = require("./routes/streakRoutes");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/workouts", workoutRoutes);
app.use("/streaks", streakRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to start server:", err);
  }
}

if (require.main === module) {
  start();
}

module.exports = app;
