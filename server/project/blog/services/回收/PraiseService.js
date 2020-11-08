// const Praise = require("./../../mysql/models/blog/Praise");
// const UserService = require('./UserService');
// const ArticleService = require('./ArticleService');

const { Praise } = require("./../models/models");// 数据库模型
const { UserService, ArticleService } = require('./init')
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
const pick = require('./../until/pick');
const validate = require('validate.js'); // 数据验证

/**
 * 某个人增加或取消文章点赞
 * @param {'Object'}
 * @param {*} articleId 文章id
 * @param {*} userId 用户id
 */
exports.updatePraise = async function (obj) {
    const newObj = pick(obj, 'articleId', 'userId');// 过滤需要的值
    newObj.userId = +newObj.userId;
    newObj.articleId = +newObj.articleId;
    // 验证数据,返回undefined表示通过
    const testResult = validate(newObj, {
        articleId: {
            presence: true,
            type: "integer",
        },
        userId: {
            presence: true,
            type: "integer",
        },
    })
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }
    const userResult = await UserService.getUserById(newObj.userId);// 查询用户是否存在
    if (!userResult) {
        throw new Error('用户不存在！')
    }
    const articleResult = await ArticleService.getArticleById(newObj.articleId)// 查询文章是否存在
    if (!articleResult) {
        throw new Error('文章不存在！')
    }
    const queryResult = await exports.getPraiseAll(newObj);
    if (queryResult.count > 0) {
        // console.log('你点过赞');
        const result = await Praise.destroy({
            where: {
                ...newObj
            }
        })
        return false
    }
    const result = await Praise.create(obj);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 分页获取点赞
 * @param {'Object'} 
 * @param {*} page  int
 * @param {*} limit  int
 * @param {*} articleId  int
 * @param {*} userId int
 */
exports.getPraiseByPage = async function (obj) {
    let { page = 1, limit = 10, articleId, userId } = obj;
    const where = {};
    // 验证数据,返回undefined表示通过
    if (page) {
        page = +page;
        const testResult = validate({ page }, {
            page: {
                presence: true,
                type: "integer",
            },
        })
        if (testResult) {
            throw testResult
        }
    }
    if (limit) {
        limit = +limit;
        const testResult = validate({ limit }, {
            limit: {
                presence: true,
                type: "integer",
            },
        })
        if (testResult) {
            throw testResult
        }
    }

    if (articleId) {
        // console.log(articleId, userId);
        articleId = +articleId;
        const testResult = validate({ articleId }, {
            articleId: {
                type: "integer",
            },
        })
        if (testResult) {
            throw testResult
        }
        where.articleId = articleId;
    }
    if (userId) {
        userId = +userId;
        const testResult = validate({ userId }, {
            page: {
                type: "integer",
            },
        })
        if (testResult) {
            throw testResult
        }
        where.userId = userId;
    }
    if (where.length == 0) {
        throw new Error('文章或用户id缺少！')
    }
    const result = await Praise.findAndCountAll({
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return JSON.parse(JSON.stringify(result))
}

// 获取所有点赞
exports.getPraiseAll = async function () {
    const result = await Praise.findAll({ attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } })
    return JSON.parse(JSON.stringify(result))
}


// /**
//  * 更新点赞
//  * @param {*} 
//  */
// exports.updatePraise = async function (obj) {
//     const result = await Praise.update(obj);
//     console.log(result);
//     console.log(JSON.parse(JSON.stringify(result)));
//     return JSON.parse(JSON.stringify(result))
// }

// /**
//  * 某个人删除了点赞
//  * @param {'object'} 
//  * @param {*} articleId  int
//  * @param {*} userId int
//  */
// exports.deletePraise = async function ({ articleId, userId } = {}) {
//     const result = await Praise.destroy({
//         where: {
//             articleId,
//             userId
//         }
//     });
//     // console.log(result);
//     // console.log(JSON.parse(JSON.stringify(result)));
//     return JSON.parse(JSON.stringify(result))
// }


// /**
//  * 获取所有点赞
//  * @param {'Object'} 
//  * @param {*} page  int
//  * @param {*} limit  int
//  * @param {*} articleId  int
//  * @param {*} userId int
//  */
// exports.getPraiseAll = async function ({ page = 1, limit = 10, articleId, userId } = {}) {
//     articleId && (where.articleId = articleId);
//     userId && (where.userId = userId);
//     const result = await Praise.findAndCountAll({
//         where: {
//             ...where,
//         },
//         offset: (page - 1) * limit,
//         limit: +limit,
//     })
//     return JSON.parse(JSON.stringify(result))
// }