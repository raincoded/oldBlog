// const Users = require("../mysql/models/blog/Users");
const { Users } = require("./../models/models");// 数据库模型
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
const validate = require('validate.js'); // 数据验证
const md5 = require('md5');
const pick = require('./../until/pick');

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
    const result = await exports.getUserAll({ name });
    if (result.count > 0) {// 大于0说明name重复
        return "姓名重复"
    }

}
// 验证email
validate.validators.eamilTest = async function (email) {
    if (!email) {
        return
    }
    const result = await exports.getUserAll({ email });
    if (result.count > 0) {// 大于0说明email重复
        return "邮箱重复"
    }

}

/**
 * 添加用户
 * @param {'int'} obj 添加用户的信息
 * @param {'string'} name 用户的name
 * @param {'string'} email 用户的email
 * @param {'string'} password 用户的password
 * @param {'int'} power 用户的权限，只能设置-2
 */
exports.addUsers = async function ({ params, isAdmin }) {
    const newObj = pick(params, 'name', 'email', 'password', 'power');// 过滤需要的值

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
        password: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
            length: {
                minimum: 6,
                maximum: 16,
            },
        }
    })
    if (newObj.power !== -2) {// -2表示游客,密码为123456
        newObj.power = -1; //初始权限为-1
    }
    newObj.password = md5(newObj.password); // 密码加密
    let result = await Users.create(newObj); // 创建数据
    return JSON.parse(JSON.stringify(result))
}

/**
 * 根据id查看用户
 * @param {'int'} id 
 */
exports.getUserById = async function ({ id, isAdmin }) {
    // 过滤需要的值
    id = +id;
    // 验证数据
    const testResult = validate({ id }, { id: { presence: true, type: "integer" } });
    if (testResult) {
        throw testResult
    }
    let result = await Users.findByPk(id, {
        attributes: {
            exclude: isAdmin ? ['password', 'power'] : ['password', 'power', 'updatedAt', 'createdAt', 'deletedAt']
        }
    });
    return JSON.parse(JSON.stringify(result))
}

/**
 * 分页获取所有用户
 * @param {'object'} page   int
 * @param {*} page  int
 * @param {*} limit  int
 * @param {*} id  int
 * @param {*} power  int
 * @param {*} email string
 * @param {*} name string
 */
exports.getUserByPage = async function ({ params, isAdmin }) {
    let { page = 1, limit = 10, id, email, name, power } = params;
    const where = {};
    // 验证数据，由于不确定都有，需单独验证
    if (page) {
        page = +page; // 转换成数字
        const testResult = validate({ page }, {
            page: {
                presence: true,
                type: "integer"
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
    }
    if (limit) {
        limit = +limit; // 转换成数字
        const testResult = validate({ limit }, {
            limit: {
                presence: true,
                type: "integer"
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
    }
    if (id) {
        id = +id; // 转换成数字
        const testResult = validate({ id }, {
            id: {
                presence: true,
                type: "integer"
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        where.id = id;
    }

    if (email) {
        const testResult = await validate({ email }, {
            email: {
                presence: {
                    allowEmpty: false, // 不允许为{},[],""," "
                },
                type: "string",
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        where.email = email;
    }
    if (name) {
        const testResult = await validate({ name }, {
            name: {
                presence: {
                    allowEmpty: false, // 不允许为{},[],""," "
                },
                type: "string",
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        where.name = { [Op.like]: `%${name}%` }
    }
    if (power) {
        power = +power;
        const testResult = await validate({ power }, {
            power: {
                presence: true,
                type: "integer",
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        where.power = power;
    }

    // id && (where.id = id);
    // power && (where.power = power);
    // email && (where.email = email);
    // name && (where.name = { [Op.like]: `%${name}%` });
    const result = await Users.findAndCountAll({
        attributes: {
            exclude: isAdmin ? ['password', 'power'] : ['password', 'power', 'updatedAt', 'createdAt', 'deletedAt']
        },
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return JSON.parse(JSON.stringify(result))
}

// 获取所有用户
exports.getUserAll = async function () {
    const result = await Users.findAll()
    return JSON.parse(JSON.stringify(result))
}

/**
 * 更新用户
 * @param {"object"} id int
 * @param {*} id int
 * @param {*} id int
 * @param {*} name string
 * @param {*} password string
 * @param {*} email string
 */
exports.updateUser = async function ({ params, isAdmin }) {
    // 过滤需要的值
    let { id, email, name, password, power } = pick(params, 'id', 'email', 'name', 'password', 'power');
    const newObj = {};// 待确定有哪些修改参数
    // 验证数据，由于不确定都有，需单独验证
    if (id) {
        id = +id; // 转换成数字
        const testResult = validate({ id }, { id: { type: "integer" } });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        newObj.id = id;
    }

    if (email) {
        await validate.async({ email }, {
            email: {
                presence: {
                    allowEmpty: false, // 不允许为{},[],""," "
                },
                type: "string",
                eamilTest: true
            }
        });
        newObj.email = email;
    }
    if (name) {
        await validate.async({ name }, {
            name: {
                presence: {
                    allowEmpty: false, // 不允许为{},[],""," "
                },
                type: "string",
                nameTest: true,
            }
        });
        newObj.name = name;
    }
    if (password) {
        power = +power;
        const testResult = validate({ password }, {
            password: {
                presence: {
                    allowEmpty: false, // 不允许为{},[],""," "
                },
                type: "string",
                length: {
                    minimum: 6,
                    maximum: 16,
                },
            }
        });
        if (testResult) {
            throw testResult
        }
        newObj.password = md5(password);
    }
    if (power) {
        power = +power; // 转换成数字
        const testResult = validate({ power }, { power: { presence: true, type: "integer" } });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        newObj.power = power;
    }
    if (newObj.length == 0) {
        throw '缺少参数！'
    }
    return await Users.update({
        ...newObj
    }, {
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        where: {
            id,
        },
    });
};
/**
 * 删除用户
 * @param {'int'} id int 目标id
 * @param {'int'} identity int 你的身份id
 */
exports.deleteUser = async function (id) {
    id = +id;
    const testResult = validate({ id }, {
        id: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "integer"
        },
    });
    if (testResult) {// 同步代码，需手动报错
        throw testResult
    }
    const targetIdentity = await Users.findByPk(id);// 目标id的身份

    // 目标用户的权限为1表示最高权限，任何人都不能删除
    if (!targetIdentity) {
        throw '要删除的用户不存在！'
    } else if (targetIdentity.power === 1) {
        throw '无权删除！'
    }
    await Users.destroy({
        where: {
            id
        }
    });
    return false
}
