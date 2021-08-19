const Purchase = require('@purchases/Purchase');
const Products = require('@products/Product');
const util = require('@purchase_product/UtilPurchase_product');
const Purchase_product = require('@purchase_product/Purchase_product');

module.exports = {

    async index(req, res){
        try{
            const purchases = await Purchase.findAll();
            
            if(purchases != null) {

                var purchasesList = [];

                for(var i=0; i<purchases.length; i++){

                    const purchase = await Purchase.findByPk( purchases[i].dataValues.id );
        
                    if(purchase != null) {
                        
                        const productsInPurchase = await Purchase_product.findAll({
                            where: { purchase_id: purchases[i].dataValues.id }
                        })
                        
                        var listReturn = [];

                        for (var j=0; j < productsInPurchase.length; j++){
                            listReturn.push(await util(productsInPurchase[j]));
                        }
                        purchase.dataValues.products = listReturn;
                        
                        purchasesList.push(purchase);
                    }
                    else return res.status(400).send({"message": "Purchase not found!"});
                }
                

                return res.status(200).send({"Purchases": purchasesList});
            }
            return res.status(400).send({"message": "There are no registered purchases!"});
        }catch(error){
            return res.status(400).send(error.message);
        }
    },

    async show(req, res){
        try{
            const { id } = req.params;

            const purchase = await Purchase.findByPk( id );
        
            if(purchase != null) {
                
                const productsInPurchase = await Purchase_product.findAll({
                    where: { purchase_id: id,}
                })
                
                var listReturn = [];

                for (var i=0; i < productsInPurchase.length; i++){
                    listReturn.push(await util(productsInPurchase[i]));
                }
                purchase.dataValues.products = listReturn;
                return res.status(200).send({"Purchase": purchase});
            }
            return res.status(400).send({"message": "Purchase not found!"});

        }catch(error){
            return res.status(400).send(error.message);
        }
    },

    async save(req, res){
        try{
            const { price, discount, payment_method, products } = req.body;

            var productsForReturn = [] 
            products.forEach( async (product) => {
                
                var productResponse = await Products.findAll({
                    where: {
                        id: product.product_id
                    }
                 });
                
                productResponse[0].dataValues.amount = product.amount;
                productsForReturn.push(productResponse[0].dataValues);
                if (!productResponse) return res.status(400).send({"message": `Product ${product.product_id} not found`});
            
            });

            const purchase = await Purchase.create({ price, discount, payment_method });

            if(purchase) {

                products.forEach( async (product) => {
                    var response = await Products.findOne({
                        where: {
                            id: product.product_id
                        }
                    });
                    
                    var newAmount = response.dataValues.amount - product.amount;
                    
                    await Products.update({ amount: newAmount }, {
                        where: {
                            id: product.product_id
                        }
                     });
                    
                    await Purchase_product.create({ 
                        purchase_id: purchase.id,
                        product_id: product.product_id,
                        amount: product.amount
                    });
                });

                purchase.dataValues.products = productsForReturn;
                
                return res.status(201).send({"Purchase": purchase.dataValues});
            }
            return res.status(400).send({"message": "Error in purchase creation"});

        }catch(error){
            return res.status(400).send(error.message);
        }
    },

    async remove(req, res){
        try{
            const { id } = req.params;

            const purchase = await Purchase.findByPk( id );
        
            if(purchase != null) {
                var products = await Purchase_product.findAll({
                    where: { purchase_id: id},
                });
                
                for(var i=0; i < products.length; i++) {
                    var product = await Products.findByPk( products[i].dataValues.product_id );
                    var sum = product.dataValues.amount+products[i].dataValues.amount;
                    await Products.update( { amount: sum }, { 
                        where: { 
                            id: products[i].dataValues.product_id
                        }
                    });
                }

                await Purchase_product.destroy({
                    where: { purchase_id: id},
                });

                await Purchase.destroy({
                    where: { id: id},
                });

                return res.status(200).send({"Purchase Deleted": `purchase ${id} was deleted with sucess`});
            }
            
            else return res.status(400).send({"message": "Purchase not found!"});

        }catch(error){
            return res.status(400).send(error.message);
        }
    },

    async analytics(req,res) { 

        try {

            const purchases = await Purchase.findAll();

            var totalSold = 0;
            purchases.forEach( (purchase) => { 
                totalSold += purchase.dataValues.price;
            });

            return res.status(200).send({ "totalSold": totalSold });
        } catch(error){
            return res.status(400).send(error.message);
        }
    }

}