'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Booking.belongsTo(models.Course, { foreignKey: 'courseId' })
      Booking.belongsTo(models.User, { foreignKey: 'studentId' })
      Booking.hasOne(models.Evaluation, { foreignKey: 'bookingId' })
    }
  }
  Booking.init({
    courseId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    timePeriod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings',
    underscored: true
  })
  return Booking
}
