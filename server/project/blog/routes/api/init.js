// 其他请求
// app.use("/blog/api/user", require('./api/user'));
// app.use("/blog/api/admin", require('./api/admin'));
// app.use("/blog/api/article", require('./api/article'));
// app.use("/blog/api/comment", require('./api/comment'));
// app.use("/blog/api/tag", require('./api/tag'));
// app.use("/blog/api/praise", require('./api/praise'));
// app.use("/blog/api/essays", require('./api/essays'));
// app.use("/blog/api/message", require('./api/message'));
// app.use("/blog/api/other", require('./api/other'));

// module.exports = [{
//     url: '/blog/api/user',
//     module: './blog/routes/api/user'
// }, {
//     url: '/blog/api/admin',
//     module: './blog/routes/api/admin'
// }, {
//     url: '/blog/api/article',
//     module: './blog/routes/api/article'
// }, {
//     url: '/blog/api/comment',
//     module: './blog/routes/api/comment'
// }, {
//     url: '/blog/api/tag',
//     module: './blog/routes/api/tag'
// }, {
//     url: '/blog/api/praise',
//     module: './blog/routes/api/praise'
// },
// {
//     url: '/blog/api/essays',
//     module: './blog/routes/api/essays'
// },
// {
//     url: '/blog/api/message',
//     module: './blog/routes/api/message'
// },
// {
//     url: '/blog/api/other',
//     module: './blog/routes/api/other'
// },
// ]

// module.exports = [{
//     url: '/blog/api/message',
//     module: './blog/routes/message'
// },]


/*
普通参数：{
    params:?,
    isAdmin:?
}
只用id的:{
    id:?,
    isAdmin:?
}

删除直接传递 id

获取所有，不需要参数：{
    isAdmin:?
}

修改成功返回 [1]

删除成功返回  1
*/