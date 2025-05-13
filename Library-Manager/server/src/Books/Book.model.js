const { DataTypes } = require('sequelize');
const { connect } = require('../config/configDB');

const books = connect.define('books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nameBook: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

books
    .sync({ force: false })
    .then(() => {
        console.log('User table has been created.');
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });

module.exports = books;
