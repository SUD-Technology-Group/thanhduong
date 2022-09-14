const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const saleController = {
    index: catchAsync(async (req, res) => {
        const products = await productService.getMany({ 'price.sale': { $ne: null } });
        products.map((product) => {
            product.price.discount = parseInt(
                ((product.price.origin - product.price.sale) * 100) / product.price.origin,
            );
        });
        res.render('sale', { products });
    }),
};

module.exports = saleController;
