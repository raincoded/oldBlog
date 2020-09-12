const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('blog','root','mysql',{
    host:'localhost',
    dialect:'mysql',
})
module.exports = sequelize