const NewController = {
    index: (req, res) => {
        res.render('new');
    },

    detail: (req, res) => {
        res.render('new/detail');
    },
};

module.exports = NewController;
