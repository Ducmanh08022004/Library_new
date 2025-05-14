const modelBorrowBooks = require('./BorrowBooks.model');
const modelBook = require('../Books/Book.model');
const { jwtDecode } = require('jwt-decode');

class BorrowBooks {
    // Method to borrow books
    async BorrowBooksUser(req, res) {
        const { masv, username, khoa, quantity, type, date1, date2, idBook } = req.body;
        const token = req.headers.cookie.split('=')[1];
        if (!token) return;
        const dataUser = jwtDecode(token);
        const findBook = await modelBook.findOne({ where: { id: idBook } });

        if (findBook.quantity < quantity) {
            return res.status(500).json({ message: 'Số lượng sách trong kho không đủ !!!' });
        }

        try {
            const data = await modelBorrowBooks.create({
                masv,
                username,
                email: dataUser.email,
                khoa,
                quantity,
                type,
                date1,
                date2,
                nameBook: findBook.nameBook,
                author: findBook.author,
                category: findBook.category,
                language: findBook.language,
                images: findBook.images,
                status: '1',
                content: findBook.content,
            });
            await data.save();
            await modelBook.update({ quantity: findBook.quantity - quantity }, { where: { id: idBook } });

            return res.status(200).json({ message: 'Mượn sách thành công !!!' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Có lỗi xảy ra', error });
        }
    }

    // Method to get all borrowed books
    async getAllBorrowBooks(req, res) {
    const cookie = req.headers.cookie;
    if (!cookie) return res.status(401).json({ message: 'Chưa đăng nhập' });

    const token = cookie.split('=')[1];
    const dataUser = jwtDecode(token);

    if (!dataUser) {
        return res.status(500).json({ message: 'Có lỗi xảy ra' });
    }

    try {
        let whereClause = {};
        if (!dataUser.isAdmin) {
            whereClause.email = dataUser.email;
        }

        const data = await modelBorrowBooks.findAll({ where: whereClause });

        const today = new Date();

        // Cập nhật trạng thái nếu quá hạn
        for (const item of data) {
            const expirationDate = new Date(item.date2);
            if (item.status === '1' && expirationDate < today) {
                await modelBorrowBooks.update(
                    { status: '2' },
                    { where: { id: item.id } }
                );
                item.status = '2'; // cập nhật local response luôn
            }
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Lỗi getAllBorrowBooks:', error);
        return res.status(500).json({ message: 'Có lỗi server', error: error.message });
    }
}

    // Method to return a borrowed book
    async returnBook(req, res) {
        const { id } = req.body;

        try {
            // Kiểm tra xem id có được truyền không
            if (!id) {
                return res.status(400).json({ message: 'Thiếu id mượn sách' });
            }

            // Tìm bản ghi mượn sách
            const borrowRecord = await modelBorrowBooks.findOne({ where: { id } });

            if (!borrowRecord) {
                return res.status(404).json({ message: 'Không tìm thấy bản ghi mượn sách' });
            }

            // Tìm sách để cộng lại số lượng
            const book = await modelBook.findOne({ where: { nameBook: borrowRecord.nameBook } });

            if (book) {
                await modelBook.update(
                    { quantity: book.quantity + borrowRecord.quantity },
                    { where: { id: book.id } }
                );
            }

            // Xóa bản ghi mượn sách
            await modelBorrowBooks.destroy({ where: { id } });

            return res.status(200).json({ message: 'Trả sách thành công!' });
        } catch (error) {
            console.error('Lỗi trả sách:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi trả sách', error });
        }
    }
}

module.exports = new BorrowBooks();
