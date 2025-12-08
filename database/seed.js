require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sequelize, User, Exercise, Workout, Streak } = require("./setup");

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const passwordHash = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      passwordHash,
      role: "admin"
    });

    const user = await User.create({
      username: "adam",
      email: "adam@example.com",
      passwordHash,
      role: "user"
    });

    const run = await Exercise.create({
      name: "Running",
      category: "cardio"
    });

    const bench = await Exercise.create({
      name: "Bench Press",
      category: "strength"
    });

    const today = new Date().toISOString().slice(0, 10);

    await Workout.create({
      userId: user.id,
      exerciseId: run.id,
      date: today,
      duration: 30,
      notes: "Easy run"
    });

    await Streak.create({
      userId: user.id,
      exerciseId: run.id,
      currentStreak: 1,
      longestStreak: 1,
      lastWorkoutDate: today
    });

    console.log("Database seeded");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
