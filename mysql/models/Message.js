// 留言数据库
const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
module.exports = sequelize.define(
    "message",// 表名
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: { // 留言内容
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reply: { // 留言内容
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        paranoid: true,
    }
);