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
}

module.exports = Product;