// 随机生成一些评论
const Mock = require('mockjs');
var Random = Mock.Random;
const Service = require('../../server/services/init');
function suiji(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// const data = Mock.mock({
//     'list|1-10': [{
//         'articleId': function () {
//             const articleId = suiji(1, 8);
//             if ((Math.random() - 0.5) >= 0) {
//             const articleId = suiji(1, 8);
//                 Service.ArticleService.getArticleById(articleId).then(req=>{
//                     req.userId
//                 });
//             }


//         },
//         'content': function () {
//             return Random.cparagraph(1)
//         },
//         'parent': 1,
//         'author|1-5': 1,
//     }]
// })


const obj = {
    articleId: 13,
    content: Random.cparagraph(1),
    parent: 24,
    author: 27
}
// const arrArticle = [];//保存所有文章的id
// const articleLength = suiji(1, 8);//文章的长度
// for (let i = 0; i < articleLength; i++) {
//     arrArticle.push(suiji(1, 8))
// }
// arrArticle.forEach(e => {//e为文章的id
//     Service.ArticleService.getArticleById(e).then(req => {
//         console.log(req.userId);
//     });
// })
// if ((Math.random() - 0.5) >= 0) {
//     const articleId = suiji(1, 8);
//     Service.ArticleService.getArticleById(articleId).then(req => {
//         req.userId
//     });
// }


// console.log(data.list);
// console.log(obj);
Service.CommentService.addComment(obj)