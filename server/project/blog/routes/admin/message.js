// 留言api接口
const express = require("express");
const router = express.Router();

// 服务层server
const Service = require('./../../services/init');

const baseUrl = '/admin/message';

const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

// 分页获取留言
router.get(baseUrl, getMsg.asyncHandler(async (req, res) => {
    console.log('获取留言');
    if (req.userId) throw new Error('你不是管理员!')
    const result = await Service.MessageService.getMessageByPage({
        params: req.query,
        isAdmin: true
    });
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

// 回复留言
router.put(baseUrl, getMsg.asyncHandler(async (req, res) => {
    console.log('回复留言');
    if (req.userId) throw new Error('你不是管理员!')
    // const userResult = await Service.UserService.getUserById(req.userId)
    // if (!userResult) {
    //     res.cookie('token', '', {
    //         maxAge: new Date(-1000),
    //         httpOne: true,
    //     });
    //     throw new Error('用户不存在！')
    // } else if (userResult.power !== 1) {
    //     throw new Error('用户没有权限！')
    // }
    const result = await Service.MessageService.replyMessage({
        params: req.body,
        isAdmin: true
    })
    if (result) {
        delete result.deletedAt
        return {
            msg: '回复成功！',
        }
    }
    throw new Error('回复失败!')
}))

// 删除留言
router.delete(baseUrl + '/:id', getMsg.asyncHandler(async (req, res) => {
    console.log('删除留言');
    if (req.userId) throw new Error('你不是管理员!')
    // const userResult = await Service.UserService.getUserById(req.userId)
    // if (!userResult) {
    //     res.cookie('token', '', {
    //         maxAge: new Date(-1000),
    //         httpOne: true,
    //     });
    //     throw new Error('用户不存在！')
    // } else if (userResult.power !== 1) {
    //     throw new Error('用户没有权限！')
    // }
    const result = await Service.MessageService.deleteMessage(req.params.id)
    if (result == 1) {
        return {
            msg: '删除成功!'
        }
    }
    throw new Error('删除失败!')
}))

// 获取所有留言
router.get(baseUrl + '/all', getMsg.asyncHandler(async (req, res) => {
    console.log('获取所有留言');
    if (req.userId) throw new Error('你不是管理员!')
    const result = await Service.MessageService.getMessageAll();
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


module.exports = router;