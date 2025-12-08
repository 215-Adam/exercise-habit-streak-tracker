module.exports = (sequelize, DataTypes) => {
  const Streak = sequelize.define("Streak", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentStreak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    longestStreak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastWorkoutDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  });

  return Streak;
};
