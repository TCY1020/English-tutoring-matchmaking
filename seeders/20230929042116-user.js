'use strict'
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: ' root@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'root',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: ' user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'user1',
      role: 'student',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: ' user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'user2',
      role: 'student',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: ' user3@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'user3',
      role: 'student',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: ' user4@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'user4',
      role: 'teacher',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: ' user5@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'user5',
      role: 'teacher',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
