'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchased extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchased.belongsTo(models.User)
      Purchased.belongsTo(models.Product)
    }
  };
  Purchased.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(instance, opt) {
        if (instance.name == "Yeeza") {
          instance.price -= instance.price * 10 / 100
        }
      }
    },
    sequelize,
    modelName: 'Purchased',
  });
  return Purchased;
};