module.exports = {
    handleFields(fields) {
        const fieldsHandled = {};

        if (fields.name !== "" && fields.name) {
            fieldsHandled["name"] = fields.name;
        }

        if (fields.cost_price !== "" && fields.cost_price) {
            fieldsHandled["cost_price"] = fields.cost_price;
        }

        if (fields.sale_price !== "" && fields.sale_price) {
            fieldsHandled["sale_price"] = fields.sale_price;
        }

        if(fields.amount !== "" && fields.amount){
            fieldsHandled["amount"] = fields.amount;
        }

        return fieldsHandled;
    }
}