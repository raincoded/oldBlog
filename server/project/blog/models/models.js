// 此文件用于给服务层调用所有模型和联表查询所用
require('./relation')
module.exports = {
    Users: require('./Users.js'),//用户
    Article: require('./Article.js'),//点赞
    Tags: require('./Tags.js'),//标签
    Comments: require('./Comments.js'),//评论
    Message: require('./Message.js'), // 留言
    db:require('./db')
}
// Praise: require('./移除/Praise.js'),//点赞
// Essays: require('./移除/Essays.js'), //