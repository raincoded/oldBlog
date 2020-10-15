// 评论数据库
const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
module.exports = sequelize.define(
    "comment",// 表名
    {
        articleId: { // 被评论的文章
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: { // 评论内容
            type: DataTypes.TEXT,
            allowNull: false,
        },
        parent: { //被评论人
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: { // 评论者
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mainId: { // 评论id,表示属于哪条主评论下
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        secondId: {  // 评论id,表示属于哪条次评论下
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    },
    {
        paranoid: true,
    }
);