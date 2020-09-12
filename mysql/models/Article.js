const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
// 文章
module.exports = sequelize.define(
    "Article",// 表名
    {
        title: {// 标题
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        author: {// 作者
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {// 内容
            type: DataTypes.TEXT,
            allowNull: false,
        },
        views: { // 浏览次数
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag: { // 标签
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true,
    }
);