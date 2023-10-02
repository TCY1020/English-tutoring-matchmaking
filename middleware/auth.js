const { getUserRole, ensureAuthenticated } = require('../helpers/auth-helper')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) return next()
  res.redirect('/signin')
}
const authenticatedStudent = (req, res, next) => {
  if (getUserRole(req) === 'student') return next()
  if (getUserRole(req) === 'teacher') {
    return res.redirect(`/user/${req.id}/teacher`)
  }
  if (getUserRole(req) === 'admin') {
    return res.redirect('/admin/users')
  }
}
const authenticatedTeacher = (req, res, next) => {
  if (getUserRole(req) === 'teacher') return next()
  if (getUserRole(req) === 'student') {
    return res.redirect('/user/course')
  }
  if (getUserRole(req) === 'admin') {
    return res.redirect('/admin/users')
  }
}
const authenticatedAdmin = (req, res, next) => {
  if (getUserRole(req) === 'admin') return next()
  if (getUserRole(req) === 'student') {
    return res.redirect('/user/course')
  }
  if (getUserRole(req) === 'teacher') {
    return res.redirect(`/user/${req.id}/teacher`)
  }
}

module.exports = {
  authenticated,
  authenticatedStudent,
  authenticatedTeacher,
  authenticatedAdmin
}
