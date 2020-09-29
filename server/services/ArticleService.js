const Article = require("./../../mysql/models/Article");
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
const validate = require('validate.js'); // 数据验证
const pick = require('./until/pick');
const UserService = require('./UserService'); // 服务层server
const TagService = require('./TagService'); // 服务层server

const xss = require('xss');
/**
 * 发布文章
 * @param {'Object'} obj 
 */
exports.addArticle = async function (obj) {
    const newObj = pick(obj, 'title', 'content', 'userId', 'tag');// 过滤需要的值
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
    const idResult = await UserService.getUserById(newObj.userId);
    if (idResult) {
        newObj.views = 0;
        newObj.title = xss(newObj.title);
        newObj.content = xss(newObj.content);
        newObj.tag = xss(newObj.tag);
        let result = await Article.create(newObj);
        result = JSON.parse(JSON.stringify(result))
        if (newObj.tag) {
            const tags = newObj.tag.split(',');
            const newTag = tags.slice(0, 3).join(',');
            await TagService.addTags({
                tag: newTag,
                articleId: result.id
            })
        }
        return result
    } else {
        throw new Error('您的id不存在！')
    }
}

/**
 * 增加浏览数
 * @param {'int'} id 
 */
exports.addViews = async function (id) {
    id = +id;
    const newObj = pick({ id }, 'id');// 过滤需要的值
    const testResult = validate(newObj, {
        id: {
            presence: true,
            type: "integer"
        },
    });
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    let result = await exports.getArticleById(id);
    result = JSON.parse(JSON.stringify(result))
    result = await Article.update({
        views: ++result.views
    }, {
        where: {
            id,
        },
    });
    // return JSON.parse(JSON.stringify(result))
    return true
};

/**
 * 修改文章的标签
 * @param {'int'} id 
 * @param {'int'} tag 
 * 标签
 */
exports.changeArticleTag = async function (obj) {
    const newObj = pick(obj, 'id', 'tag');// 过滤需要的值
    newObj.id = +newObj.id;
    const testResult = validate(newObj, {
        id: {
            presence: true,
            type: "integer"
        },
        tag: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string"
        },
    });
    if (testResult) {
        throw testResult
    }
    const tags = newObj.tag.split(',');
    const newTag = tags.slice(0, 3).join(',');
    const result = await Article.update({
        tag: newTag,
    } ,{
        where: {
            id: newObj.id
        }
    })
    return result
}


/**
 * 获取一篇文章
 * @param {'int'} id 
 */
exports.getArticleById = async function (id) {
    id = +id;
    const newObj = pick({ id }, 'id');// 过滤需要的值
    const testResult = validate(newObj, {
        id: {
            presence: true,
            type: "integer"
        },
    });
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    const result = await Article.findByPk(id);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 获取所有文章
 * @param {'object'}
 * @param {*} page int
 * @param {*} limit int
 * @param {*} id int
 */
exports.getArticleAll = async function (obj) {
    let { page = 1, limit = 10, id, title } = obj;
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
    const result = await Article.findAndCountAll({
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return JSON.parse(JSON.stringify(result))
}

/**
 * 删除文章
 * @param {'int'} id 文章id
 * @param {'int'} identity 你的id
 */
exports.deleteArticle = async function (obj) {
    // 过滤需要的值
    let { id, identity } = pick(obj, 'id', 'identity');
    id = +id;
    identity = +identity;
    // 验证数据
    const testResult = validate({ id, identity }, {
        id: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "integer"
        },
        identity: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "integer"
        }
    });
    if (testResult) {// 同步代码，需手动报错
        throw testResult
    }
    const articleResult = await exports.getArticleById(id);// 获取文章的信息
    if (!articleResult) {
        throw new Error('文章不存在！')
    }
    const userResult = await UserService.getUserById(identity);// 获取你的身份信息
    if (!userResult) {
        throw new Error('您的身份不存在！')
    }
    if (articleResult.userId === userResult.id) {// 自己的可以删除
        return await Article.destroy({
            where: {
                id
            }
        })
    } else if (userResult.power > 0) {// 只有管理员以上权限才能删除别人的文章
        return await Article.destroy({
            where: {
                id
            }
        })
    } else {
        throw new Error('您不能删除他人的作品！')
    }
}
