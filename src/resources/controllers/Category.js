const { categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createSlug = require('../utils/createSlug');

const categoryController = {
    // Server
    // GET /admin/categories
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const categories = await categoryService.getAll();
        res.render('category/getAll', { layout: 'admin', pageName: 'Danh sách danh mục', categories, success, error });
    }),

    // GET /admin/categories/create
    createView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const categories = await categoryService.getAll();
        res.render('category/create', { pageName: 'Thêm danh mục', layout: 'admin', categories, error });
    }),

    // POST /admin/categories/create
    create: catchAsync(async (req, res) => {
        const slug = createSlug(req.body.name);

        const category = await categoryService.get({ slug });
        if (category) {
            req.flash('error', 'Tên danh mục đã tồn tại');
            return res.redirect('/admin/categories/create');
        }

        const parent = req.body.parent || null;

        await categoryService
            .create({ ...req.body, parent, slug })
            .then(() => {
                req.flash('success', 'Thêm danh mục thành công');
                res.redirect('/admin/categories');
            })
            .catch((err) => {
                req.flash('error', 'Thêm danh mục thất bại' + err);
                res.redirect('/admin/categories/create');
            });
    }),

    // GET /admin/categories/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const category = await categoryService.get({ slug: req.params.id });
        const categories = await categoryService.getAll();
        res.render('category/update', { pageName: 'Chỉnh sửa danh mục', layout: 'admin', category, categories, error });
    }),

    // POST /admin/categories/update/id
    update: catchAsync(async (req, res) => {
        const slug = req.params.id;
        const newSlug = createSlug(req.body.name);

        const category = await categoryService.get({ slug: newSlug, _id: { $ne: req.body.id } });
        if (category) {
            req.flash('error', 'Tên danh mục đã tồn tại');
            return res.redirect(`/admin/categories/update/${slug}`);
        }

        const parent = req.body.parent || null;

        await categoryService
            .update(slug, { ...req.body, parent, slug: newSlug })
            .then(() => {
                req.flash('success', 'Cập nhật danh mục thành công');
                res.redirect('/admin/categories');
            })
            .catch((err) => {
                req.flash('error', 'Cập nhật danh mục thất bại');
                res.redirect(`/admin/categories/update/${slug}`);
            });
    }),

    // GET /admin/categories/delete/id
    delete: catchAsync(async (req, res) => {
        await categoryService
            .delete(req.params.id)
            .then(() => {
                req.flash('success', 'Xoá danh mục thành công');
            })
            .catch((err) => {
                req.flash('error', 'Xoá danh mục thất bại');
            });
        res.redirect('/admin/categories');
    }),
};

module.exports = categoryController;
