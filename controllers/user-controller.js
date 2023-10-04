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
  }
}

module.exports = userController
