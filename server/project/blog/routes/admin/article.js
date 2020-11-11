const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');

const baseUrl = '/admin/article';//基础路径

const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

// 分页获取所有文章
router.get(baseUrl, getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const result = await Service.ArticleService.getArticleByPage({
        params: req.query,
        isAdmin: true
    });
    if (result.count > 0) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('搜索为空！')
}))

// 获取所有文章
router.get(baseUrl+'/all', getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const result = await Service.ArticleService.getArticleAll();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('文章为空！')
}))

// 上传文章
router.post(baseUrl, getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const result = await Service.ArticleService.addArticle({
        params: req.body.data,
        isAdmin: true,
        userId: req.userId
    })
    if (result) {
        return {
            msg: '上传成功!',
            data: result
        }
    }
    throw new Error('文章上传失败！')
}))

/**
 * 删除文章
 * @param {'int'} id 文章id
 * @param {'int'} identity 你的id
 */
router.delete(baseUrl+'/:id', getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const result = await Service.ArticleService.deleteArticle(req.params.id);
    if (result) {
        return {
            msg: '删除成功！'
        }
    } else {
        throw new Error('删除失败！')
    }
}))

module.exports = router;
