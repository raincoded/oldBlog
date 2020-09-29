const Comments = require("./../../mysql/models/Comments");
const { Op } = require("sequelize"); // 用操作符是需要导入 Op
/**
 * 发布评论
 * @param {'Object'} obj 
 */
exports.addComment = async function (obj) {
    const result = await Comments.create(obj);
    return JSON.parse(JSON.stringify(result))
}

/**
 * 获取所有评论
 * @param {'object'} page
 * @param {*} page int
 * @param {*} limit int
 * @param {*} articleId string
 * @param {*} parent int
 * @param {*} author int
 */
exports.getTagsAll = async function ({ page = 1, limit = 10, articleId, parent, author } = {}) {
    const where = {}
    articleId && (where.articleId = articleId);
    parent && (where.parent = parent);
    author && (where.author = author);
    const result = await Comments.findAndCountAll({
        where: {
            ...where
        },
        offset: (page - 1) * limit,
        limit: +limit,
    })
    return JSON.parse(JSON.stringify(result))
}