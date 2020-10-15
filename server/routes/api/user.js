const express = require("express");
const router = express.Router();
const Service = require('../../services/init'); // 服务层server
const getMsg = require("../getSendResult"); // 辅助函数

// 根据id获取用户
router.get('/:id', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.UserService.getUserById(req.params.id);
    if (result) {
        const obj = {
            id: result.id,
            name: result.name,
            email: result.email
        }
        return {
            msg: '获取成功！',
            data: obj
        }
    } else {
        return {
            msg: '用户不存在！',
        }
    }
}))

// 注册账号
router.post('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.UserService.addUsers(req.body);
    if (result) {
        return {
            msg: '注册成功',
            data: {
                id: result.id,
                name: result.name,
                email: result.email
            }
        }
    }
    throw new Error('注册失败！')
}))

// 修改用户
router.put('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.UserService.updateUser(req.body);
    if (result) {
        return '修改成功！'
    }
    throw new Error('用户不存在！')
}))

// 用户注销/删除
router.delete('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.UserService.deleteUser(req.body);
    if (result) {
        return {
            msg: '注销成功!'
        }
    } else {
        return {
            msg: '删除成功!'
        }
    }
}))

module.exports = router;

// 验证邮箱，姓名，密码
// const testEmail = require('../../services/until/testEmail');
// const testName = require('../until/testName');
// const testPassWord = require('../until/testPassWord');

// router.get('/:id', async (req, res) => {
//     // console.log('路由传参', req.params.id);
//     const data = await Service.UserService.getUserById(req.params.id);
//     const obj = {
//         id: data.id,
//         name: data.name,
//         email: data.email
//     }
//     if (data) {
//         res.send({
//             code: 200,
//             msg: '获取成功',
//             obj
//         })
//     } else {
//         res.send({
//             code: 500,
//             msg: '用户不存在',
//         })
//     }
// })

// router.post('/', async (req, res) => {
//     const { name, email, password } = req.body;
//     const emailT = testEmail(email);
//     const nameT = testName(name);
//     const passwordT = testPassWord(password);
//     const pro = await Promise.all([emailT, nameT, passwordT]);
//     let key = true;
//     for (let i = 0; i < pro.length; i++) {
//         if (pro[i].code == 500) {
//             key = false;
//             res.send(pro[i]);
//             return
//         }
//     }
//     if (key) {
//         const data = await Service.UserService.addUsers({
//             name,
//             email,
//             password,
//             power: -1
//         });
//         res.send({
//             code: 200,
//             msg: '添加成功',
//             data
//         })
//     }
// })

// router.put('/', async (req, res) => {
//     let { id, name, email, password } = req.body;

//     // 查看有哪些参数，并且是否符合规范
//     if (!id) {
//         res.send({
//             code: 500,
//             msg: '请输入要更改的用户',
//         })
//     } else {
//         id = +id;
//         const result = await Service.UserService.getUserById(id);
//         if (!result) {
//             res.send({
//                 code: 500,
//                 msg: '用户不存在',
//             })
//             return
//         }
//     }
//     const obj = {};
//     obj.id = id;
//     const arr = [];

//     if (email) {
//         arr.push(testEmail(email, id));
//         obj.email = email
//     }
//     if (name) {
//         arr.push(testName(name, id));
//         obj.name = name
//     }
//     if (password) {
//         arr.push(testPassWord(password));
//         obj.password = password
//     }
//     if (arr.length == 0) {
//         res.send({
//             code: 500,
//             msg: '请输入要更改的数据',
//         })
//     }
//     const pro = await Promise.all(arr);
//     let key = true;
//     for (let i = 0; i < pro.length; i++) {
//         if (pro[i].code == 500) {
//             key = false;
//             res.send(pro[i]);
//             return
//         }
//     }
//     if (key) {
//         const data = await Service.UserService.updateUser({
//             ...obj
//         });
//         const newData = await Service.UserService.getUserById(id);
//         res.send({
//             code: 200,
//             msg: '修改成功',
//             data: newData
//         })
//     }
// })

// router.delete('/', async (req, res) => {
//     const data = await Service.UserService.deleteUser(req.body.id);
//     if (data) {
//         res.send({
//             code: 200,
//             msg: '注销成功',
//         })
//     } else {
//         res.send({
//             code: 500,
//             msg: '用户不存在',
//         })
//     }
// })

