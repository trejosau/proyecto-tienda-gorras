'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con el cliente (User)
      Order.belongsTo(models.User, {
        foreignKey: 'clientId',  // Clave foránea que apunta al modelo User
        as: 'client'
      });

      // Relación con el repartidor (User)
      Order.belongsTo(models.User, {
        foreignKey: 'deliveryPersonId',
        as: 'deliveryPerson'
      });

      // Relación con los productos de la orden (OrderProduct)
      Order.hasMany(models.OrderProduct, {
        foreignKey: 'orderId'  // Clave foránea en OrderProduct
      });

      // Relación con la entrega (Delivery)
      Order.hasOne(models.Delivery, {
        foreignKey: 'orderId'
      });
    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    deliveryPersonId_final: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    google_maps_location: {
      type: DataTypes.STRING,
      allowNull: true,  // Se puede dejar nulo si no siempre se tiene la ubicación
    }
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
