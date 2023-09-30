'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courses = await queryInterface.sequelize.query(
      'SELECT * FROM Courses WHERE start_time BETWEEN NOW() AND DATE_ADD( NOW() ,INTERVAL 1 WEEK)',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const studentIds = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE role = 'student'",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const period = []
    const coursesList = []
    coursesList.push(courses.find(course => course.teacher_id === 5))
    coursesList.push(courses.find(course => course.teacher_id === 6))

    coursesList.forEach(course => {
      const startTime = course.start_time.getTime()
      const endTime = course.end_time.getTime()
      const hours = (endTime - startTime) / 1000 / 60 / 60
      const courseId = course.id
      const timePeriod = Array.from({ length: hours / course.spend_time }, (_, item) => (item))
      for (let i = 0; i < 2; i++) {
        period.push({
          courseId,
          timePeriod
        })
      }
    })

    // 新增學生已上過的課程
    await queryInterface.bulkInsert('Bookings', [{
      course_id: 11,
      student_id: 2,
      time_period: 0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 11,
      student_id: 2,
      time_period: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 12,
      student_id: 3,
      time_period: 0,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 12,
      student_id: 3,
      time_period: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 11,
      student_id: 2,
      time_period: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 11,
      student_id: 2,
      time_period: 3,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 12,
      student_id: 3,
      time_period: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 12,
      student_id: 3,
      time_period: 3,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 11,
      student_id: 4,
      time_period: 4,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      course_id: 12,
      student_id: 4,
      time_period: 4,
      created_at: new Date(),
      updated_at: new Date()
    }])

    // 新增學生預約的課程
    await queryInterface.bulkInsert('Bookings',
      Array.from({ length: period.length }, (_, item) => ({
        course_id: period[item].courseId,
        student_id: studentIds[Math.floor(Math.random() * studentIds.length)].id,
        time_period: period[item].timePeriod[item < period[item].timePeriod.length ? item : item - period[item].timePeriod.length],
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {})
  }
}
