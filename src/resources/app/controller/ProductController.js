class ProductController {
    show(req, res) {
        res.render('product');
    }
    detail(req, res) {
        res.render('detail');
    }
}

module.exports = new ProductController();
