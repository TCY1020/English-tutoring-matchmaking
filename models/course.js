'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Course.belongsTo(models.User, { foreignKey: 'teacherId' })
      Course.hasMany(models.Booking, { foreignKey: 'courseId' })
    }
  }
  Course.init({
    teacherId: DataTypes.INTEGER,
    courseName: DataTypes.STRING,
    timePeriod: DataTypes.STRING,
    spendTime: DataTypes.FLOAT,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses',
    underscored: true
  })
  return Course
}
