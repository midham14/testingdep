'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {

    const dataUser = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))
    dataUser.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Users', dataUser, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
