const dayjs = require('dayjs')

const date = day => dayjs(day).format('YYYY年MM月DD日')

module.exports = { date }
