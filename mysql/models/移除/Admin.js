// 文章数据库
const sequelize = require("../db");
const { DataTypes } = require("sequelize");//使用类型
module.exports = sequelize.define(
    "admin",// 管理员
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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