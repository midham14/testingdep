'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addConstraint('Purchaseds', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_user',
      references: {
        //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
      .then(() => {
        return queryInterface.addConstraint('Purchaseds', {
          fields: ['ProductId'],
          type: 'foreign key',
          name: 'custom_fkey_constraint_product',
          references: {
            //Required field
            table: 'Products',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      })
  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeConstraint('Purchaseds', 'UserId', {}),
      queryInterface.removeConstraint('Purchaseds', 'ProductId', {})
    ])

  }
};