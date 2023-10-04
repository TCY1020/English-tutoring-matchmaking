const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { periodCut } = require('../helpers/period-cutter')
const { User, Course, Booking, Evaluation } = require('../models')

const userServices = {
  signUp: async (req, cb) => {
    try {
      const { email, password, passwordCheck } = req.body
      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('Email 已註冊過')
      if (password !== passwordCheck) throw new Error('密碼不符')
      const passwordSalt = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        email,
        password: passwordSalt
      })
      newUser.password = null
      cb(null, { user: newUser })
    } catch (err) {
      cb(err)
    }
  },
  getUser: async (req, cb) => {
    try {
      const user = 'first student'
      return cb(null, { user })
    } catch (err) {
      cb(err)
    }
  },
  getCourses: async (req, cb) => {
    try {
      const { keyword } = req.query
      const courses = await Course.findAll({
        include: [
          { model: User, where: { ...keyword ? { name: { [Op.substring]: `${keyword}` } } : {} }, attributes: ['avatar', 'name', 'country', 'teachingStyle'] }
        ],
        raw: true,
        nest: true
      })
      // console.log({ courses, keyword })
      cb(null, {
        courses,
        keyword
      })
    } catch (err) {
      cb(err)
    }
  },
  getCourse: async (req, cb) => {
    try {
      const { id } = req.params
      const course = await Course.findByPk(id, {
        include: [
          User
        ],
        raw: true,
        nest: true
      })
      if (!course) throw new Error('課程不存在')
      const evaluation = await Evaluation.findAll({
        where: { teacherId: course.teacherId },
        raw: true
      })
      const period = periodCut(course.startTime, course.endTime, course.spendTime)

      // console.log({ course, evaluation, period })
      cb(null, { course, evaluation, period })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userServices
