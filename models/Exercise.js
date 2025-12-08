module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Exercise;
};
