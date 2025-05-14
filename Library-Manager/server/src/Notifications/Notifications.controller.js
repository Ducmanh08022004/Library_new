const Notification = require('./Notifications.model');
const moment = require('moment');

class NotificationsController {
    async getOverdueBooks(req, res) {
        try {
            const username = req.params.username;
            console.log("Received username:", username);

            // Lấy tất cả các sách của sinh viên
            const borrowedBooks = await Notification.findAll({
                where: { username: username },
                order: [['date2', 'ASC']],
            });

            if (!borrowedBooks || borrowedBooks.length === 0) {
                return res.status(200).json({
                    message: 'Sinh viên chưa mượn sách nào.',
                    notifications: []
                });
            }

            // Lọc sách quá hạn
            const overdueBooks = borrowedBooks.filter(book => {
                return moment(book.date2).isBefore(moment(), 'day');
            });

            // Lọc sách sắp đến hạn trong vòng 1 ngày
            const dueSoonBooks = borrowedBooks.filter(book => {
                return moment(book.date2).isBetween(moment(), moment().add(1, 'days'), null, '[]');
            });

            // Tạo mảng thông báo cho sách quá hạn
            const overdueNotifications = overdueBooks.map(book => ({
                message: `Sách "${book.nameBook}" đã đến hạn trả từ ngày ${moment(book.date2).format('DD-MM-YYYY')}. Vui lòng trả lại sớm.`,
                bookId: book.id,
                nameBook: book.nameBook,
                date2: moment(book.date2).format('DD-MM-YYYY'),
                status: 'overdue',
            }));

            // Tạo mảng thông báo cho sách sắp đến hạn
            const dueSoonNotifications = dueSoonBooks.map(book => ({
                message: `Sách "${book.nameBook}" sắp đến hạn trả vào ngày ${moment(book.date2).format('DD-MM-YYYY')}. Vui lòng chuẩn bị trả.`,
                bookId: book.id,
                nameBook: book.nameBook,
                date2: moment(book.date2).format('DD-MM-YYYY'),
                status: 'dueSoon',
            }));

            return res.status(200).json({
                message: 'Danh sách sách quá hạn và sắp đến hạn trả.',
                notifications: [...overdueNotifications, ...dueSoonNotifications]
            });

        } catch (error) {
            console.error('❌ Lỗi NotificationsController:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
        }
    }
}

module.exports = new NotificationsController();
