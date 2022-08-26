const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createSlug = require('../utils/createSlug');
const fs = require('fs');

const ProductController = {
    // Client
    // GET /products
    index: catchAsync(async (req, res) => {
        const products = await productService.getAll();
        res.render('product', { products });
    }),

    // GET /products/id
    detail: catchAsync(async (req, res) => {
        const product = await productService.get({ _id: req.params.id });
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

    // GET /admin/products/id
    demo: catchAsync(async (req, res) => {
        const product = await productService.get({ _id: req.params.id });
        res.render('product/demo', { pageName: 'Chi tiết sản phẩm', layout: 'admin', product });
    }),

    // GET /admin/products/create
    createView: (req, res) => {
        const error = req.flash('error') || '';
        res.render('product/create', { pageName: 'Thêm sản phẩm', layout: 'admin', error });
    },

    // POST /admin/products/create
    create: catchAsync(async (req, res) => {
        const { name, category, price, amount, parameter, description } = req.body;
        const slug = createSlug(name);
        let imgs = [];
        req.files.map((f) => {
            let url = '/uploads/' + f.filename;
            imgs.push(url);
        });
        await productService
            .create({
                name,
                imgs,
                category,
                parameter,
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
        const product = await productService.get({ _id: req.params.id });
        res.render('product/update', { pageName: 'Chỉnh sửa sản phẩm', layout: 'admin', product, error });
    }),

    // POST /admin/products/update
    update: catchAsync(async (req, res) => {
        const { id, name, category, price, amount, parameter, description } = req.body;
        const slug = createSlug(name);
        let { imgs } = await productService.get({ _id: id });

        if (req.files.length > 0) {
            imgs.forEach((item) => {
                fs.unlink(`src/public/${item}`, (err) => {
                    if (err) {
                        req.flash('error', 'Cập nhật thông tin sản phẩm thất bại');
                        res.redirect(`/admin/products/update/${id}`);
                    }
                });
            });
            imgs = [];
            req.files.map((f) => {
                let url = '/uploads/' + f.filename;
                imgs.push(url);
            });
        }

        await productService
            .update(id, {
                name,
                imgs,
                category,
                parameter,
                description,
                price,
                amount,
                slug,
            })
            .then(() => {
                req.flash('success', 'Chỉnh sửa sản phẩm thành công');
                res.redirect('/admin/products');
            })
            .catch((err) => {
                req.flash('error', 'Chỉnh sửa sản phẩm thất bại ' + err);
                res.redirect(`/admin/products/update/${id}`);
            });
    }),

    // GET /admin/products/delete/id
    delete: catchAsync(async (req, res) => {
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
