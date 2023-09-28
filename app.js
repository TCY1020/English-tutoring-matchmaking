const express = require('express')
const router = require('./router')
const { engine } = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(router)
app.listen(port, () => {
  console.info(`Example app listening on http://localhost:${port}/`)
})
