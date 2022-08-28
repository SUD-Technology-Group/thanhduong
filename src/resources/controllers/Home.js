const { productService, newService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const HomeController = {
    index: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        const news = await newService.getAll();
        res.render('home', { products, news });
    }),
};

module.exports = HomeController;
