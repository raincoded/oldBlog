const UserService = require('./../services/UserService')
// 根据id获取用户
module.exports = (async (req, res, next) => {
    if (req.userId) {
        const result = await UserService.getUserById({id:req.userId});
        if (result) {
            next()
        } else {
            res.cookie('token', '', {
                maxAge: new Date(-1000),
                httpOne: true,
            });
            throw new Error('用户不存在！')
        }
    } else {
        next()
    }
})
