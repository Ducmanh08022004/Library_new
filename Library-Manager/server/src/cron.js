const cron = require('node-cron');
const { connect } = require('./config/configDB'); // Cấu hình Sequelize
const BorrowBook = require('./BorrowBooks/BorrowBooks.model'); // khi bạn import, nó trả về trực tiếp object hoặc class BorrowBooks, không phải một object chứa thuộc tính BorrowBook.
const Notification = require('./Notifications/Notifications.model'); // Model thông báo

console.log('✅ File cron.js đã chạy');

// Chạy mỗi phút để test (sau khi xong, đổi lại '0 0 * * *')
cron.schedule('* * * * *', async () => {
    console.log('🕛 Bắt đầu kiểm tra sách quá hạn...');

    try {
        const borrowBooks = await BorrowBook.findAll({
            where: {
                date2: { [connect.Sequelize.Op.lt]: new Date() },
                status: { [connect.Sequelize.Op.ne]: 'returned' }
            }
        });

        console.log(`📚 Số lượng sách quá hạn: ${borrowBooks.length}`);

        for (const record of borrowBooks) {
            const message = `Sách "${record.nameBook}" đã quá hạn. Vui lòng trả sách.`;

            await Notification.create({
                user_id: record.masv,
                message: message
            });

            console.log(`🔔 Đã tạo thông báo cho sinh viên: ${record.masv}`);
        }
    } catch (error) {
        console.error('❌ Lỗi khi kiểm tra sách quá hạn:', error);
    }
});