class NewsController {
    show(req, res) {
        res.render('news');
    }

    content(req, res) {
        res.render('news__detail');
    }
}

module.exports = new NewsController();
