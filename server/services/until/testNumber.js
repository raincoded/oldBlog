const validate = require('validate.js'); // 数据验证
/**
 * 用于测试是否为数字的，返回boolean
 * @param {'string'} prop 测试的名字
 * @param {*} value 对应的值
 */
module.exports = (prop, value) => {
    if (value) {
        const testResult = validate({ [prop]: +value }, {
            [prop]: {
                presence: true,
                type: "integer"
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        return true
    }
    return false
}