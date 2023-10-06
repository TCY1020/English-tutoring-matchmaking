const userServices = require('../services/user-services')

const userController = {
  getSignUpPage: (req, res) => {
    res.render('signup')
  },
  postSignUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '成功註冊帳號！')
      res.redirect('/signin')
    })
  },
  getSignInPage: (req, res) => {
    res.render('signin')
  },
  postSignIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/user/course')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  },
  getCourses: (req, res, next) => {
    userServices.getCourses(req, (err, data) => err ? next(err) : res.render('courses', data))
  },
  getCourse: (req, res, next) => {
    userServices.getCourse(req, (err, data) => err ? next(err) : res.render('teacher_profile', data))
  },
  postBooking: (req, res, next) => {
    userServices.postBooking(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', `上課時段 : ${data.timePeriod} 老師 : ${data.name} 視訊連結 : ${data.link}`)
      res.redirect('back')
    })
  },
  getStudent: (req, res, next) => {
    userServices.getStudent(req, (err, data) => err ? next(err) : res.render('student_profile', data))
    // userServices.getStudent(req)
    // res.render('student_profile')
  },
  getComment: (req, res, next) => {
    userServices.getComment(req, (err, data) => err ? next(err) : res.render('comment', data))
    // userServices.getComment(req)
    // res.render('comment')
  },
  postComment: (req, res, next) => {
    userServices.postComment(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '評價成功')
      res.redirect(`/user/${data.studentId}`)
    })
  }
}

module.exports = userController
