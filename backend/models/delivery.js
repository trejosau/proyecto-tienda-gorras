'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define la asociación entre Delivery y Order
      // Delivery pertenece a un Order (una entrega está asociada a una orden)
      Delivery.belongsTo(models.Order, {
        foreignKey: 'orderId',  // Clave foránea que apunta a la tabla Order
        as: 'order'  // Nombre de la relación, puedes usarlo para acceder al Order desde Delivery
      });
    }
  }

  Delivery.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,  // Cambié el tipo a UUID porque `Order` tiene uuid como clave primaria
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimated_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Delivery',
  });

  return Delivery;
};
