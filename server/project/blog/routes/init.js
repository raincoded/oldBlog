const admin =[
    require('./admin/admin'),
    require('./admin/article'),
    require('./admin/comment'),
    require('./admin/message'),
    require('./admin/tag'),
]
const api = [
    require('./api/article'),
    require('./api/comment'),
    require('./api/message'),
    require('./api/other'),
    require('./api/tag'),
    require('./api/user'),
]
module.exports = [...admin, ...api]




// const admin = [
//     {
//         url: '/blog/admin/article',
//         module: './blog/routes/admin/article',
//     },
//     // {
//     //     url: '/blog/admin/message',
//     //     module: './blog/routes/admin/message'
//     // },
// ]


// const api = [
//     {
//         url: '/blog/api/article',
//         module: './blog/routes/api/article'
//     },
//     // {
//     //     url: '/blog/api/message',
//     //     module: './blog/routes/api/message'
//     // },
// ]



// module.exports = [...admin, ...api]

