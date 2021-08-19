const { Model, DataTypes } = require('sequelize');

class Purchase_product extends Model {
    static init(sequelize) {
      super.init({
            purchase_id: DataTypes.STRING,
            product_id: DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
      }, {
          sequelize
      })  
    }
}

module.exports = Purchase_product;