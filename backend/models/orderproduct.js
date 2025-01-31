'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con Order
      OrderProduct.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'  // Alias para acceder a la orden desde OrderProduct
      });

      // Relación con Product
      OrderProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'  // Alias para acceder al producto desde OrderProduct
      });
    }
  }

  OrderProduct.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,  // Cambié a UUID porque Order usa UUID
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,  // Cambié a UUID porque Product usa UUID
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });

  return OrderProduct;
};
