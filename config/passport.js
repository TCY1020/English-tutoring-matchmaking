const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const bcrypt = require('bcryptjs')
const { User, Evaluation, Course, Booking } = require('../models')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async (req, email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) return cb(null, false, req.flash('error_messages', '帳號密碼輸入錯誤'))
      const isMach = await bcrypt.compare(password, user.password)
      if (!isMach) return cb(null, false, req.flash('error_messages', '帳號密碼輸入錯誤'))
      return cb(null, user)
    } catch (err) {
      cb(err)
    }
  }
))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    // console.log(profile)
    const { name, email } = profile._json
    const fbUser = await User.findOne({ where: { email } })
    if (fbUser) return cb(null, fbUser)
    const randomPassword = Math.random().toString(36).slice(-8)
    const saltPassword = await bcrypt.hash(randomPassword, 10)
    const user = await User.create({
      name,
      email,
      password: saltPassword
    })
    cb(null, user)
  } catch (err) {
    cb(err)
  }
}))
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Evaluation, as: 'StudentEvaluations' },
        { model: Course },
        { model: Booking }
      ]
    })
    // console.log(user.toJSON())
    return cb(null, user.toJSON())
  } catch (err) {
    cb(err)
  }
})

module.exports = passport
