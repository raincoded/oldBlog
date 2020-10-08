// 点赞
const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
const getMsg = require("../getSendResult"); // 辅助函数

// 获取文章或作者的所有点赞
router.get('/', getMsg.asyncHandler(async (req, res) => {
    console.log(req.query)
    const result = await Service.PraiseService.getPraiseByPage(req.query)
    if(result.count>0){
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('未查询到！')
}))

/**
 * 某个人增加或取消文章点赞
 * @param {'Object'}
 * @param {*} articleId 文章id
 * @param {*} userId 用户id
 */
router.put('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.PraiseService.updatePraise(req.query)
    if (result) {
        return {
            msg: '点赞成功！',
            data: result
        }
    } else {
        return {
            msg: '取消点赞！',
        }
    }
}))

// 获取所有点赞
router.get('/all', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.PraiseService.getPraiseAll();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    } else {
        throw new Error('没有相关标签！')
    }
}))
module.exports = router;