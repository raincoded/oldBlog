const { Article, Users } = require("./../models/models");// 数据库模型
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
const { TagService } = require('./init')
const validate = require('validate.js'); // 数据验证
const pick = require('./../until/pick');//过滤对象属性
const unique = require('./../until/unique');// 数组去重字符串
const xss = require('xss');
/**
 * 发布文章
 * @param {'Object'} obj 
 */
exports.addArticle = async function ({ params, isAdmin }) {
    const newObj = pick(params, 'title', 'content', 'userId', 'tag');// 过滤需要的值
    newObj.userId = +newObj.userId;
    const testResult = validate(newObj, {
        userId: {
            presence: true,
            type: "integer"
        },
        title: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string"
        },
        content: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string"
        },
        tag: {
            type: "string"
        }
    });
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    newObj.views = 0;
    newObj.title = xss(newObj.title);
    newObj.content = xss(newObj.content);
    let tagStr = null;
    if (newObj.tag) {
        newObj.tag = xss(newObj.tag);
        newObj.tag = newObj.tag.split(','); // 分割成数组
        newObj.tag = unique(newObj.tag);// 去重
        (newObj.tag.length > 3) && (newObj.tag = newObj.tag.slice(0, 3));// 最多只能有3个标签
        tagStr = newObj.tag;
        newObj.tag = newObj.tag.join(',');
    }
    let result = await Article.create(newObj);// 添加文章
    result = JSON.parse(JSON.stringify(result));
    // console.log('标签', newObj.tag);
    if (tagStr) { // 标签存在就添加标签
        tagStr.forEach(async tag => { // 循环添加标签
            await TagService.addTags({
                tag,
                articleId: result.id
            })
        });
    }
    return result
}

/**
 * 增加浏览数
 * @param {'int'} id 
 */
exports.addViews = async function (id) {
    id = +id;
    const testResult = validate({ id }, {
        id: {
            presence: true,
            type: "integer"
        },
    });
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    let result = await exports.getArticleById({ id });
    result = JSON.parse(JSON.stringify(result))
    result = await Article.update({
        views: ++result.views
    }, {
        where: {
            id,
        },
    });
    console.log('增加浏览', result);
    // return JSON.parse(JSON.stringify(result))
    return true
};

/**
 * 标签修改后修改文章的标签
 * @param {'int'} id 文章id
 * 标签id
 */
exports.changeArticleTag = async function ({ id }) {
    id = +id;
    let tags = await TagService.getTagsByPage({ articleId: id });//获取当前文章所有标签
    let tagArr = []; // 汇总标签
    // console.log('文章id', id);
    tags.rows.forEach(row => {
        tagArr.push(row.tag);
    });
    const tagStr = tagArr.join(',');
    // 更新文章标签
    const result = await Article.update({
        tag: tagStr,
    }, {
        attributes: { exclude: ['deletedAt'] },
        where: {
            id: id
        }
    })
    return result
}


/**
 * 获取一篇文章
 * @param {'int'} id 
 */
exports.getArticleById = async function ({ id, isAdmin }) {
    id = +id;
    const testResult = validate({ id }, {
        id: {
            presence: true,
            type: "integer"
        },
    });
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    const result = await Article.findByPk(id, {
        attributes: { exclude: isAdmin ? [] : ['deletedAt', 'updatedAt'] },
        include: [{// 你也可以继续在联表中继续联表查询 
            model: Users,
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt', 'password', 'power']
            },
            required: false,
        }]
    });
    return JSON.parse(JSON.stringify(result))
}

/**
 * 分页获取文章
 * @param {'object'}
 * @param {*} page int
 * @param {*} limit int
 * @param {*} id int
 * @param {*} userId int
 * @param {*} orderProp string 按谁排序
 * @param {*} order string 升还是降
 */
exports.getArticleByPage = async function ({ params, isAdmin }) {
    let { page = 1, limit = 10, id, title, userId, orderProp, order } = params;
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
    } if (limit) {
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
    if (userId) {
        userId = +userId; // 转换成数字
        const testResult = validate({ userId }, {
            userId: {
                presence: true,
                type: "integer"
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        where.userId = userId;
    }
    if (title) {
        const testResult = await validate({ title }, {
            title: {
                presence: {
                    allowEmpty: false, // 不允许为{},[],""," "
                },
                type: "string",
            }
        });
        if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
            throw testResult
        }
        where.title = { [Op.like]: `%${title}%` }
    }
    const orderCondition = [];
    if (orderProp) {
        const arr = []
        arr.push(orderProp);
        order ? arr.push(order) : arr.push("ASC");
        orderCondition.push(arr);
    }
    // console.log(where);
    // console.log(orderCondition);
    const result = await Article.findAndCountAll({
        attributes: { exclude: [isAdmin ? [] : ['deletedAt', 'updatedAt']] },
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
        order: orderCondition,
        include: [{// 你也可以继续在联表中继续联表查询 
            model: Users,
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt', 'password', 'power']
            },
            required: false,
        }]
    })
    return JSON.parse(JSON.stringify(result))
}

// 获取所有文章
exports.getArticleAll = async function () {
    const result = await Article.findAll({
        include: [{// 你也可以继续在联表中继续联表查询
            model: Users,
            attributes: { exclude: ['password', 'power'] },
            required: false
        }]
    });
    return JSON.parse(JSON.stringify(result))
}

/**
 * 删除文章
 * @param {'int'} id 文章id
 */
exports.deleteArticle = async function (id) {
    // 过滤需要的值
    id = +id;
    // 验证数据
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
    const articleResult = await exports.getArticleById({ id });// 获取文章的信息
    if (!articleResult) {
        throw new Error('文章不存在！')
    }

    // const userResult = await UserService.getUserById(identity);// 获取你的身份信息
    // if (!userResult) {
    //     throw new Error('您的身份不存在！')
    // }
    // if (articleResult.userId === userResult.id) {// 自己的可以删除
    //     return await Article.destroy({
    //         where: {
    //             id
    //         }
    //     })
    // } else if (userResult.power > 0) {// 只有管理员以上权限才能删除别人的文章
    //     return await Article.destroy({
    //         where: {
    //             id
    //         }
    //     })
    // } else {
    //     throw new Error('您不能删除他人的作品！')
    // }
    return await Article.destroy({
        where: {
            id
        }
    })
}
