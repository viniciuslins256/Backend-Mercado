const Purchase = require('@purchases/Purchase');
const Products = require('@products/Product');

module.exports = {

    async index(req, res){
        try{
            const purchases = await Purchase.findAll();
            
            if(purchases.length != 0) return res.status(200).send({"Purchases": purchases});
            return res.status(400).send({"message": "There are no registered purchases!"});
        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async show(req, res){
        try{
            const { id } = req.params;

            const purchase = await Purchase.findByPk( id, {
                include: { association: 'products' }
            });

            if(purchase.length != 0) return res.status(200).send({"Purchase": purchase});
            return res.status(400).send({"message": "Purchase not found!"});

        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async save(req, res){
        try{
            const { price, discount, payment_method, products } = req.body;

            products.forEach( async (product) => {
                
                var response = await Products.findAll({
                    where: {
                        id: product
                    }
                 });
                if (!response) return res.status(400).send({"message": `Product ${product} not found`});
            
            });

            const purchase = await Purchase.create({ price, discount, payment_method });
            
            if(purchase) {
                products.forEach( async (product) => {
                    
                    var response = await Products.findAll({
                        where: {
                            id: product
                        }
                     });
                    await purchase.addProducts(response);
                
                });
                
                return res.status(201).send({"Purchase": purchase});
            }
            return res.status(400).send({"message": "Error in purchase creation"});

        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async remove(req, res){
        try{
            const { id } = req.params;
            
            const product = await Product.destroy({
                where: {
                    id: id
                }
            });

            if(product == 1) return res.status(200).send({ "Product deleted": id });
            return res.status(400).send({ "message": "Product not found!"});

        }catch(error){
            return res.status(400).send(error.message)
        }
    }
}