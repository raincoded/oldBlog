const Essays = require("./../../mysql/models/Essays");
const validate = require('validate.js'); // 数据验证
const UserService = require('./UserService');
const pick = require('./until/pick');
const testNumber = require('./until/testNumber')
/**
 * 发布随笔
 * @param {'Object'} obj 
 * @param {'string'} content 随笔内容
 * @param {'int'} userId 添加人
 */
exports.addEssays = async function (obj) {

    let newObj = pick(obj, 'userId', 'content');
    newObj.userId = +newObj.userId;
    console.log(newObj);
    const testResult = validate({
        userId: newObj.userId,
        content: newObj.content
    }, {
        userId: {
            presence: true,
            type: "integer",
        },
        content: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
        },
    })
    if (testResult) {
        throw testResult
    }
    // 只有管理员才能添加
    const userResult = await UserService.getUserById(newObj.userId);
    if (userResult.power !== 1) {
        throw new Error('您没有权限!')
    } else {
        const result = await Essays.create(newObj);
        return JSON.parse(JSON.stringify(result))
    }
}

/**
 * 获取最新的随笔
 */
exports.getEssaysNew = async function () {
    const result = await Essays.findAll({
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        order: [['createdAt', 'DESC']]
    })
    return JSON.parse(JSON.stringify(result))[0]
}

/**
 * 分页获取随笔
 * @param {'object'} obj
 * @param {*} page int
 * @param {*} limit int
 * @param {*} orderProp string 排序项
 * @param {*} order string 排序方式（顺/逆）
 */
exports.getEssaysByPage = async function (obj) {
    let { page = 1, limit = 10, orderProp, order } = obj;
    testNumber('page', page) && (page = +page);
    testNumber('limit', limit) && (limit = +limit);
    const select = {
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        offset: (page - 1) * limit,
        limit: +limit,
    }
    const orderCondition = [];
    if (orderProp) {
        orderCondition.push(orderProp);
        order ? orderCondition.push(order) : orderCondition.push("ASC")
        obj.order = [orderCondition];
    }
    const result = await Essays.findAndCountAll(select)
    return JSON.parse(JSON.stringify(result))
}

/**
 * 获取所有的随笔
 */
exports.getEssaysAll = async function () {
    const result = await Essays.findAll({ attributes: { exclude: ['updatedAt', 'deletedAt'] }, })
    return JSON.parse(JSON.stringify(result))
}

/**
 * 删除的随笔
 *  @param {'int'} id 随笔
 */
exports.deleteEssays = async function (id) {
    const isExist = await exports.findEssaysById(id);
    console.log(isExist);
    if (!isExist) {
        throw new Error('目标不存在!')
    }
    const result = await Essays.destroy({
        where: { id }
    })
    return JSON.parse(JSON.stringify(result))
}

/**
 * 根据id查询随笔
 *  @param {'int'} id 随笔
 */
exports.findEssaysById = async function (id) {
    const result = await Essays.findByPk(id)
    return JSON.parse(JSON.stringify(result))
}