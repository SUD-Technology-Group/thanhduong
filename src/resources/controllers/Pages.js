const { productService, newService, categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const nodeMailer = require('../utils/nodeMailer');

const PagesController = {
    // GET /
    index: catchAsync(async (req, res) => {
        const products = await productService.getMany({});
        const categories = await categoryService.getAll();
        const news = await newService.getAll();
        res.render('home', { products, news, categories });
    }),

    // GET /about
    about: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        res.render('about', { categories });
    }),

    // GET /contact
    contactView: catchAsync(async (req, res) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const categories = await categoryService.getAll();
        res.render('contact', { categories, success, error });
    }),

    // POST /contact
    contact: catchAsync(async (req, res) => {
        const mainOptions = {
            // thiết lập đối tượng, nội dung gửi mail
            from: process.env.EMAIL_HOST,
            to: process.env.EMAIL_RECEIVER,
            subject: 'Thông tin khách hàng cần tư vấn',
            text: 'You recieved message from ' + req.body.email,
            html: `<p>Thông tin khách hàng cần tư vấn</p>  
                <ul>
                    <li><strong>Họ và tên: </strong> ${req.body.name}</li>
                    <li><strong>Email: </strong> ${req.body.email}</li>
                    <li><strong>Số điện thoại: </strong> ${req.body.phone}</li>
                    <li><strong>Nội dung: </strong> ${req.body.content}</li>
                </ul>`,
        };
        nodeMailer.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
                req.flash('error', 'Liên hệ thất bại');
                res.redirect('/contact');
            } else {
                console.log('success');
                req.flash('success', 'Đăng ký thành công. Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!');
                res.redirect('/contact');
            }
        });
    }),

    // GET /sales
    sale: catchAsync(async (req, res) => {
        const categories = await categoryService.getAll();
        const products = await productService.getMany({ 'price.sale': { $ne: null } });
        products.map((product) => {
            product.price.discount = parseInt(
                ((product.price.origin - product.price.sale) * 100) / product.price.origin,
            );
        });
        res.render('sale', { products, categories });
    }),

    // GET /cart
    cart: catchAsync(async (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const categories = await categoryService.getAll();
        res.render('cart', { success, error, categories });
    }),

    // GET /admin
    admin: (req, res) => {
        res.render('admin', { layout: 'admin' });
    },
};

module.exports = PagesController;
