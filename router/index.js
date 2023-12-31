const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const upload = require('../middleware/multer')
const { generalErrorHandler } = require('../middleware/error-handle')
const { authenticated, authenticatedStudent, authenticatedTeacher, authenticatedAdmin } = require('../middleware/auth')
const userController = require('../controllers/user-controller')

router.get('/signup', userController.getSignUpPage)
router.post('/signup', userController.postSignUp)
router.get('/signin', userController.getSignInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.postSignIn)
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signin' }), userController.postSignIn)
router.get('/logout', userController.logout)

// Admin路由
router.get('/admin/users', authenticated, authenticatedAdmin, userController.getUsers)

// 老師路由
router.get('/user/:id/teacher/edit', authenticated, authenticatedTeacher, userController.getTeacherEdit)
router.put('/user/:id/teacher/edit', authenticated, authenticatedTeacher, upload.single('image'), userController.putTeacherEdit)
router.get('/user/:id/teacher', authenticated, authenticatedTeacher, userController.getTeacher)

// 學生路由
router.get('/user/course/:id', authenticated, authenticatedStudent, userController.getCourse)
router.post('/user/course/booking', authenticated, authenticatedStudent, userController.postBooking)
router.get('/user/course', authenticated, authenticatedStudent, userController.getCourses)
router.get('/user/:id/applyTeacher', authenticated, authenticatedStudent, userController.getApplyTeacherPage)
router.post('/user/:id/applyTeacher', authenticated, authenticatedStudent, userController.postApplyTeacherPage)
router.get('/user/:id/edit', authenticated, authenticatedStudent, userController.getStudentEdit)
router.put('/user/:id/edit', authenticated, authenticatedStudent, upload.single('image'), userController.putStudentEdit)
router.post('/user/comment', authenticated, authenticatedStudent, userController.postComment)
router.get('/user/:bookingId/comment', authenticated, authenticatedStudent, userController.getComment)
router.get('/user/:id', authenticated, authenticatedStudent, userController.getStudent)

router.get('/', (req, res) => res.redirect('/user/course'))
router.use('/', generalErrorHandler)

module.exports = router
