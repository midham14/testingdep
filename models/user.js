'use strict';

const {
  Model
} = require('sequelize');
const encrypt = require('../helpers/getencrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static passwordHash(password) {
      return encrypt(password)
    }

    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: models.Purchased })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};