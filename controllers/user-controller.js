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
    const { role, id } = req.user
    if (role === 'teacher') res.redirect(`/user/${id}/teacher`)
    if (role === 'student') res.redirect('/user/course')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  },
  getCourses: (req, res, next) => {
    userServices.getCourses(req, (err, data) => err ? next(err) : res.render('student/courses', data))
  },
  getCourse: (req, res, next) => {
    userServices.getCourse(req, (err, data) => err ? next(err) : res.render('student/teacher_profile', data))
  },
  postBooking: (req, res, next) => {
    userServices.postBooking(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', `上課時段 : ${data.timePeriod} 老師 : ${data.name} 視訊連結 : ${data.link}`)
      res.redirect('back')
    })
  },
  getStudent: (req, res, next) => {
    userServices.getStudent(req, (err, data) => err ? next(err) : res.render('student/student_profile', data))
  },
  getComment: (req, res, next) => {
    userServices.getComment(req, (err, data) => err ? next(err) : res.render('student/comment', data))
    // userServices.getComment(req)
    // res.render('comment')
  },
  postComment: (req, res, next) => {
    userServices.postComment(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '評價成功')
      res.redirect(`/user/${req.user.id}`)
    })
  },
  getStudentEdit: (req, res, next) => {
    userServices.getStudentEdit(req, (err, data) => err ? next(err) : res.render('student/student_edit', data))
  },
  putStudentEdit: (req, res, next) => {
    userServices.putStudentEdit(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '資料修改成功')
      res.redirect(`/user/${req.user.id}`)
    })
  },
  getApplyTeacherPage: (req, res, next) => {
    userServices.getApplyTeacherPage(req, (err, data) => err ? next(err) : res.render('teacher/apply_teacher', data))
  },
  postApplyTeacherPage: (req, res, next) => {
    userServices.postApplyTeacherPage(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '申請成功')
      res.redirect(`/user/${req.user.id}/teacher`)
    })
    // userServices.postApplyTeacherPage(req)
  }
}

module.exports = userController
