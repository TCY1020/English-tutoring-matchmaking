'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Evaluation.init({
    studentId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    score: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Evaluation',
    tableName: 'Evaluations',
    underscored: true
  })
  return Evaluation
}
