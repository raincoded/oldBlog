const Article = require("./../../mysql/models/Article");
/**
 * 发布文章
 * @param {Object} obj 
 */
exports.addArticle = async function (obj) {
    if (!obj.author) {
        obj.author = '匿名用户'
    }
    obj.views = 0;
    const ins = await Article.create(obj);
    return ins.toJSON()
}
/**
 * 获取一篇文章
 * @param {*} id 
 */
exports.getArticle = async function (id) {
    const result = await Article.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}
/**
 * 获取所有文章
 * @param {*} page 
 * @param {*} limit 
 * @param {*} keywords 
 */
exports.getArticleAll = async function () {
    const result = await Article.findAndCountAll({})
    return result
}
/**
 * 增加浏览数
 * @param {*} id 
 */
exports.addViews = async function (id) {
    const result = await this.getArticle(id);
    return await Article.update({
        views:++result.views
    }, {
        where: {
            id,
        },
    });
};
