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
      const course = await Course.findAll({
        where: { id },
        include: [
          User,
          { model: User, include: Evaluation }
        ],
        raw: true,
        nest: true
      })
      const teacher = {
        ...course[0]
      }
      const evaluation = []
      course.forEach((index) => {
        evaluation.push({ comment: index.User.Evaluations.comment, score: index.User.Evaluations.score })
      })
      if (!course) throw new Error('課程不存在')
      const period = periodCut(teacher.startTime, teacher.endTime, teacher.spendTime)
      // console.log('原始資料', course)
      // console.log('老師資料', teacher)
      // console.log('評價', evaluation)
      // console.log('上課時段', period)
      cb(null, { teacher, evaluation, period })
    } catch (err) {
      cb(err)
    }
  },
  postBooking: async (req, cb) => {
    try {
      const { courseId, timePeriod } = req.body
      const { id } = req.user
      const repeatBooking = await Booking.findOne({
        where: { courseId, timePeriod },
        raw: true
      })
      if (repeatBooking) throw new Error('課程已被預約過')
      let booking = await Booking.create({
        courseId,
        studentId: id,
        timePeriod
      })
      booking = booking.toJSON()
      const teacher = await Course.findOne({
        where: { id: booking.courseId },
        include: [
          User
        ],
        raw: true,
        nest: true
      })
      const bookingInfo = {
        timePeriod: periodCut(teacher.startTime, teacher.endTime, teacher.spendTime)[timePeriod],
        name: teacher.User.name,
        link: teacher.link

      }
      console.log(bookingInfo)
      cb(null, bookingInfo)
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userServices
