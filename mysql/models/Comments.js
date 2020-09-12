const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
// 评论
module.exports = sequelize.define(
    "Comment",// 表名
    {
        content: { // 评论内容
            type: DataTypes.TEXT,
            allowNull: false,
        },
        parent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        author: { // 评论者
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: { // 评论者的邮箱
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true,
    }
);