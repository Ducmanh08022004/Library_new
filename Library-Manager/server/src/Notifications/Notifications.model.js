// Notifications/Notifications.model.js
const { DataTypes } = require('sequelize');
const { connect } = require('../config/configDB');

const Notification = connect.define('BorrowBooks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    masv: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    nameBook: { type: DataTypes.STRING },
    author: { type: DataTypes.STRING },
    language: { type: DataTypes.STRING },
    images: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    khoa: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    date1: { type: DataTypes.DATE },
    date2: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
}, {
    tableName: 'BorrowBooks',
    timestamps: false,
    freezeTableName: true
});

module.exports = Notification;
