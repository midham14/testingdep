'use strict';
const fs = require('fs')

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      const dataProduct = JSON.parse(fs.readFileSync('./product.json'))
      dataProduct.forEach(element => {
        element.createdAt = new Date()
        element.updatedAt = new Date()
      });
      return queryInterface.bulkInsert('Products',dataProduct,{})
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    console.log('masuk')
    return queryInterface.bulkDelete('Products',null,{})
  }
};
