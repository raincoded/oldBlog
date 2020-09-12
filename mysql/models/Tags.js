const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
// 标签
module.exports = sequelize.define(
    "Tags",// 表名
    {
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true,
    }
);