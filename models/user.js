'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Course, { foreignKey: 'teacherId' })
      User.hasMany(models.Booking, { foreignKey: 'studentId' })
      User.belongsToMany(User, {
        through: models.Evaluation,
        foreignKey: 'studentId',
        as: 'Evaluate'
      })
      User.belongsToMany(User, {
        through: models.Evaluation,
        foreignKey: 'teacherId',
        as: 'Evaluated'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    teachingStyle: DataTypes.TEXT,
    avatar: DataTypes.STRING,
    role: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
