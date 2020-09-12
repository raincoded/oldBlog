// require('./mysql/models/init')

const Article = require("./server/services/ArticleService.js");
// Article.addArticle({
//     title:'lorem',
//     content:'Lorem ipsum dolor sit amet consectetur',
//     tag:'lorem'
// })

// Article.addArticle({
//     title:'lorem',
//     content:'Lorem ipsum dolor sit amet consectetur',
//     tag:'lorem'
// })
// Article.getArticle(2).then(req=>{
//     console.log(req);
// })
Article.getArticleAll().then(req => {
    console.log(req);
})
