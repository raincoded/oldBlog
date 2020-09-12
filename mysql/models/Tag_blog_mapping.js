const sequelize = require("./db");
// const { DataTypes } = require("sequelize");//使用类型
// 标签
module.exports = sequelize.define(
    "tags",// 表名
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true,
    }
);