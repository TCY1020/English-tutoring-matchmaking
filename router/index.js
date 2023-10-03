const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
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

router.get('/user/course', authenticated, authenticatedStudent, userController.getCourses)
router.get('/', (req, res) => res.redirect('/user/course'))
router.use('/', generalErrorHandler)

module.exports = router
