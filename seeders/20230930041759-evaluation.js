'use strict'
const { Booking, Course } = require('../models')
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const booking = await Booking.findAll({
      include: [
        { model: Course, attributes: ['teacherId'] }
      ],
      raw: true,
      nest: true
    })

    const bookingSlice = booking.slice(0, 4)

    // 新增學生給老師的課程回饋
    await queryInterface.bulkInsert('Evaluations',
      Array.from({ length: bookingSlice.length }, (_, item) => ({
        student_id: bookingSlice[item].studentId,
        booking_id: bookingSlice[item].id,
        teacher_id: bookingSlice[item].Course.teacherId,
        comment: faker.lorem.sentence({ min: 5, max: 15 }),
        score: (Math.floor(Math.random() * 5) + Math.random()).toFixed(1),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Evaluations', {})
  }
}
