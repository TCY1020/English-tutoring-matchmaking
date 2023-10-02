const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handle')
const userController = require('../controllers/user-controller')

router.get('/signup', userController.getSignUpPage)
router.post('/signup', userController.postSignUp)
router.get('/signin', userController.getSignInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.postSignIn)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }, userController.postSignIn))
router.get('/logout', userController.logout)
router.get('/', (req, res) => res.send('aaaa'))
router.use('/', generalErrorHandler)

module.exports = router
