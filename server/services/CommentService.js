const Comments = require("./../../mysql/models/Comments");
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
const validate = require('validate.js'); // 数据验证
const ArticleService = require('./ArticleService');
const UserService = require('./UserService');
const pick = require('./until/pick');

/**
 * 发布评论
 * @param {'Object'} obj 
 * @param {'int'} articleId 文章id
 * @param {'string'} content 评论内容
 * @param {'int'} parent 回复谁，无值则回复作者
 * @param {'int'} author 评论人
 * @param {'string'} name 未登录用户的name
 * @param {'string'} email 未登录用户的email
 */
exports.addComment = async function (obj, ip) {
    let newObj = pick(obj, 'articleId', 'content', 'parent', 'author');
    const testResult = validate({
        articleId: +newObj.articleId,
        content: newObj.content
    }, {
        articleId: {
            presence: true,
            type: "integer",
        },
        content: {
            presence: true,
            type: "string",
        },
    })
    if (testResult) {
        throw testResult
    }
    // 没设置回复对象表示回复文章作者
    if (!newObj.parent) {
        const ariticle = await ArticleService.getArticleById(newObj.articleId);
        if (!ariticle) {
            throw new Error('文章不存在！')
        }
        newObj.parent = ariticle.userId;
    }
    // 如果没有则创建游客
    if (!newObj.author) {
        const userMes = pick(obj, 'name', 'email')
        userMes.power = -2;
        userMes.password = '123456';
        const user = await UserService.addUsers(userMes);
        newObj.author = user.id;
    }
    // console.log(newObj);
    const result = await Comments.create(newObj);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 分页获取评论
 * @param {'object'} page
 * @param {*} page int
 * @param {*} limit int
 * @param {*} articleId string
 * @param {*} parent int
 * @param {*} author int
 */
exports.getCommentByPage = async function (obj) {
    let { page = 1, limit = 10, articleId, parent, author } = obj;
    const where = {}
    // 验证数据，由于不确定都有，需单独验证
    function testNumber(prop, num) {
        if (num) {
            const testResult = validate({ [prop]: +num }, {
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
    testNumber('page', page) && (page = +page);
    testNumber('limit', limit) && (limit = +limit);
    testNumber('articleId', articleId) && (where.articleId = +articleId);
    testNumber('parent', parent) && (where.parent = +parent);
    testNumber('author', author) && (where.author = +author);
    const orderCondition = [];
    if (orderProp) {
        orderCondition.push(orderProp);
        order?orderCondition.push(order):orderCondition.push("ASC")
    }
    const result = await Comments.findAndCountAll({
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
        order: [orderCondition]
    })
    // console.log('失败', result);
    return JSON.parse(JSON.stringify(result))
    // if (page) {
    //     page = +page; // 转换成数字
    //     const testResult = validate({ page }, {
    //         page: {
    //             presence: true,
    //             type: "integer"
    //         }
    //     });
    //     if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
    //         throw testResult
    //     }
    // } if (limit) {
    //     limit = +limit; // 转换成数字
    //     const testResult = validate({ limit }, {
    //         limit: {
    //             presence: true,
    //             type: "integer"
    //         }
    //     });
    //     if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
    //         throw testResult
    //     }
    // }
    // if (articleId) {
    //     articleId = +articleId; // 转换成数字
    //     const testResult = validate({ articleId }, {
    //         articleId: {
    //             presence: true,
    //             type: "integer"
    //         }
    //     });
    //     if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
    //         throw testResult
    //     }
    //     where.articleId = articleId;
    // }
    // if (parent) {
    //     parent = +parent; // 转换成数字
    //     const testResult = validate({ parent }, {
    //         parent: {
    //             presence: true,
    //             type: "integer"
    //         }
    //     });
    //     if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
    //         throw testResult
    //     }
    //     where.parent = parent;
    // }
    // if (author) {
    //     author = +author; // 转换成数字
    //     const testResult = validate({ author }, {
    //         author: {
    //             presence: true,
    //             type: "integer"
    //         }
    //     });
    //     if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
    //         throw testResult
    //     }
    //     where.author = author;
    // }

    // articleId && (where.articleId = articleId);
    // parent && (where.parent = parent);
    // author && (where.author = author);

}

//获取所有评论
exports.getCommentAll = async function () {
    const result = await Comments.findAll({ attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } });
    return JSON.parse(JSON.stringify(result))
}

/**
 * 
 * @param {*} obj 
 * @param {'int'} id 评论id
 * @param {'int'} identity 你的身份
 */
exports.deleteComment = async function (obj) {
    let newObj = pick(obj, 'id', 'identity');
    newObj.id = +newObj.id;
    newObj.identity = +newObj.identity;
    const testResult = validate(newObj, {
        id: {
            presence: true,
            type: "integer",
        },
        identity: {
            presence: true,
            type: "integer",
        },

    })
    if (testResult) {
        throw testResult
    }

    //查看你的身份
    const userMes = await UserService.getUserById(newObj.identity);
    //查看评论的信息
    const commentMes = await exports.getCommentById(newObj.id);
    if (!commentMes) {
        throw new Error('评论不存在！')
    }
    // 管理员或者删除自己的
    if (userMes.power > 0 || userMes.id == commentMes.author) {
        return await Comments.destroy({
            where: {
                id: newObj.id
            }
        })
    } else {
        throw new Error('您不能删除别人的评论！')
    }

}

/**
 * 根据id获取评论
 * @param {*} id string
 */
exports.getCommentById = async function (id) {
    id = +id;
    const testResult = validate({ id }, {
        id: {
            presence: true,
            type: "integer",
        },
    })
    if (testResult) {
        throw testResult
    }
    const result = await Comments.findByPk(id);
    return JSON.parse(JSON.stringify(result))
}