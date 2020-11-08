// 验证邮箱
const Service = require('../init');
module.exports = async function (email, id) {
    const reg_str1 = /^(?:[0-9a-zA-Z_]+.)+@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}$/g;
    // console.log('正则结果', reg_str1.test(email));
    if (!email) {
        return {
            code: 500,
            msg: "请输入邮箱"
        }
    } else if (reg_str1.test(email)) {
        const result = await Service.UserService.getUserAll({ email });
        console.log('符合邮箱吗', result);
        if (result.count > 0 && result.rows[0].id !== id) {// 有id相等说明可能是修改
            return {
                code: 500,
                msg: "邮箱重复"
            }
        } else {
            return {
                code: 200,
                msg: '符合要求，可以添加'
            }
        }
    }
}