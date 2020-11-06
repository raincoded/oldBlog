const Message = require("./../../mysql/models/Message");
const UserService = require("./UserService.js");
const validate = require('validate.js'); // 数据验证
const pick = require('./until/pick');
const testNumber = require('./until/testNumber')
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

// 自定义规则验证
// 验证name
validate.validators.nameTest = async function (name) {
    if (!name) {
        return
    }
    if (!(bat(name) >= 4)) {
        return "姓名不能低于4个字符"
    } else if (!(bat(name) <= 10)) {
        return "姓名不能多于10个字符"
    }
    const result = await UserService.getUserAll({ name });
    if (result.count > 0) {// 大于0说明name重复
        return "姓名重复"
    }

}
// 验证email
validate.validators.eamilTest = async function (email) {
    if (!email) {
        return
    }
    const result = await UserService.getUserAll({ email });
    if (result.count > 0) {// 大于0说明email重复
        return "邮箱重复"
    }

}
// 发布留言
exports.pushMessage = async function (obj) {
    let newObj = pick(obj, 'name', 'email', 'content');
    // 验证数据,返回undefined表示通过
    await validate.async(newObj, {
        name: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
            nameTest: true,
        },
        email: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
            eamilTest: true
        },
        content: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
        },
    })
    const result = await Message.create(newObj);
    return JSON.parse(JSON.stringify(result))
}

// replyMessage 回复留言
exports.replyMessage = async function (obj) {
    let { id, content } = pick(obj, 'id', 'content');
    id = +id;
    const testResult = validate({ id, content }, {
        id: {
            presence: true,
            type: "integer"
        },
        content: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
        },
    })
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }

    const isExist = await exports.findMessageById(id);
    if (!isExist) {
        throw new Error('目标不存在!')
    }
    const result = await Message.update({ reply: content }, {
        attributes: { exclude: ['deletedAt'] },
        where: {
            id
        }
    });
    return JSON.parse(JSON.stringify(result))
}

// 根据id查询留言
exports.findMessageById = async function (id) {
    const testResult = validate({ id }, {
        id: {
            presence: true,
            type: "integer"
        },
    })
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    const result = await Message.findByPk(id);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 分页获取留言
 * @param {'object'} obj
 * @param {*} page int
 * @param {*} limit int
 * @param {*} orderProp string 排序项
 * @param {*} order string 排序方式（顺/逆）
 */
exports.getMessageByPage = async function (obj) {
    let { page = 1, limit = 10, orderProp, order } = obj;
    testNumber('page', page) && (page = +page);
    testNumber('limit', limit) && (limit = +limit);
    const select = {
        attributes: { exclude: ['deletedAt'] },
        offset: (page - 1) * limit,
        limit: +limit,
    }
    const orderCondition = [];
    if (orderProp) {
        orderCondition.push(orderProp);
        order ? orderCondition.push(order) : orderCondition.push("ASC")
        select.order = [orderCondition];
    }
    const result = await Message.findAndCountAll(select)
    return JSON.parse(JSON.stringify(result))
}

//获取所有留言
exports.getMessageAll = async function () {
    const result = await Message.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    return JSON.parse(JSON.stringify(result))
}

// 删除留言
exports.deleteMessage = async function (id) {
    console.log('删除留言',id);
    const result = await Message.destroy({
        where: {
            id
        }
    })
    return JSON.parse(JSON.stringify(result))
}