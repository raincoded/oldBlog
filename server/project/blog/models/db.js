// 链接数据库
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('blog','root','mysql',{
    host:'localhost',
    dialect:'mysql',
    logging:null
})
// const sequelize = new Sequelize('blog','mymysql','2GEmysql',{
//     host:'121.196.176.42',
//     dialect:'mysql',
//     logging:null
// })
module.exports = sequelize