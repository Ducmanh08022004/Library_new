const { DataTypes } = require('sequelize');
const { connect } = require('../config/configDB');

const user = connect.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

user.sync({ force: false })
    .then(() => {
        console.log('User table has been created.');
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });

module.exports = user;
