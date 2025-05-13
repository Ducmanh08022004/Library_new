const cron = require('node-cron');
const modelBorrowBooks = require('../BorrowBooks/BorrowBooks.model');

const controllerCheckBook = () => {
    // Lên lịch chạy cron job mỗi ngày vào lúc 00:00:00
    cron.schedule('*/5 * * * * *', async () => {
        try {
            // Lấy tất cả các bản ghi từ BorrowBooks
            const borrowBooks = await modelBorrowBooks.findAll();

            // Duyệt qua từng bản ghi
            for (const record of borrowBooks) {
                const { date1, date2 } = record;

                // Chuyển đổi date1 và date2 thành đối tượng Date
                const dateStart = new Date(date1);
                const dateEnd = new Date(date2);

                // Tính toán số ngày giữa date2 và date1
                const diffTime = dateEnd - dateStart; // tính hiệu thời gian
                const diffDays = diffTime / (1000 * 60 * 60 * 24); // chuyển đổi sang ngày

                // Nếu số ngày âm, cập nhật status
                if (diffDays < 0) {
                    await modelBorrowBooks.update(
                        { status: '2' }, // Cập nhật status thành '2'
                        { where: { id: record.id } }, // Sử dụng ID để xác định bản ghi cần cập nhật
                    );
                }
                console.log(`Đã xử lý  người dùng  được mở khóa.`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    });
};

module.exports = controllerCheckBook;
