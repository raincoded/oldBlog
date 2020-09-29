// 每日一句
const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
module.exports = sequelize.define(
    "every_day",// 表名
    {
        content: { // 内容
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        paranoid: true,
    }
);