const Tags = require("./../../mysql/models/Tags");
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
const db = require("../../mysql/models/db"); // 去重需要用sequelize实例
const validate = require('validate.js'); // 数据验证
const ArticleService = require('./ArticleService');
const pick = require('./until/pick');
// const unique = require('./until/unique');

/**
 * 分页获取标签
 * @param {int} page 
 * @param {int} limit 
 * @param {string} tag 
 * @param {int} articleId 
 * @param {int} distinct 表示是否获取不重复的标签
 */
exports.getTagsByPage = async function (obj) {
    let { page = 1, limit = 10, tag, articleId, distinct } = obj;
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
    if (tag) {
        const testResult = validate({ tag }, {
            tag: {
                type: "string",
            },
        })
        if (testResult) {
            throw testResult
        }
        where.tag = { [Op.like]: `%${tag}%` }
    }
    if (articleId) {
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
    if (distinct) {
        where.distinct = true;
        const result = await Tags.findAndCountAll({
            attributes: [[db.literal('DISTINCT `tag`'), 'tag']],
            offset: (page - 1) * limit,
            limit: +limit,
        })
        return JSON.parse(JSON.stringify(result))
    }
    const result = await Tags.findAndCountAll({
        // attributes: ['tag', 'articleId', 'id'],
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return JSON.parse(JSON.stringify(result))
}

// 获取所有标签
exports.getTagsAll = async function () {
    const result = await Tags.findAll({ attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } })
    return JSON.parse(JSON.stringify(result))
}

/**
 * 添加标签，每次只能添加一个
 * @param {*} obj 
 * @param {*} articleId 
 * @param {*} tag 
 */
exports.addTags = async function (obj) {
    // , {attributes: ["id", "tag", "articleId"],}
    const newObj = pick(obj, 'articleId', 'tag');// 过滤需要的值
    newObj.articleId = +newObj.articleId;
    // 验证数据,返回undefined表示通过
    const testResult = validate(newObj, {
        articleId: {
            presence: true,
            type: "integer",
        },
        tag: {
            presence: {
                allowEmpty: false, // 不允许为{},[],""," "
            },
            type: "string",
        },
    })
    if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
        throw testResult
    }

    const articleResult = await ArticleService.getArticleById(newObj.articleId);// 查询文章是否存在
    if (!articleResult) {
        throw new Error('文章不存在！')
    }
    const tagResult = await exports.getTagsAll({ articleId: newObj.articleId });// 查询文章对应的标签
    if (tagResult.count >= 3) {
        throw new Error('标签只能添加3个！')
    }
    for (let i = 0; i < tagResult.count; i++) {
        if (tagResult.rows[i].tag == newObj.tag) {
            throw new Error('不能添加重复标签！')
        }
    }
    const result = await Tags.create(obj);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 删除标签
 * @param {int} id 标签id
 */
exports.deleteTag = async function (id) {
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
    const tagResult = await exports.getTagsById(id);// 查看id存在不存在
    if (!tagResult) {
        throw tagResult
    }

    return await Tags.destroy({
        where: {
            id
        }
    });
}

/**
 * 根据id查看标签
 * @param {*} id 
 */
exports.getTagsById = async function (id) {
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
    const result = await Tags.findByPk(id, {
        // attributes: ["id", "tag", "articleId"],
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
    });
    if (result) {
        return JSON.parse(JSON.stringify(result))
    }
    throw new Error('标签id不存在')
}



// /**
//  * 获取所有标签
//  * @param {int} page 
//  * @param {int} limit 
//  * @param {string} tag 
//  * @param {int} articleId 
//  * @param {int} id 
//  */
// exports.getTagsAll = async function ({ page = 1, limit = 10, tag = '', articleId, id } = {}) {
//     const where = {};
//     articleId && (where.articleId = articleId);
//     id && (where.id = id);
//     // attributes: ["id", "tag", "articleId"],
//     const result = await Tags.findAndCountAll({
//         where: {
//             tag: {
//                 [Op.like]: `%${tag}%`
//             },
//             ...where
//         },
//         offset: (page - 1) * limit,
//         limit: +limit,
//     })
//     return JSON.parse(JSON.stringify(result))
// }

// /**
//  * 根据id查看标签
//  * @param {*} id 
//  */
// exports.getTagsById = async function (id) {
//     const result = await Tags.findByPk(id, {
//         attributes: ["id", "tag", "articleId"],
//     });
//     if (result) {
//         return JSON.parse(JSON.stringify(result))
//     }
//     return null;
// }

// /**
//  * 根据tag查标签
//  * @param {*} tag 
//  */
// exports.getTagsByTag = async function (tag) {
//     const result = await Tags.findAll({
//         attributes: ["id", "tag", "articleId"],
//         where: {
//             tag: {
//                 [Op.like]: `%${tag}%`, //模糊查询
//             }
//         }
//     });
//     // console.log('未json',result);
//     // console.log('已json',JSON.parse(JSON.stringify(result)));
//     if (result) {
//         return JSON.parse(JSON.stringify(result))
//     }
//     return null;
// }

// /**
//  * 根据articleId查标签
//  * @param {*} articleId 
//  */
// exports.getTagsByArticleId = async function (articleId) {
//     const result = await Tags.findAll({
//         where: {
//             articleId: articleId
//         }
//     });

//     if (result) {
//         return JSON.parse(JSON.stringify(result))
//     }
//     return null;
// }


// /**
//  * 修改标签
//  * @param {*} obj 
//  * @param {*} articleId 
//  * @param {*} tag 
//  */
// exports.updataTags = async function (obj) {
//     const newObj = pick(obj, 'articleId', 'tag');// 过滤需要的值
//     newObj.articleId = +newObj.articleId;
//     // 验证数据,返回undefined表示通过
//     const testResult = validate(newObj, {
//         articleId: {
//             presence: true,
//             type: "integer",
//         },
//         tag: {
//             presence: {
//                 allowEmpty: false, // 不允许为{},[],""," "
//             },
//             type: "string",
//         },
//     })
//     if (testResult) {// 同步代码我们需手动抛出错误，异步会直接抛出
//         throw testResult
//     }
//     const articleResult = await ArticleService.getArticleById(newObj.articleId);// 查询文章是否存在
//     if (!articleResult) {
//         throw new Error('文章不存在！')
//     }
//     const tagResult = await exports.getTagsAll({ articleId: newObj.articleId });// 查询文章对应的标签
//     if (tagResult.count >= 3) {
//         throw new Error('标签只能添加3个！')
//     }
//     // 处理传过来的tag，每次只能传一个
//     let tags = newObj.tag.split(','); 
//     tags = unique(tags);
//     tagResult.rows.forEach(element => {

//     });





//     console.log('标签', tagResult);




//     const result = await Tags.create(obj);
//     return JSON.parse(JSON.stringify(result))
// }