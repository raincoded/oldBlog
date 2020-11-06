// 随笔api接口
const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
const getMsg = require("../getSendResult"); // 辅助函数

// 分页获取留言
router.get('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.MessageService.getMessageByPage(req.query);
    if (result) {
        return {
            msg: '获取成功!',
            data: result
        }
    }
    return {
        msg: '还没有留言！',
        data: result
    }
}))

// 发布留言
router.post('/', getMsg.asyncHandler(async (req, res) => {
    console.log('发布留言');
    const result = await Service.MessageService.pushMessage(req.body)
    if (result) {
        delete result.deletedAt
        return {
            msg: '发布成功！',
            data: result
        }
    }
    throw new Error('发布失败!')
}))

// 回复留言
router.put('/', getMsg.asyncHandler(async (req, res) => {
    console.log('回复留言');
    const userResult = await Service.UserService.getUserById(req.userId)
    if (!userResult) {
        res.cookie('token', '', {
            maxAge: new Date(-1000),
            httpOne: true,
        });
        throw new Error('用户不存在！')
    } else if (userResult.power !== 1) {
        throw new Error('用户没有权限！')
    }
    const result = await Service.MessageService.replyMessage(req.body)
    if (result) {
        delete result.deletedAt
        return {
            msg: '回复成功！',
        }
    }
    throw new Error('回复失败!')
}))

// 删除留言
router.delete('/:id', getMsg.asyncHandler(async (req, res) => {
    const userResult = await Service.UserService.getUserById(req.userId)
    if (!userResult) {
        res.cookie('token', '', {
            maxAge: new Date(-1000),
            httpOne: true,
        });
        throw new Error('用户不存在！')
    } else if (userResult.power !== 1) {
        throw new Error('用户没有权限！')
    }
    const result = await Service.MessageService.deleteMessage(req.params.id)
    if (result == 1) {
        return {
            msg:'删除成功!'
        }
    }
    throw new Error('删除失败!')
}))
module.exports = router;