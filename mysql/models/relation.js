// 设置模型关系
const Users = require('./Users.js')
const Article = require("./Article");
const Tags = require("./Tags");
const Comments = require("./Comments");
const Praise = require('./Praise.js')
const Message = require('./Message.js')

Users.hasMany(Article)//用户有多篇文章
Article.belongsTo(Users) // 每篇文章有一个用户

Article.hasMany(Tags);//文章有多个标签
Tags.belongsTo(Article)//标签有多个文章

Article.hasMany(Comments);//文章有多条评论
Comments.belongsTo(Article) // 每个评论属于一个文章

Users.hasMany(Comments) //用户有多个评论
Comments.belongsTo(Users) // 每个评论属于一个用户

Article.hasMany(Praise) //文章有多个人点赞
Praise.belongsTo(Article) // 每个赞都属于一个文章

Users.hasMany(Praise) //用户有多个点赞
Praise.belongsTo(Users) // 每个赞都属于一个用户

Users.hasMany(Message) //管理员有多个留言
Message.belongsTo(Users) // 每个留言属于管理员

// 移除

// const Admin = require('./Admin.js')
// const Article_Tag_mapping = require('./移除/Article_Tag_mapping.js')

// Admin.hasOne(Users);// 管理员有用户
// Users.belongsTo(Admin);// 用户可能是管理员

// Article.belongsToMany(Tags, { through: 'Article_Tag_mapping'});//文章有多个标签
// Tags.belongsToMany(Article, { through: 'Article_Tag_mapping'});//标签有多个文章


