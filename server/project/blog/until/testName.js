// 验证姓名

const Service = require('../../services/init');
// 求一个字符串的字节长度
function bat(str) {
    let len = str.length;
    let result = len;
    for (let i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
            result++;
        }
    }
    return result;
}
module.exports = async function (name, id) {
    if (!name) {
        return {
            code: 500,
            msg: "姓名不能为空"
        }
    } else if (!(bat(name) >= 4)) {
        return {
            code: 500,
            msg: "姓名不能低于4个字符"
        }
    } else if (!(bat(name) <= 10)) {
        return {
            code: 500,
            msg: "姓名不能多于10个字符"
        }
    } else {
        const result = await Service.UserService.getUserAll({ name });
        // console.log('查询的名字', result.rows[0].id !== +id);
        if (result.count > 0 && result.rows[0].id !== +id) {// 有id相等说明可能是修改
            return {
                code: 500,
                msg: "姓名重复"
            }
        }
    }
    return {
        code: 200,
        msg: '符合要求，可以添加'
    }
}