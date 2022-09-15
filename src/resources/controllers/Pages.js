const { productService, newService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const PagesController = {
    // GET /
    index: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        const news = await newService.getAll();
        res.render('home', { products, news });
    }),

    // GET /about
    about: (req, res) => {
        res.render('about');
    },

    // GET /contact
    contact: (req, res) => {
        res.render('contact');
    },

    // GET /sales
    sale: catchAsync(async (req, res) => {
        const products = await productService.getMany({ 'price.sale': { $ne: null } });
        products.map((product) => {
            product.price.discount = parseInt(
                ((product.price.origin - product.price.sale) * 100) / product.price.origin,
            );
        });
        res.render('sale', { products });
    }),

    // GET /cart
    cart: (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        res.render('cart', { success , error });
    },

    // GET /admin
    admin: (req, res) => {
        res.render('admin', { layout: 'admin' });
    },
};

module.exports = PagesController;
