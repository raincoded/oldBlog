// 链接数据库
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('blog','root','mysql',{
    host:'localhost',
    dialect:'mysql',
    logging:null
})
module.exports = sequelize