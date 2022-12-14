const { productService, categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createSlug = require('../utils/createSlug');
const fs = require('fs');

const ProductController = {
    // Client
    // GET /products
    index: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        const products = await productService.getMany({
            name: { $regex: req.query.search || '', $options: 'i' },
        });
        const categoryList = [];
        products.map((item) => {
            if (item.category.parent) categoryList.push(item.category.parent.name);
            categoryList.push(item.category.name);
        });
        const queryCategories = await categoryService.getMany({ name: { $in: Array.from(new Set(categoryList)) } });
        res.render('product', { products, queryCategories, categories });
    }),

    // GET /:category
    getByCategory: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        const category = await categoryService.get({ slug: req.params.category });
        if (!category) {
            return res.render('error', { title: 'Page not found', layout: '' });
        }
        const queryCategories = await categoryService.getMany({ parent: category });
        queryCategories.push(category);
        const products = await productService.getMany({ category: { $in: queryCategories } });
        res.render('product', { products, queryCategories, categories });
    }),

    // GET /:category/:slug
    detail: catchAsync(async (req, res) => {
        const product = await productService.get({ slug: req.params.slug });
        const products = await productService.getMany(
            {
                category: product.category,
                _id: { $ne: product._id },
            },
            null,
            {
                limit: 4,
            },
        );
        const categories = await categoryService.getAll();
        res.render('product/detail', { products, product, categories });
    }),

    // Server
    // GET /admin/products
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const products = await productService.getAll();
        res.render('product/getAll', { layout: 'admin', pageName: 'Danh s??ch s???n ph???m', products, success, error });
    }),

    // GET /admin/products/demo/id
    demo: catchAsync(async (req, res) => {
        const product = await productService.get({ slug: req.params.id });
        res.render('product/demo', { pageName: 'Chi ti???t s???n ph???m', layout: 'admin', product });
    }),

    // GET /admin/products/create
    createView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const categories = await categoryService.getAll();
        res.render('product/create', { pageName: 'Th??m s???n ph???m', layout: 'admin', categories, error });
    }),

    // POST /admin/products/create
    create: catchAsync(async (req, res) => {
        const slug = createSlug(req.body.name);

        const product = await productService.get({ slug });
        if (product) {
            req.flash('error', 'T??n s???n ph???m ???? t???n t???i');
            return res.redirect('/admin/products/create');
        }

        let images = [];
        req.files.map((f) => {
            let url = '/uploads/product-imgs/' + f.filename;
            images.push(url);
        });

        const category = req.body.category || null;
        const price = { origin: req.body.price, sale: req.body.sale };

        let property = { new: false, feature: false };
        if (req.body.property) {
            if (req.body.property == 'M???i') property.new = true;
            else if (req.body.property == 'N???i b???t') property.feature = true;
            else property = { new: true, feature: true };
        }

        await productService
            .create({ ...req.body, price, images, slug, category, property })
            .then(() => {
                req.flash('success', 'Th??m s???n ph???m th??nh c??ng');
                res.redirect('/admin/products');
            })
            .catch((err) => {
                req.flash('error', 'Th??m s???n ph???m th???t b???i');
                res.redirect('/admin/products/create');
            });
    }),

    // GET /admin/products/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const product = await productService.get({ slug: req.params.id });
        const categories = await categoryService.getAll();
        res.render('product/update', { pageName: 'Ch???nh s???a s???n ph???m', layout: 'admin', categories, product, error });
    }),

    // POST /admin/products/update/:id
    update: catchAsync(async (req, res) => {
        const slug = req.params.id;
        const newSlug = createSlug(req.body.name);

        const product = await productService.get({ slug: newSlug, _id: { $ne: req.body.id } });
        if (product) {
            req.flash('error', 'T??n s???n ph???m ???? t???n t???i');
            return res.redirect(`/admin/products/update/${slug}`);
        }

        let { images } = await productService.get({ slug });
        if (req.files.length > 0) {
            images.forEach((item) => {
                fs.unlink(`src/public/${item}`, (err) => {
                    if (err) {
                        req.flash('error', 'C???p nh???t s???n ph???m th???t b???i');
                        res.redirect(`/admin/products/update/${slug}`);
                    }
                });
            });
            images = [];
            req.files.map((f) => {
                let url = '/uploads/product-imgs/' + f.filename;
                images.push(url);
            });
        }

        const category = req.body.category || null;
        const price = { origin: req.body.price, sale: req.body.sale };

        let property = { new: false, feature: false };
        if (req.body.property) {
            if (req.body.property == 'M???i') property.new = true;
            else if (req.body.property == 'N???i b???t') property.feature = true;
            else property = { new: true, feature: true };
        }

        await productService
            .update(slug, { ...req.body, price, images, slug, category, property })
            .then(() => {
                req.flash('success', 'C???p nh???t s???n ph???m th??nh c??ng');
                res.redirect('/admin/products');
            })
            .catch((err) => {
                req.flash('error', 'C???p nh???t s???n ph???m th???t b???i');
                res.redirect(`/admin/products/update/${slug}`);
            });
    }),

    // GET /admin/products/delete/id
    delete: catchAsync(async (req, res) => {
        const { images } = await productService.get({ slug: req.params.id });
        images.forEach((item) => {
            fs.unlink(`src/public/${item}`, (err) => {
                if (err) {
                    req.flash('error', 'Xo?? s???n ph???m th???t b???i');
                    res.redirect('/admin/products');
                }
            });
        });
        await productService
            .delete(req.params.id)
            .then(() => {
                req.flash('success', 'Xo?? s???n ph???m th??nh c??ng');
            })
            .catch((err) => {
                req.flash('error', 'Xo?? s???n ph???m th???t b???i');
            });
        res.redirect('/admin/products');
    }),
};

module.exports = ProductController;
