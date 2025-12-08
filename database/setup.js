const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_FILE || "database.sqlite",
  logging: false
});

const UserModel = require("../models/User");
const ExerciseModel = require("../models/Exercise");
const WorkoutModel = require("../models/Workout");
const StreakModel = require("../models/Streak");

const User = UserModel(sequelize, DataTypes);
const Exercise = ExerciseModel(sequelize, DataTypes);
const Workout = WorkoutModel(sequelize, DataTypes);
const Streak = StreakModel(sequelize, DataTypes);

User.hasMany(Workout, { foreignKey: "userId" });
Workout.belongsTo(User, { foreignKey: "userId" });

Exercise.hasMany(Workout, { foreignKey: "exerciseId" });
Workout.belongsTo(Exercise, { foreignKey: "exerciseId" });

User.hasMany(Streak, { foreignKey: "userId" });
Streak.belongsTo(User, { foreignKey: "userId" });

Exercise.hasMany(Streak, { foreignKey: "exerciseId" });
Streak.belongsTo(Exercise, { foreignKey: "exerciseId" });

async function syncDb(force = false) {
  await sequelize.sync({ force });
}

if (require.main === module && process.argv.includes("--sync")) {
  (async () => {
    try {
      await syncDb(true);
      console.log("Database synced");
      process.exit(0);
    } catch (err) {
      console.error("Sync failed", err);
      process.exit(1);
    }
  })();
}

module.exports = {
  sequelize,
  syncDb,
  User,
  Exercise,
  Workout,
  Streak
};
