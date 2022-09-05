const saleController = {
    index: (req, res) => {
        res.render('sale');
    },

    detail: (req, res) => {
        res.render('sale/detail')
    }
};

module.exports = saleController;
