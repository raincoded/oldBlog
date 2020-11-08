// 随笔api接口
const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
const getMsg = require("../getSendResult"); // 辅助函数

// 获取最新的随笔
router.get('/new', getMsg.asyncHandler(async (req, res) => {
    console.log('获取最新的随笔')
    const result = await Service.EssaysService.getEssaysNew();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    return {
        msg: '未查询到！',
        data: result
    }
}))

// 获取所有随笔
router.get('/all', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.EssaysService.getEssaysAll();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('获取失败!')
}))

// 添加随笔
router.post('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.EssaysService.addEssays({
        userId: req.userId,
        content: req.body.content
    });
    if (result) {
        // delete result.createdAt
        delete result.updatedAt
        delete result.deletedAt
        return {
            msg: '添加成功！',
            data: result
        }
    }
    throw new Error('添加失败!')
}))

// 删除随笔
router.delete('/:id', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.EssaysService.deleteEssays(req.params.id);
    if (result === 1) {
        return {
            msg: '删除成功！',
        }
    }
    throw new Error('删除失败!')
}))

module.exports = router;