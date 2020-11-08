// 评论
const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');

const baseUrl = '/api/comment'

const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

/**
 * 分页获取评论  query传参
 * @param {*} page int
 * @param {*} limit int
 * @param {*} articleId string
 * @param {*} parent int
 * @param {*} author int
 */
router.get(baseUrl, getMsg.asyncHandler(async (req, res) => {
    const result = await Service.CommentService.getCommentByPage({
        params: req.query,
        isAdmin: false
    });
    if (result) {
        return {
            msg: '获取成功!',
            data: result
        }
    }
    return {
        msg: '没有相关评论！',
        data: result
    }
}))

/**
 * 根据文章id获取评论
 */
router.get(baseUrl + '/:id', getMsg.asyncHandler(async (req, res) => {
    console.log('根据文章id查看评论');
    const result = await Service.CommentService.getCommentByArticleId({
        id: req.params.id,
        isAdmin: false
    });
    // console.log('result', result);
    if (result) {
        return {
            msg: '获取成功!',
            data: result
        }
    }
    throw new Error('没有相关评论！')
}))

// 获取所有评论
router.get(baseUrl+'/all', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.CommentService.getCommentAll();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    return {
        msg: '没有相关评论！',
        data: result
    }
}))

/**
 * 发布评论 body传参
 * @param {'int'} articleId 文章id
 * @param {'string'} content 评论内容
 * @param {'int'} parent 回复谁，无值则回复作者
 * @param {'int'} author 评论人
 * @param {'string'} name 未登录用户的name
 * @param {'string'} email 未登录用户的email
 */
router.post(baseUrl, getMsg.asyncHandler(async (req, res) => {
    // console.log('请求这IP地址',req.ip);
    // console.log('请求这IP地址',req.connection.remoteAddress);
    const result = await Service.CommentService.addComment({
        params: req.body.data,
        isAdmin: false
    });
    if (result) {
        delete result.updatedAt;
        // console.log(result.createdAt);
        return {
            msg: '添加成功!',
            data: result
        }
    }
    throw new Error('添加失败！')
}))

// /**
//  * 删除评论 query传参
//  * @param {'int'} id 评论id
//  * @param {'int'} identity 你的身份
//  */
// router.delete(baseUrl, getMsg.asyncHandler(async (req, res) => {
//     const result = await Service.CommentService.deleteComment(req.query);
//     if (result) {
//         return {
//             msg: '删除成功！'
//         }
//     }
//     throw new Error('删除失败！');
// }))

module.exports = router;