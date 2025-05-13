const modelUser = require('../User/User.model');
const modelBook = require('../Books/Book.model');
const modelBorrowBooks = require('../BorrowBooks/BorrowBooks.model');

class controllerAdmin {
    async getAllUsers(req, res) {
        const data = await modelUser.findAll();
        return res.status(200).json(data);
    }

    async getAllBooks(req, res) {
        const sumQuantityBooks = await modelBook.sum('quantity');
        const sumQuantityBorrowBooks = await modelBorrowBooks.sum('quantity');

        return res.status(200).json({ sumQuantityBooks, sumQuantityBorrowBooks });
    }

    async topAuthor(req, res) {
        const data = await modelBorrowBooks.findAll({
            attributes: [
                'author',
                [modelBorrowBooks.sequelize.fn('SUM', modelBorrowBooks.sequelize.col('quantity')), 'sumQuantity'],
            ],
            group: ['author'],
            order: [['sumQuantity', 'DESC']],
            limit: 5,
        });
        return res.status(200).json(data);
    }

    async topBooks(req, res) {
        try {
            const data = await modelBook.findAll({
                attributes: [
                    'nameBook',
                    'images',
                    [modelBook.sequelize.fn('SUM', modelBook.sequelize.col('quantity')), 'sumQuantity'],
                ],
                group: ['nameBook', 'images'],
                order: [['sumQuantity', 'DESC']],
                limit: 5,
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new controllerAdmin();
