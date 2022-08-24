const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createSlug = require('../utils/createSlug');
const fs = require('fs');

const ProductController = {
    // Client
    index: (req, res) => {
        res.render('Product');
    },

    detail: catchAsync(async (req, res) => {
        const id = req.params.id;
        const product = await productService.getById(id);
        res.render('Product/detail', product);
    }),

    // Server
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const products = await productService.getAll();
        res.render('product/getAll', { layout: 'admin', pageName: 'Danh sách sản phẩm', products, success, error });
    }),

    createView: (req, res) => {
        const error = req.flash('error') || '';
        res.render('product/create', { pageName: 'Thêm sản phẩm', layout: 'admin', error });
    },

    create: catchAsync(async (req, res) => {
        const { name, category, price, amount, parameter, description } = req.body;
        const slug = createSlug(name);
        const file = req.files;
        let imgs = [];
        if (!file) {
            res.json({ code: 1, message: 'error' });
        } else {
            file.map((f) => {
                let url = '/uploads/' + f.filename;
                imgs.push(url);
            });
        }

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
                req.flash('error', 'Thêm sản phẩm thất bại ' + err);
                res.redirect('/admin/products/create');
            });
    }),

    updateView: catchAsync(async (req, res) => {
        const id = req.params.id;
        const error = req.flash('error') || '';
        const product = await productService.getById(id);
        res.render('product/update', { pageName: 'Chỉnh sửa sản phẩm', layout: 'admin', product, error });
    }),

    update: catchAsync(async (req, res) => {
        const { id, name, category, price, amount, parameter, description } = req.body;
        const slug = createSlug(name);
        let { imgs } = await productService.getById(id);

        if (req.files.length > 0) {
            imgs.forEach((item) => {
                fs.unlink(`src/public/${item}`, (err) => {
                    if (err) {
                        req.flash('error', 'Cập nhật thông tin sản phẩm thất bại');
                        console.log(err);
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

    delete: catchAsync(async (req, res) => {
        const id = req.params.id;
        await productService
            .delete(id)
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