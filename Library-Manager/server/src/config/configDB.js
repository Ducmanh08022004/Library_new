const { Sequelize } = require('sequelize');
require('dotenv').config();

const connect = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: 3306,
});

const connectDB = async () => {
    try {
        await connect.authenticate();
        console.log('Connect Database Success!');
    } catch (error) {
        console.error('error connect database:', error);
    }
};

// In ra kết nối để xem thông tin
connectDB().then(() => {
    console.log('Đã kết nối tới cơ sở dữ liệu.');
}).catch((err) => {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
});

module.exports = { connectDB, connect };
