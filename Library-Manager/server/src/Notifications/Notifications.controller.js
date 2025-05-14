// Notifications.controller.js
const Notification = require('./Notifications.model');
const moment = require('moment');

class NotificationsController {
    async getOverdueBooks(req, res) {
        try {
            const masv = req.params.masv;

            // Lấy tất cả các sách của sinh viên
            const borrowedBooks = await Notification.findAll({
                where: { masv: masv },
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

            // Tạo mảng thông báo cho sách quá hạn
            const notifications = overdueBooks.map(book => ({
                message: `Sách "${book.nameBook}" đã đến hạn trả từ ngày ${moment(book.date2).format('DD-MM-YYYY')}. Vui lòng trả lại sớm.`,
                bookId: book.id,
                nameBook: book.nameBook,
                date2: moment(book.date2).format('DD-MM-YYYY'),
                status: 'overdue',
            }));

            return res.status(200).json({
                message: notifications.length > 0 ? 'Danh sách sách quá hạn trả' : 'Không có sách quá hạn.',
                notifications
            });

        } catch (error) {
            console.error('❌ Lỗi NotificationsController:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
        }
    }
}

module.exports = new NotificationsController();
