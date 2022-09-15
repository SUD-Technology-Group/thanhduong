const { productService, newService, categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const PagesController = {
    // GET /
    index: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        const categories = await categoryService.getAll();
        const news = await newService.getAll();
        res.render('home', { products, news, categories });
    }),

    // GET /about
    about: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        res.render('about', { categories });
    }),

    // GET /contact
    contact: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        res.render('contact', { categories });
    }),

    // GET /sales
    sale: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        const products = await productService.getMany({ 'price.sale': { $ne: null } });
        products.map((product) => {
            product.price.discount = parseInt(
                ((product.price.origin - product.price.sale) * 100) / product.price.origin,
            );
        });
        res.render('sale', { products, categories });
    }),

    // GET /cart
    cart: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const categories = await categoryService.getAll();
        res.render('cart', { success, error, categories });
    }),

    // GET /admin
    admin: (req, res) => {
        res.render('admin', { layout: 'admin' });
    },
};

module.exports = PagesController;
