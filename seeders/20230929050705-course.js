'use strict'
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const teachers = await queryInterface.sequelize.query(
      "SELECT * FROM Users WHERE role = 'teacher'",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const list = []
    teachers.forEach(teacher => {
      for (let i = 0; i < 5; i++) {
        list.push(teacher)
      }
    })

    const time = [0.5, 1]

    const workTime = []
    for (let i = 0; i < 8; i++) {
      const startDate = new Date()
      const endDate = new Date()
      startDate.setDate(startDate.getDate() + i)
      startDate.setHours(18, 0, 0)
      endDate.setDate(endDate.getDate() + i)
      endDate.setHours(startDate.getHours() + 4, 0, 0)
      workTime.push({
        start: startDate,
        end: endDate
      })
    }
    workTime.push(...workTime)
    // 新增未來的開課
    await queryInterface.bulkInsert('Courses',
      Array.from({ length: 10 }, (_, item) => ({
        teacher_id: list[item].id,
        course_name: faker.commerce.product(),
        start_time: workTime[item].start,
        end_time: workTime[item].end,
        spend_time: time[Math.floor(Math.random() * time.length)],
        link: faker.internet.url(),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
    // 新增過期的開課
    await queryInterface.bulkInsert('Courses', [{
      teacher_id: 5,
      course_name: faker.commerce.product(),
      start_time: new Date(2023, 7, 27, 2, 0),
      end_time: new Date(2023, 7, 27, 7, 0),
      spend_time: '0.5',
      link: faker.internet.url(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      teacher_id: 6,
      course_name: faker.commerce.product(),
      start_time: new Date(2023, 7, 27, 2, 0),
      end_time: new Date(2023, 7, 27, 7, 0),
      spend_time: '0.5',
      link: faker.internet.url(),
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', {})
  }
}
