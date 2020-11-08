const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');

const baseUrl = '/api/article';//基础路径

const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath,'./server/until/getSendResult')); // 辅助函数

// 分页获取所有文章
router.get(baseUrl, getMsg.asyncHandler(async (req, res) => {
    const result = await Service.ArticleService.getArticleByPage({
        params: req.query,
        isAdmin: false
    });
    if (result.count > 0) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('搜索为空！')
}))

// 根据id获取对应的文章
router.get(baseUrl+'/:id', getMsg.asyncHandler(async (req, res) => {
    // console.log('object');
    const result = await Service.ArticleService.getArticleById({
        id:req.params.id,
        isAdmin:false
    });
    // console.log('文章',result);
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('文章不存在！')
}))

// 增加浏览量
router.put(baseUrl+'/:id', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.ArticleService.addViews(req.params.id)
    if (result) {
        return {
            msg: '增加成功!',
        }
    }
    throw new Error('增加失败！')
}))

module.exports = router;

// // 修改标签
// router.put('/', getMsg.asyncHandler(async (req, res) => {
//     const result = await Service.ArticleService.changeArticleTag(req.body)
//     if (result) {
//         return {
//             msg: '修改成功!',
//             data: result
//         }
//     }
//     throw new Error('修改失败！')
// }))

// 获取一堆文章
// router.get('/', async (req, res) => {
//     const { page, limit } = req.query;
//     const obj = {};

//     if (page) {
//         obj.page = +page;
//     }
//     if (limit) {
//         obj.limit = +limit;
//     }
//     const data = await Service.ArticleService.getArticleByPage(obj);
//     res.send({
//         code: 200,
//         msg: '获取成功！',
//         data
//     })
// })

// 根据id获取对应的文章
// router.get('/:id', async (req, res) => {
//     let { id } = req.params;
//     if (id) {
//         id = +id;
//     }
//     const data = await Service.ArticleService.getArticleById(id);
//     res.send({
//         code: 200,
//         msg: '获取成功！',
//         data
//     })
// })


// 上传文章
// router.post('/', async (req, res) => {
//     let id = +req.body.author;
//     if (!id) {
//         console.log('请输入有效账号！');
//         return res.send({
//             code: 500,
//             msg: '请输入有效账号！'
//         })
//     } else {
//         const result = await Service.UserService.getUserById(id);
//         // console.log(result);
//         if (!result) {
//             return res.send({
//                 code: 500,
//                 msg: '请输入有效账号！'
//             })
//         }
//     }
//     if (!req.body.title) {
//         return res.send({
//             code: 500,
//             msg: '文章缺少标题！'
//         })
//     }
//     if (!req.body.content) {
//         return res.send({
//             code: 500,
//             msg: '文章缺少正文！'
//         })
//     }
//     const title = xss(req.body.title);
//     const content = xss(req.body.content);
//     const result = await Service.ArticleService.addArticle({
//         title,
//         content,
//         userId: id
//     });
//     if (result) {
//         return res.send({
//             code: 200,
//             msg: '文章发布成功！',
//             data: {
//                 id: result.id,
//             }

//         })
//     } else {
//         return res.send({
//             code: 500,
//             msg: '文章发布失败！'
//         })
//     }
// })



// 删除文章
// router.delete('/', async (req, res) => {
//     let id = +req.query.id;// 身份id
//     let articleId = +req.query.articleId;// 文章id
//     let identity = null;// 身份信息
//     let article = null;// 文章信息
//     if (!id) {
//         return res.send({
//             code: 500,
//             msg: '请输入账号！'
//         })
//     } else {
//         identity = await Service.UserService.getUserById(id);
//         if (!identity) {
//             return res.send({
//                 code: 500,
//                 msg: '请输入有效账号！'
//             })
//         }
//     }
//     if (!id) {
//         return res.send({
//             code: 500,
//             msg: '请输入要删除的文章id！'
//         })
//     } else {
//         article = await Service.ArticleService.getArticleById(articleId);
//         if (!article) {
//             return res.send({
//                 code: 500,
//                 msg: '文章不存在！'
//             })
//         }
//     }
//     if (identity.power < 0 && identity.id !== article.userId) {
//         return res.send({
//             code: 500,
//             msg: '您不能删除别人的文章！',
//         })
//     }
//     const result = await Service.ArticleService.deleteArticle(articleId);
//     if (result) {
//         return res.send({
//             code: 200,
//             msg: '删除成功！',
//         })
//     } else {
//         return res.send({
//             code: 500,
//             msg: '删除失败！'
//         })
//     }
// })