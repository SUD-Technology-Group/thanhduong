const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const HomeController = {
    index: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        res.render('home', { products });
    }),
};

module.exports = HomeController;
