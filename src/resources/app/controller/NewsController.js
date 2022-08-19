class NewsController {
    show(req, res) {
        res.render('news');
    }
}

module.exports = new NewsController();
