const Products = require('@products/Product');

module.exports = async function util(arrow){
                    
    var product = await Products.findOne({
        where: { id: arrow.dataValues.product_id }
    })
    product.dataValues.amount = arrow.amount;

    return product.dataValues;
}