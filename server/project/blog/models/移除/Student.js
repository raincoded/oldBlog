const sequelize = require('./db');
const { DataTypes } = require('sequelize')

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true,
    timestamps: true,
})


module.exports = Student


