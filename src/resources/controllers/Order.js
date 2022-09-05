const { orderService } = require('../services');
const catchAsync = require('../utils/catchAsync');
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
        const order = await orderService.get({ slug: req.params.id });
        res.render('order/demo', { pageName: 'Chi tiết đơn hàng', layout: 'admin', order });
    }),

    // GET /admin/orders/create
    createView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const orders = await orderService.getAll();
        res.render('order/create', { pageName: 'Thêm đơn hàng', layout: 'admin', orders, error });
    }),

    // POST /admin/orders/create
    create: catchAsync(async (req, res) => {
        const { name, parent } = req.body;
        const slug = createSlug(name);

        const order = await orderService.get({ slug });
        if (order) {
            req.flash('error', 'Tên đơn hàng đã tồn tại');
            return res.redirect('/admin/orders/create');
        }

        await orderService
            .create({ name, parent: parent || null, slug })
            .then(() => {
                req.flash('success', 'Thêm đơn hàng thành công');
                res.redirect('/admin/orders');
            })
            .catch((err) => {
                req.flash('error', 'Thêm đơn hàng thất bại' + err);
                res.redirect('/admin/orders/create');
            });
    }),

    // GET /admin/orders/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const order = await orderService.get({ slug: req.params.id });
        const orders = await orderService.getAll();
        res.render('order/update', { pageName: 'Chỉnh sửa đơn hàng', layout: 'admin', order, orders, error });
    }),

    // POST /admin/orders/update
    update: catchAsync(async (req, res) => {
        const { id, name, parent } = req.body;
        const slug = req.params.id;
        const newSlug = createSlug(name);

        const order = await orderService.get({ slug: newSlug });
        if (order && order._id != id) {
            req.flash('error', 'Tên đơn hàng đã tồn tại');
            return res.redirect(`/admin/orders/update/${slug}`);
        }

        await orderService
            .update(slug, { name, parent: parent || null, slug: newSlug })
            .then(() => {
                req.flash('success', 'Cập nhật đơn hàng thành công');
                res.redirect('/admin/orders');
            })
            .catch((err) => {
                req.flash('error', 'Cập nhật đơn hàng thất bại');
                res.redirect(`/admin/orders/update/${slug}`);
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
