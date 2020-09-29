// 标签数据库
const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型

module.exports = sequelize.define(
    "tag",// 表名
    {
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        paranoid: true,
    }
);