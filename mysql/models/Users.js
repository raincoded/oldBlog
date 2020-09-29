// 用户数据库
const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
module.exports = sequelize.define(
    "user",// 表名
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        paranoid: true,
    }
);