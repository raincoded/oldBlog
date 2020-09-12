// 同步所有模型
require('./Article')
require('./Tags.js')
require('./Every_day.js')
require('./Comments.js')

const sequelize = require("./db");
sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
