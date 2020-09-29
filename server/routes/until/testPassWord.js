// 验证密码
const Service = require('../../services/init');
module.exports = async function (password) {
    // cont reg =//;
    if (!password) {
        return {
            code: 500,
            msg: '请输入密码'
        }
    } else if (!(password.length >= 6)) {
        return {
            code: 500,
            msg: '密码少于6位'
        }
    } else if (!(password.length <= 16)) {
        return {
            code: 500,
            msg: '密码大于16位'
        }
    } else {
        return {
            code: 200,
            msg: '可以添加'
        }
    }
}