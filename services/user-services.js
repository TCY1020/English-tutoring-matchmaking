const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { date } = require('../helpers/day-helper')
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
        where: { startTime: { [Op.gt]: Date.now() } },
        include: [
          { model: User, where: { ...keyword ? { name: { [Op.substring]: `${keyword}` } } : {} }, attributes: ['avatar', 'name', 'country', 'teachingStyle'] }
        ],
        raw: true,
        nest: true
      })
      const coursesData = courses.map(course => ({
        ...course,
        courseDate: date(course.startTime)
      }))
      cb(null, {
        coursesData,
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
  },
  getStudent: async (req, cb) => {
    try {
      const { id } = req.params
      const student = await User.findByPk(id, { raw: true })
      if (!student) throw new Error('使用者不存在')
      const booking = await Booking.findAll({
        where: { studentId: student.id },
        include: [
          { model: Course, where: { startTime: { [Op.gt]: Date.now() } } },
          { model: Course, where: { startTime: { [Op.gt]: Date.now() } }, include: User }
        ],
        raw: true,
        nest: true
      })
      const comments = await Booking.findAll({
        where: { studentId: student.id },
        include: [
          { model: Course, where: { startTime: { [Op.lt]: Date.now() } } },
          { model: Course, where: { startTime: { [Op.lt]: Date.now() } }, include: User },
          { model: Evaluation }
        ],
        raw: true,
        nest: true
      })
      const uncomments = comments.filter((index) => index.Evaluation.comment === null)
      cb(null, { student, booking, uncomments })
    } catch (err) {
      cb(err)
    }
  },
  getComment: async (req, cb) => {
    try {
      const { bookingId } = req.params
      const booking = await Booking.findByPk(bookingId, {
        include: [Course],
        raw: true,
        nest: true
      })
      if (!booking) throw new Error('課程不存在')
      cb(null, { booking })
    } catch (err) {
      cb(err)
    }
  },
  postComment: async (req, cb) => {
    try {
      const { score, comment, bookingId, teacherId } = req.body
      const { id } = req.user
      const booking = await Booking.findByPk(bookingId, { raw: true })
      if (!booking) throw new Error('課程不存在')
      let evaluation = await Evaluation.create({
        studentId: id,
        teacherId,
        bookingId,
        comment,
        score
      })
      evaluation = evaluation.toJSON()
      console.log(evaluation)
      cb(null, evaluation)
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userServices
