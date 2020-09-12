const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
// 每日一句
module.exports = sequelize.define(
    "Every_day",// 表名
    {
        content: { // 内容
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true,
    }
);