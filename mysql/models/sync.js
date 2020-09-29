// 同步所有模型
require('./Users.js')//用户
require('./Article.js')//点赞
require('./Tags.js')//标签
require('./Comments.js')//评论
require('./Praise.js')//点赞
require('./Every_day.js')

//移除
// require('./移除/Article_Tag_mapping.js')

const sequelize = require("./db");

// 如果表不存在, 则创建该表(如果已经存在, 则不执行任何操作)
sequelize.sync().then(() => {
  console.log("所有模型同步完成");
});
// 将创建表, 如果表已经存在, 则将其首先删除
// sequelize.sync({ alter: true }).then(() => {
//   console.log("所有模型同步完成");
// });

// 这将检查数据库中表的当前状态(它具有哪些列, 它们的数据类型等), 然后在表中进行必要的更改以使其与模型匹配
// sequelize.sync({ alter: true }).then(() => {
//   console.log("所有模型同步完成");
// });
