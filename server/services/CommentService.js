const Comments = require("./../../mysql/models/Comments");
const validate = require('validate.js'); // 数据验证
const ArticleService = require('./ArticleService');
const UserService = require('./UserService');
const pick = require('./until/pick');
const testNumber = require('./until/testNumber')
/**
 * 发布评论
 * @param {'Object'} obj 
 * @param {'int'} articleId 文章id
 * @param {'string'} content 评论内容
 * @param {'int'} parent 回复谁，无值则回复作者
 * @param {'int'} userId 评论人
 * @param {'int'} mainId 评论id,表示属于哪条评论下
 * @param {'string'} name 未登录用户的name
 * @param {'string'} email 未登录用户的email
 */
exports.addComment = async function (obj, ip) {
    let newObj = pick(obj, 'articleId', 'content', 'parent', 'userId', 'mainId', 'secondId');
    // console.log(newObj);
    newObj.articleId = +newObj.articleId;
    const testResult = validate({
        articleId: newObj.articleId,
        content: newObj.content
    }, {
        articleId: {
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
    if (newObj.mainId) {
        newObj.mainId = +newObj.mainId;
        const testResult = validate({
            mainId: newObj.mainId,
        }, {
            mainId: {
                presence: true,
                type: "integer",
            },
        })
        if (testResult) {
            throw testResult
        }
        const resultMain = await exports.getCommentById(newObj.mainId);
        // console.log('comment',result);
        if (!resultMain) {
            throw new Error('评论不存在！')
        }
        if (newObj.secondId) { // 次评论在
            newObj.secondId = +newObj.secondId;
            const testResult = validate({
                mainId: newObj.mainId,
            }, {
                mainId: {
                    presence: true,
                    type: "integer",
                },
            })
            if (testResult) {
                throw testResult
            }
            const resultSec = await exports.getCommentById(newObj.secondId);
            if (!resultSec) {
                throw new Error('评论不存在！')
            }
        }
    }
    // 没设置回复对象表示回复文章作者
    if (!newObj.parent) {
        const ariticle = await ArticleService.getArticleById(newObj.articleId);
        if (!ariticle) {
            throw new Error('文章不存在！')
        }
        newObj.parent = ariticle.userId;
    } else {
        newObj.parent = +newObj.parent;
        const testResult = validate({
            parent: newObj.parent,
        }, {
            parent: {
                presence: true,
                type: "integer",
            },
        })
        if (testResult) {
            throw testResult
        }
        // console.log('parent', newObj.parent);
        // 回复别人的前提是别人已经评论过了
        const result = await exports.getCommentByPage({ articleId: newObj.articleId, userId: newObj.parent });
        if (result.count == 0) {
            throw new Error('不能回复不存在的人！')
        }
    }

    // 如果没有则创建游客
    if (!newObj.userId) {
        const userMes = pick(obj, 'name', 'email');
        if (!userMes.name) {
            throw new Error("昵称不能为空！");
        }
        if (!userMes.email) {
            throw new Error("邮箱不能为空！");
        }
        const userResult = await UserService.getUserByPage(userMes)
        // console.log(userResult);
        if (userResult.count > 0) {
            newObj.userId = userResult.rows[0].id
        } else {
            userMes.power = -2;
            userMes.password = '123456';
            const user = await UserService.addUsers(userMes);
            newObj.userId = user.id;
        }
    }
    // console.log(newObj);
    const result = await Comments.create(newObj);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 分页获取评论
 * @param {'object'} obj
 * @param {*} page int
 * @param {*} limit int
 * @param {*} articleId int
 * @param {*} parent int
 * @param {*} userId int
 * @param {*} orderProp string 排序项
 * @param {*} order string 排序方式（顺/逆）
 */
exports.getCommentByPage = async function (obj) {
    let { page = 1, limit = 10, articleId, parent, userId, orderProp, order } = obj;
    const where = {}
    // 验证数据，由于不确定都有，需单独验证
    // function testNumber(prop, num) {
    //     if (num) {
    //         const testResult = validate({ [prop]: +num }, {
    //             [prop]: {
    //                 presence: true,
    //                 type: "integer"
    //             }
    //         });
    //         if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
    //             throw testResult
    //         }
    //         return true
    //     }
    //     return false
    // }
    testNumber('page', page) && (page = +page);
    testNumber('limit', limit) && (limit = +limit);
    testNumber('articleId', articleId) && (where.articleId = +articleId);
    testNumber('parent', parent) && (where.parent = +parent);
    testNumber('userId', userId) && (where.userId = +userId);
    const select = {
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
    }

    const orderCondition = [];
    if (orderProp) {
        orderCondition.push(orderProp);
        order ? orderCondition.push(order) : orderCondition.push("ASC")
        select.order = [orderCondition];
    }
    const result = await Comments.findAndCountAll(select)
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
    if (userMes.power > 0 || userMes.id == commentMes.userId) {
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

/**
 * 根据文章id查询所有评论
 * @param {'int'} articleId 
 */
exports.getCommentByArticleId = async function (articleId) {
    articleId = +articleId;
    const testResult = validate({ articleId }, {
        articleId: {
            presence: true,
            type: "integer",
        },
    })
    if (testResult) {
        throw testResult
    }
    let result = await Comments.findAll({
        where: {
            articleId,
        },
        attributes: { exclude: ['deletedAt', 'updatedAt'] }
    })
    result = JSON.parse(JSON.stringify(result));
    for (const key of result) {
        let parent = await searchUser(key.parent);
        let userId = await searchUser(key.userId)
        key.parent = parent;
        key.userId = userId;
    }
    return result
}
async function searchUser(id) {
    let result = await UserService.getUserById(id);
    if (result) {
        return {
            id: result.id,
            name: result.name
        }
    } else {
        return {
            id,
            name: '匿名用户'
        }
    }
}