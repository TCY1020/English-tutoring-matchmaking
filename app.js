if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const router = require('./router')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const session = require('express-session')
const { getUser } = require('./helpers/auth-helper')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', engine({ helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')) // 這個是一個 middleware，最常被用在要讀取一些靜態檔案上面

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  res.locals.user = getUser(req)
  next()
})
app.use(router)
app.listen(port, () => {
  console.info(`Example app listening on http://localhost:${port}/`)
})
