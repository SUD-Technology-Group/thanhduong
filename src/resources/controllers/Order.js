const { orderService, customerService, productService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createCode = require('../utils/createCode');

const orderController = {
    // Server
    // GET /admin/orders
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const query = [
            '<span class="badge badge-pill badge-success">Hoàn tất</span>',
            '<span class="badge badge-pill badge-danger">Huỷ</span>',
        ];
        const orders = await orderService.getMany({ status: { $nin: query } });
        res.render('order/getAll', { layout: 'admin', pageName: 'Danh sách đơn hàng', orders, success, error });
    }),

    // GET /admin/orders/demo/id
    demo: catchAsync(async (req, res) => {
        const order = await orderService.get({ code: req.params.id });
        res.render('order/demo', { pageName: 'Chi tiết đơn hàng', layout: 'admin', order });
    }),

    // GET /admin/orders/log
    log: catchAsync(async (req, res) => {
        const query = [
            '<span class="badge badge-pill badge-success">Hoàn tất</span>',
            '<span class="badge badge-pill badge-danger">Huỷ</span>',
        ];
        const orders = await orderService.getMany({ status: { $in: query } });
        res.render('order/log', { pageName: 'Lịch sử giao dịch', layout: 'admin', orders });
    }),

    // POST /admin/orders/create
    create: catchAsync(async (req, res) => {
        let customer = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
        };
        const foundCustomer = await customerService.get({ phone: customer.phone });
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
            })
            .catch((err) => {
                req.flash('error', 'Đặt hàng thất bại');
            });
        res.redirect('/cart');
    }),

    // GET /admin/orders/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const order = await orderService.get({ code: req.params.id });
        res.render('order/update', { pageName: 'Chỉnh sửa đơn hàng', layout: 'admin', order, error });
    }),

    // POST /admin/orders/update/id
    update: catchAsync(async (req, res) => {
        let customer = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
        };
        const foundCustomer = await customerService.get({ phone: customer.phone });
        if (foundCustomer) customer = await customerService.update(foundCustomer.phone, { ...customer });
        else {
            customer = await customerService.create({ ...customer });
            const oldPhone = (await orderService.get({ code: req.params.id }, 'customer')).customer.phone;
            await customerService.delete(oldPhone);
        }

        await orderService
            .update(req.params.id, { customer, status: req.body.status })
            .then(() => {
                req.flash('success', 'Cập nhật đơn hàng thành công');
                res.redirect('/admin/orders');
            })
            .catch((err) => {
                req.flash('error', 'Cập nhật đơn hàng thất bại');
                res.redirect(`/admin/orders/update/${req.body.code}`);
            });
    }),

    // GET /admin/orders/cancel/id
    cancel: catchAsync(async (req, res) => {
        await orderService
            .update(req.params.id, { status: '<span class="badge badge-pill badge-danger">Huỷ</span>' })
            .then(() => {
                req.flash('success', 'Huỷ đơn hàng thành công');
            })
            .catch((err) => {
                req.flash('error', 'Huỷ đơn hàng thất bại');
            });
        res.redirect('/admin/orders/log');
    }),
};

module.exports = orderController;
