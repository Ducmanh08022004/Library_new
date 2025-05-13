const modelBook = require('./Book.model');

const modelBorrowBooks = require('../BorrowBooks/BorrowBooks.model');

const { Op } = require('sequelize');

class ControllerBooks {
    async getAllBooks(req, res) {
        const data = await modelBook.findAll();
        res.status(200).json(data);
    }

    async createBook(req, res) {
        const { category, nameBook, author, language, quantity, content } = req.body;

        const img = req.file.filename;

        const data = await modelBook.create({
            category,
            nameBook,
            author,
            language,
            quantity,
            images: img,
            content,
        });
        await data.save();
        res.status(201).json({ message: 'Thêm Sách Thành Công !!!' });
    }

    async searchBooks(req, res) {
        const { nameBook } = req.query;
        try {
            const data = await modelBook.findAll({
                where: {
                    nameBook: {
                        [Op.regexp]: nameBook,
                    },
                },
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error occurred', error });
        }
    }

    async deleteBook(req, res) {
        const { id, nameBook } = req.body;

        const findBrrowBook = await modelBorrowBooks.findAll({ where: { nameBook: nameBook } });
        if (findBrrowBook.status === '1') {
            return res.status(500).json({ message: 'Sách đang được mượn, không thể xóa !!!' });
        } else {
            await modelBook.destroy({ where: { id } });

            return res.status(200).json({ message: 'Xóa Sách Thành Công !!!' });
        }
    }
}

module.exports = new ControllerBooks();
