const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userServices = {
  signUp: async (req, cb) => {
    try {
      const { email, password, passwordCheck } = req.body
      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('Email 已註冊過')
      if (password !== passwordCheck) throw new Error('密碼不符')
      const passwordSalt = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        email,
        password: passwordSalt
      })
      newUser.password = null
      cb(null, { user: newUser })
    } catch (err) {
      cb(err)
    }
  },
  getUser: async (req, cb) => {
    try {
      const user = 'first student'
      return cb(null, { user })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userServices
