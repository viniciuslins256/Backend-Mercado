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

    static associate(models) { 
        this.belongsToMany(models.Products, { foreignKey: 'purchase_id', through: 'purchase_products', as: 'products'});
    }
}

module.exports = Product;