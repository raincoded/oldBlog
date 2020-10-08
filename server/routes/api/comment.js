// 评论
const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
const getMsg = require("../getSendResult"); // 辅助函数
/**
 * 分页获取评论  query传参
 * @param {*} page int
 * @param {*} limit int
 * @param {*} articleId string
 * @param {*} parent int
 * @param {*} author int
 */
router.get('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.CommentService.getCommentByPage(req.query);
    if (result) {
        return {
            msg: '获取成功!',
            data: result
        }
    }
    throw new Error('没有相关评论！')
}))

// 获取所有评论
router.get('/all', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.CommentService.getCommentAll();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    } else {
        throw new Error('没有相关标签！')
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
router.post('/', getMsg.asyncHandler(async (req, res) => {
    // console.log('请求这IP地址',req.ip);
    // console.log('请求这IP地址',req.connection.remoteAddress);
    const result = await Service.CommentService.addComment(req.body);
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

/**
 * 删除评论 query传参
 * @param {'int'} id 评论id
 * @param {'int'} identity 你的身份
 */
router.delete('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.CommentService.deleteComment(req.query);
    if (result) {
        return{
            msg:'删除成功！'
        }
    }
    
}))

module.exports = router;