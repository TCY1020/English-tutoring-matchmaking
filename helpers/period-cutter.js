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

module.exports = { periodCut }
