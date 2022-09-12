const { newService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const createSlug = require('../utils/createSlug');
const fs = require('fs');

const newController = {
    // Client
    // GET /news
    index: catchAsync(async (req, res) => {
        const news = await newService.getAll();
        res.render('new', { news });
    }),

    // GET /news/id
    detail: catchAsync(async (req, res) => {
        const newObj = await newService.get({ slug: req.params.id });
        const news = await newService.getAll();
        res.render('new/detail', { new: newObj, news });
    }),

    // Server
    // GET /admin/news
    getAll: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const news = await newService.getAll();
        res.render('new/getAll', { layout: 'admin', pageName: 'Danh sách tin tức', news, success, error });
    }),

    // GET /admin/news/demo/id
    demo: catchAsync(async (req, res) => {
        const newObj = await newService.get({ slug: req.params.id });
        res.render('new/demo', { pageName: 'Chi tiết tin tức', layout: 'admin', new: newObj });
    }),

    // GET /admin/news/create
    createView: (req, res) => {
        const error = req.flash('error') || '';
        res.render('new/create', { pageName: 'Thêm tin tức', layout: 'admin', error });
    },

    // POST /admin/news/create
    create: catchAsync(async (req, res) => {
        const slug = createSlug(req.body.title);

        const newObj = await newService.get({ slug });
        if (newObj) {
            req.flash('error', 'Tên tin tức đã tồn tại');
            return res.redirect('/admin/news/create');
        }

        const image = `/uploads/new-imgs/${req.file.filename}`;
        await newService
            .create({ ...req.body, image, slug })
            .then(() => {
                req.flash('success', 'Thêm tin tức thành công');
                res.redirect('/admin/news');
            })
            .catch((err) => {
                req.flash('error', 'Thêm tin tức thất bại');
                res.redirect('/admin/news/create');
            });
    }),

    // GET /admin/news/update/id
    updateView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const newObj = await newService.get({ slug: req.params.id });
        res.render('new/update', { pageName: 'Chỉnh sửa tin tức', layout: 'admin', new: newObj, error });
    }),

    // POST /admin/news/update
    update: catchAsync(async (req, res) => {
        const slug = req.params.id;
        const newSlug = createSlug(req.body.title);

        const newObj = await newService.get({ slug: newSlug });
        if (newObj && newObj._id != req.body.id) {
            req.flash('error', 'Tên tin tức đã tồn tại');
            return res.redirect(`/admin/news/update/${slug}`);
        }

        let { image } = await newService.get({ slug });
        if (req.file) {
            fs.unlink(`src/public/${image}`, (err) => {
                if (err) {
                    req.flash('error', 'Cập nhật tin tức thất bại');
                    res.redirect(`/admin/news/update/${slug}`);
                }
            });
            image = '/uploads/new-imgs/' + req.file.filename;
        }

        await newService
            .update(slug, { ...req.body, image, slug: newSlug })
            .then(() => {
                req.flash('success', 'Cập nhật tin tức thành công');
                res.redirect('/admin/news');
            })
            .catch((err) => {
                req.flash('error', 'Cập nhật tin tức thất bại');
                res.redirect(`/admin/news/update/${slug}`);
            });
    }),

    // GET /admin/news/delete/id
    delete: catchAsync(async (req, res) => {
        const { image } = await newService.get({ slug: req.params.id });
        fs.unlink(`src/public/${image}`, (err) => {
            if (err) {
                req.flash('error', 'Xoá tin tức thất bại');
                res.redirect(`/admin/news`);
            }
        });
        await newService
            .delete(req.params.id)
            .then(() => {
                req.flash('success', 'Xoá tin tức thành công');
            })
            .catch((err) => {
                req.flash('error', 'Xoá tin tức thất bại');
            });
        res.redirect('/admin/news');
    }),
};

module.exports = newController;
