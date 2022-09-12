const { orderService, customerService, productService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createCode = require('../utils/createCode');
const createSlug = require('../utils/createSlug');

const orderController = {
    // Server
    // GET /admin/orders
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const orders = await orderService.getAll();
        res.render('order/getAll', { layout: 'admin', pageName: 'Danh sách đơn hàng', orders, success, error });
    }),

    // GET /admin/orders/demo/id
    demo: catchAsync(async (req, res) => {
        const order = await orderService.get({ code: req.params.id });
        res.render('order/demo', { pageName: 'Chi tiết đơn hàng', layout: 'admin', order });
    }),

    // POST /admin/orders/create
    create: catchAsync(async (req, res) => {
        let customer = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            slug: createSlug(req.body.name),
        };
        const foundCustomer = await customerService.get({ slug: customer.slug });
        if (foundCustomer) customer = foundCustomer;
        else customer = await customerService.create({ ...customer });

        const cart = JSON.parse(req.body.products);
        const productsName = cart.map((item) => item.name);
        const products = await productService.getMany({ name: { $in: productsName } }, '_id name -category');
        const items = [];
        cart.map((item) => {
            products.map((product) => {
                if (item.name == product.name) {
                    items.push({ product, quantity: item.count, total: item.count * item.price });
                }
            });
        });

        await orderService
            .create({
                code: createCode(),
                customer,
                items,
                total: req.body.total,
                status: '<span class="badge badge-pill badge-warning">Chờ xử lý</span>',
            })
            .then(() => {
                req.flash('success', 'Đặt hàng thành công');
                res.redirect('/cart');
            })
            .catch((err) => {
                req.flash('error', 'Đặt hàng thất bại ' + err);
                res.redirect('/cart');
            });
    }),

    // GET /admin/orders/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const order = await orderService.get({ slug: req.params.id });
        res.render('order/update', { pageName: 'Chỉnh sửa đơn hàng', layout: 'admin', order, error });
    }),

    // POST /admin/orders/update
    update: catchAsync(async (req, res) => {
        let customer = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            slug: createSlug(req.body.name),
        };
        const foundCustomer = await customerService.get({ slug: customer.slug });
        if (foundCustomer) customer = foundCustomer;
        else customer = await customerService.create({ ...customer });

        const productsName = JSON.parse(req.body.products[0]).map((item) => item.name);
        const products = await productService.getMany({ name: { $in: productsName } });

        await orderService
            .update(code, { ...req.body, slug: newSlug })
            .then(() => {
                req.flash('success', 'Cập nhật đơn hàng thành công');
                res.redirect('/admin/orders');
            })
            .catch((err) => {
                req.flash('error', 'Cập nhật đơn hàng thất bại');
                res.redirect(`/admin/orders/update/${code}`);
            });
    }),

    // GET /admin/orders/delete/id
    delete: catchAsync(async (req, res) => {
        await orderService
            .delete(req.params.id)
            .then(() => {
                req.flash('success', 'Xoá đơn hàng thành công');
            })
            .catch((err) => {
                req.flash('error', 'Xoá đơn hàng thất bại');
            });
        res.redirect('/admin/orders');
    }),
};

module.exports = orderController;
