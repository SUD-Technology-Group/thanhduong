const { productService, categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createSlug = require('../utils/createSlug');
const fs = require('fs');

const ProductController = {
    // Client
    // GET /products
    index: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        const categories = await categoryService.getAll();
        res.render('product', { products, categories });
    }),

    // GET /products/id
    detail: catchAsync(async (req, res) => {
        const product = await productService.get({ slug: req.params.id });
        res.render('product/detail', { product });
    }),

    // Server
    // GET /admin/products
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const products = await productService.getAll();
        res.render('product/getAll', { layout: 'admin', pageName: 'Danh sách sản phẩm', products, success, error });
    }),

    // GET /admin/products/demo/id
    demo: catchAsync(async (req, res) => {
        const product = await productService.get({ slug: req.params.id });
        res.render('product/demo', { pageName: 'Chi tiết sản phẩm', layout: 'admin', product });
    }),

    // GET /admin/products/create
    createView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const categories = await categoryService.getAll();
        res.render('product/create', { pageName: 'Thêm sản phẩm', layout: 'admin', categories, error });
    }),

    // POST /admin/products/create
    create: catchAsync(async (req, res) => {
        const { name, category, price, amount, description } = req.body;
        const slug = createSlug(name);

        const product = await productService.get({ slug });
        if (product) {
            req.flash('error', 'Tên sản phẩm đã tồn tại');
            return res.redirect('/admin/products/create');
        }

        let images = [];
        req.files.map((f) => {
            let url = '/uploads/product-imgs/' + f.filename;
            images.push(url);
        });
        await productService
            .create({
                name,
                images,
                category: category || null,
                description,
                price,
                amount,
                slug,
            })
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                res.redirect('/admin/products');
            })
            .catch((err) => {
                req.flash('error', 'Thêm sản phẩm thất bại');
                res.redirect('/admin/products/create');
            });
    }),

    // GET /admin/products/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const product = await productService.get({ slug: req.params.id });
        const categories = await categoryService.getAll();
        res.render('product/update', { pageName: 'Chỉnh sửa sản phẩm', layout: 'admin', categories, product, error });
    }),

    // POST /admin/products/update/:id
    update: catchAsync(async (req, res) => {
        const { id, name, category, price, amount, description } = req.body;
        const slug = req.params.id;
        const newSlug = createSlug(name);

        const product = await productService.get({ slug: newSlug });
        if (product && product._id != id) {
            req.flash('error', 'Tên sản phẩm đã tồn tại');
            return res.redirect(`/admin/products/update/${slug}`);
        }

        let { images } = await productService.get({ slug });
        if (req.files.length > 0) {
            images.forEach((item) => {
                fs.unlink(`src/public/${item}`, (err) => {
                    if (err) {
                        req.flash('error', 'Cập nhật sản phẩm thất bại');
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

        await productService
            .update(slug, {
                name,
                images,
                category: category || null,
                description,
                price,
                amount,
                slug: newSlug,
            })
            .then(() => {
                req.flash('success', 'Cập nhật sản phẩm thành công');
                res.redirect('/admin/products');
            })
            .catch((err) => {
                req.flash('error', 'Cập nhật sản phẩm thất bại');
                res.redirect(`/admin/products/update/${slug}`);
            });
    }),

    // GET /admin/products/delete/id
    delete: catchAsync(async (req, res) => {
        const { images } = await productService.get({ slug: req.params.id });
        images.forEach((item) => {
            fs.unlink(`src/public/${item}`, (err) => {
                if (err) {
                    req.flash('error', 'Xoá sản phẩm thất bại');
                    res.redirect('/admin/products');
                }
            });
        });
        await productService
            .delete(req.params.id)
            .then(() => {
                req.flash('success', 'Xoá sản phẩm thành công');
            })
            .catch((err) => {
                req.flash('error', 'Xoá sản phẩm thất bại');
            });
        res.redirect('/admin/products');
    }),
};

module.exports = ProductController;
