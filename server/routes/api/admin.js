const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
const getMsg = require("../getSendResult"); // 辅助函数

// 获取所有用户
router.get('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.UserService.getUserAll(req.query);
    if (result.count > 0) {
        return {
            msg: '获取成功!',
            data: result
        }
    }
    throw new Error('用户不存在！')
}))


/**
 * 根据id获取用户
 *  @param {'int'} id 目标id
 */
router.get('/:id', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.UserService.getUserById(req.params.id);
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    }
    throw new Error('用户不存在！')
}))

/**
 * 修改用户权限
 *  @param {'int'} id 目标id
 *  @param {'int'} identity 你的id
 *  @param {'int'} power 要修改的权限
 */
router.put('/', getMsg.asyncHandler(async (req, res) => {
    let { id, power, identity } = req.body;
    id = +id;
    identity = +identity;
    power = +power;
    const arr = [-1, 1, 2];
    if (!arr.includes(power)) {
        throw new Error('权限不存在！');
    }
    // 查看参数是否齐全
    if (!id) {
        throw new Error('请输入要更改的用户id！');
    }
    if (!power) {
        throw new Error('请输入要更改的权限！');
    } else if (power === 1) {
        throw new Error('不能修改！');
    }
    if (!identity) {
        throw new Error('请输入您的身份！');
    }
    if (identity === id) {
        throw new Error('不能修改自己！');
    }
    const targetIdentity = await Service.UserService.getUserById(id);// 目标id的身份

    // 目标用户的权限为1表示最高权限，任何人都不能删除
    if (!targetIdentity) {
        throw new Error('目标用户不存在！');
    }
    if (targetIdentity.power === 1) {
        throw new Error('您没有权限！');
    }
    // 目标的信息
    const result = await Service.UserService.getUserById(id);
    if (!result) {
        throw new Error('要修改的用户不存在！');
    }

    await Service.UserService.updateUser({
        id,
        power
    });
    const newData = await Service.UserService.getUserById(id);
    if (newData) {
        return {
            msg: '修改成功!',
            data: newData
        }
    }
    throw new Error('用户不存在');
}))

// 根据id删除用户
router.delete('/', getMsg.asyncHandler(async (req, res) => {
    const data = await Service.UserService.deleteUser(req.body);
    if (data) {
        return '删除成功'
    } else {
        throw new Error('用户不存在');
    }
}))

module.exports = router;



// 获取所有用户
// router.get('/', async (req, res) => {
//     const { limit, page } = req.query;
//     const where = {};
//     limit && (where.limit = limit);
//     page && (where.page = page);
//     const data = await Service.UserService.getUserAll(where)
//     res.send({
//         code: 200,
//         msg: '获取成功!',
//         data
//     })
// })

// 根据id获取用户
// router.get('/:id', async (req, res) => {
//     const data = await Service.UserService.getUserById(req.params.id);
//     if (data) {
//         res.send({
//             code: 200,
//             msg: '获取成功!',
//             data
//         })
//     } else {
//         res.send({
//             code: 500,
//             msg: '用户不存在!',
//         })
//     }
// })

// 修改用户权限
// router.put('/', async (req, res) => {
//     let { id, power, identity } = req.body;
//     id = +id;
//     identity = +identity;
//     power = +power;
//     // 查看参数是否齐全
//     if (!id) {
//         return res.send({
//             code: 500,
//             msg: '请输入要更改的用户！',
//         })
//     }
//     if (!power) {
//         return res.send({
//             code: 500,
//             msg: '请输入要更改的权限！',
//         })
//     } else if (power === 1) {
//         return res.send({
//             code: 500,
//             msg: '不能修改！',
//         })
//     }
//     if (!identity) {
//         return res.send({
//             code: 500,
//             msg: '请输入您的身份！',
//         })
//     }
//     if (identity === id) {
//         return res.send({
//             code: 500,
//             msg: '不能修改！',
//         })
//     }
//     const youslefIdentity = await Service.UserService.getUserById(identity);// 你的身份
//     // 你的身份小于0表示普通用户，无权删除用户
//     if (youslefIdentity.power < 0) {
//         return res.send({
//             code: 500,
//             msg: '您没有权限！',
//         })
//     }
//     const targetIdentity = await Service.UserService.getUserById(id);// 目标id的身份

//     // 目标用户的权限为1表示最高权限，任何人都不能删除
//     if (!targetIdentity) {
//         return res.send({
//             code: 500,
//             msg: '目标用户不存在！',
//         })
//     }
//     if (targetIdentity.power === 1) {
//         return res.send({
//             code: 500,
//             msg: '您没有权限！',
//         })
//     }
//     // 目标的信息
//     const result = await Service.UserService.getUserById(id);
//     if (!result) {
//         return res.send({
//             code: 500,
//             msg: '用户不存在！',
//         })
//     }

//     await Service.UserService.updateUser({
//         id,
//         power
//     });
//     const newData = await Service.UserService.getUserById(id);
//     return res.send({
//         code: 200,
//         msg: '修改成功!',
//         data: newData
//     })

// })


// 根据id删除用户
// router.delete('/', async (req, res) => {
//     const data = await Service.UserService.deleteUser(req.body.id);
//     if (data) {
//         res.send({
//             code: 200,
//             msg: '删除成功',
//         })
//     } else {
//         res.send({
//             code: 500,
//             msg: '用户不存在',
//         })
//     }
// })