const { Model, DataTypes } = require('sequelize');

class Purchase extends Model {
    static init(sequelize) {
      super.init({
          price: DataTypes.FLOAT,
          discount: DataTypes.FLOAT,
          payment_method: DataTypes.STRING,
      }, {
          sequelize
      })  
    }
}

module.exports = Purchase;