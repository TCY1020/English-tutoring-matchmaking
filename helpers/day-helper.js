const dayjs = require('dayjs')

const date = day => dayjs(day).format('YYYY年MM月DD日')
// 依老師課程時間分成時段
const periodCut = (startTime, endTime, spendTime) => {
  const start = startTime.getTime()
  const end = endTime.getTime()
  const hour = startTime.getHours()
  const part = (end - start) / 1000 / 60 / 60 / Number(spendTime)
  const timePeriod = []
  if (Number(spendTime) === 1) {
    for (let i = 0; i < part; i++) {
      timePeriod.push(`${hour + i}:00 ~ ${hour + i + 1}:00`)
    }
  } else {
    for (let i = 0; i < part; i++) {
      const timeA = new Date(startTime.getTime())
      const timeB = new Date(startTime.getTime())

      timeA.setMinutes(timeA.getMinutes() + 30 * i)
      timeB.setMinutes(timeB.getMinutes() + 30 * (i + 1))

      const formattedTimeA = `${timeA.getHours().toString().padStart(2, '0')}:${timeA.getMinutes().toString().padStart(2, '0')}`
      const formattedTimeB = `${timeB.getHours().toString().padStart(2, '0')}:${timeB.getMinutes().toString().padStart(2, '0')}`

      timePeriod.push(`${formattedTimeA} ~ ${formattedTimeB}`)
    }
  }
  return timePeriod
}
// 自動推算下一周
const nextWeekStar = (today) => {
  const weekDay = today.getDay()
  switch (weekDay) {
    case 0: today.setDate(today.getDate() + 1); break
    case 1: today.setDate(today.getDate() + 7); break
    case 2: today.setDate(today.getDate() + 6); break
    case 3: today.setDate(today.getDate() + 5); break
    case 4: today.setDate(today.getDate() + 4); break
    case 5: today.setDate(today.getDate() + 3); break
    case 6: today.setDate(today.getDate() + 2); break
  }
  return today
}
// 產出下周課程時間
const weekPlanDate = (startTime, endTime, days, weekStarDate) => {
  const weekPlan = days.map(day => {
    const newDate = new Date(weekStarDate)
    newDate.setDate(newDate.getDate() + Number(day))
    return newDate
  })
  const startTimeH = Number(startTime.slice(0, 2))
  const startTimeM = Number(startTime.slice(3))
  const endTimeH = Number(endTime.slice(0, 2))
  const endTimeM = Number(endTime.slice(3))
  const weekPlanDate = weekPlan.map(index => {
    const startDate = new Date(index)
    const endDate = new Date(index)
    startDate.setUTCHours(startTimeH)
    startDate.setUTCMinutes(startTimeM)
    endDate.setUTCHours(endTimeH)
    endDate.setUTCMinutes(endTimeM)
    return {
      start: startDate,
      end: endDate
    }
  })
  return weekPlanDate
}

module.exports = { date, periodCut, nextWeekStar, weekPlanDate }
