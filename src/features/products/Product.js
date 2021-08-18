const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
      super.init({
          name: DataTypes.STRING,
          cost_price: DataTypes.FLOAT,
          sale_price: DataTypes.FLOAT,
          amount: DataTypes.INTEGER,
      }, {
          sequelize
      })  
    }

    static associate(models) { 
        this.belongsToMany(models.Purchase, { foreignKey: 'product_id', through: 'purchase_products', as: 'purchase'});
    }
}

module.exports = Product;