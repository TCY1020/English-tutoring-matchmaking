'use strict'
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      account: 'root',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: faker.person.fullName(),
      account: 'user1',
      role: 'student',
      country: faker.location.county(),
      introduction: faker.lorem.sentence({ min: 5, max: 15 }),
      avatar: faker.image.avatar(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: faker.person.fullName(),
      account: 'user2',
      role: 'student',
      country: faker.location.county(),
      introduction: faker.lorem.sentence({ min: 5, max: 15 }),
      avatar: faker.image.avatar(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user3@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: faker.person.fullName(),
      account: 'user3',
      role: 'student',
      country: faker.location.county(),
      introduction: faker.lorem.sentence({ min: 5, max: 15 }),
      avatar: faker.image.avatar(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user4@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: faker.person.fullName(),
      account: 'user4',
      role: 'teacher',
      country: faker.location.county(),
      teaching_style: faker.lorem.sentence({ min: 5, max: 15 }),
      avatar: faker.image.avatar(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user5@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: faker.person.fullName(),
      account: 'user5',
      role: 'teacher',
      country: faker.location.county(),
      teaching_style: faker.lorem.sentence({ min: 5, max: 15 }),
      avatar: faker.image.avatar(),
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
