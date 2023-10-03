const { getUser, ensureAuthenticated } = require('../helpers/auth-helper')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) return next()
  res.redirect('/signin')
}
const authenticatedStudent = (req, res, next) => {
  if (getUser(req).role === 'student') return next()
  if (getUser(req).role === 'teacher') {
    return res.redirect(`/user/${req.id}/teacher`)
  }
  if (getUser(req).role === 'admin') {
    return res.redirect('/admin/users')
  }
}
const authenticatedTeacher = (req, res, next) => {
  if (getUser(req).role === 'teacher') return next()
  if (getUser(req).role === 'student') {
    return res.redirect('/user/course')
  }
  if (getUser(req).role === 'admin') {
    return res.redirect('/admin/users')
  }
}
const authenticatedAdmin = (req, res, next) => {
  if (getUser(req).role === 'admin') return next()
  if (getUser(req).role === 'student') {
    return res.redirect('/user/course')
  }
  if (getUser(req).role === 'teacher') {
    return res.redirect(`/user/${req.id}/teacher`)
  }
}

module.exports = {
  authenticated,
  authenticatedStudent,
  authenticatedTeacher,
  authenticatedAdmin
}
