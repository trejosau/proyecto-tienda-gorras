'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con OrderProduct
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'productId',
        as: 'orderProducts'  // Alias para acceder a los productos de la orden
      });
    }
  }

  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Asegúrate de que el nombre sea obligatorio
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,  // Asegúrate de que el precio sea obligatorio
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Asegúrate de que el stock sea obligatorio
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,  // La imagen puede ser opcional
    }
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
