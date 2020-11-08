// 标签和文章关联
const sequelize = require("./db");
const { DataTypes } = require("sequelize");//使用类型
module.exports = sequelize.define(
    "Art_Tag_mapping",// 表名
    {
        articleId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        tagId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        paranoid: true,
    }
);