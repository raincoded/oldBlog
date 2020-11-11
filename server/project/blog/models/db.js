// 链接数据库
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('blog','root','mysql',{
    host:'localhost',
    dialect:'mysql',
    logging:null
})
// 链接数据库
// const {Sequelize} = require('sequelize');
// const sequelize = new Sequelize('blog','mymysql','2GEmysql',{
//     host:'rm-bp1g9emtmt2e17cg45o.mysql.rds.aliyuncs.com',
//     dialect:'mysql',
//     logging:null
// })
module.exports = sequelize
module.exports = sequelize

