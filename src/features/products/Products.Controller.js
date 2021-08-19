const Product = require('@products/Product');
const { handleFields } = require('./UtilProduct');

module.exports = {

    async index(req, res){
        try{
            const products = await Product.findAll();
            
            if(products.length != 0) return res.status(200).send({"Products": products});
            return res.status(400).send({"message": "There are no registered products!"});
        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async show(req, res){
        try{
            const { id } = req.params;

            const product = await Product.findAll({
                where: {
                    id: id
                }
             });

            if(product.length != 0) return res.status(200).send({"Product": product});
            return res.status(400).send({"message": "Product not found!"});

        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async save(req, res){
        try{
            const { name, cost_price, sale_price, amount } = req.body;

            const product = await Product.create({ name, cost_price, sale_price, amount });
            
            if(product) return res.status(201).send({"Product": product});
            return res.status(400).send({"message": "Error in product creation"});

        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async update(req, res){
        try{
            const datas = handleFields(req.body);
            const { id } = req.params;

            const product = await Product.update( datas, {
                where: {
                    id: id
                }
            });

            if(product) return res.status(200).send({"Product updated": id});
            return res.status(400).send({"message": "Error in product updated"});

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