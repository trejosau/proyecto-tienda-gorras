'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con las órdenes como cliente
      User.hasMany(models.Order, {
        foreignKey: 'clientId',  // Clave foránea en la tabla Order
        as: 'orders'  // Alias para acceder a las órdenes desde un User
      });

      // Relación con las órdenes como repartidor
      User.hasMany(models.Order, {
        foreignKey: 'deliveryPersonId',  // Clave foránea en la tabla Order
        as: 'deliveries'  // Alias para acceder a las entregas de un User
      });

      // Relación con las entregas
      User.hasMany(models.Delivery, {
        foreignKey: 'userId',  // Clave foránea en la tabla Delivery
        as: 'userDeliveries'  // Alias para acceder a las entregas de un User
      });
    }
  }

  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
