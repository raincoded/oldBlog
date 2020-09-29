// 数据库初始化，搭建数据库mysql
// require('./mysql/models/init')

// 路由层router
require('./server/routes/init.js')

// 服务层server
const Service = require('./server/services/init');

// 模拟数据mock
require('./until/mock/init')

// 用户

// Service.UserService.getUserAll().then(req=>{
//     console.log(req);
// })

// 添加用户
// Service.UserService.addUsers().then(req => {
//     console.log('成功结果', req);
// }).catch(err => {
//     console.log('失败结果', err);
// })

// 获取用户
// Service.UserService.getUserById(23).then(req => {
//     console.log('成功结果', req);
// }).catch(err => {
//     console.log('失败结果', err);
// })


// 标签
// Service.TagService.addTags({
//     tag:'三养大',
//     articleId:45
// }).then(req=>{
//     console.log('添加标签',req);
// })

// Service.TagService.getTagsAll({id:44}).then(req=>{
//     console.log('查询所有tags',req);
// })

// 以下已禁用，改为 getTagsAll
// Service.TagService.getTagsByTag('厂四斯').then(req=>{
//     console.log('通过标签查询tags',req);
// })

// Service.TagService.getTagsById(53).then(req=>{
//     console.log('通过id查询tags',req);
// })

// 评论 
// Service.CommentService.getTagsAll({
//     articleId:1
// }).then(req=>{
//     console.log(req);
// })

// 点赞
// 某个人给某个文章点赞
// Service.PraiseService.addPraise({
//     userId:1,
//     articleId:2
// })

// 删除某个人对某个文章的点赞
// Service.PraiseService.deletePraise({
//     articleId:2,
//     userId:1
// })

// 获取所有点赞
// Service.PraiseService.getPraiseAll({
//     articleId:1
// }).then(req=>{
//     console.log('多少点赞了',req);
// })

