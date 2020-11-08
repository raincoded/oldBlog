// 数据库初始化，搭建数据库mysql
// require('./server/project/blog/initMysql')

// 路由层router
require('./server/init.js')

// 服务层server
const Service = require('./server/project/blog/initServer');

// 模拟数据mock
// require('./until/mock/init')

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

/*
01 07 09 12 18 22 - 04  1
12 13 14 18 30 32 - 02  1
04 10 17 19 28 32 - 01  1+1+1+1
13 19 25 26 27 32 - 08  2+1
02 06 15 21 22 23 - 16  1

04 09 10 22 28 32 - 08 

04 08 09 13 19 33	12
03 11 13 20 24 30	16
07 15 16 18 20 27	06
03 10 16 21 25 27	12
03 11 14 16 21 32	04

02 08 11 17 21 30	09
02 08 21 25 26 30	10

01 07 09 12 18 22 - 04  1
12 13 14 18 30 32 - 02  1
04 07 17 19 28 32 - 01  1+1+1+1
13 19 25 26 27 32 - 07  2+1
02 06 15 21 22 23 - 16  1


07	08	14	19	26	29 - 12
11	17	20	22	28	32 - 01
02	06	07	12	31	32 - 05
12	16	17	21	22	23 - 16
04	08	17	28	29	30 - 13

*/