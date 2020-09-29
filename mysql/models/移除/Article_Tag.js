const Article_Tag = require("./Article_Tag_mapping");
const {
    Op
    } = require("sequelize"); // 用操作符是需要导入 Op
/**
 * 添加标签
 * @param {*} obj 
 */
exports.addArticle_Tag = async function (obj) {
    const result = await Article_Tag.create(obj);
    return result.toJSON()
}

/**
 * 根据id查看标签
 * @param {*} id 
 */
exports.getArticle_TagById = async function (id) {
    const result = await Article_Tag.findByPk(id);
    if (result) {
        return result.toJSON()
    }
    return null;
}




/**
 * 获取所有标签
 * @param {*} page 
 * @param {*} limit 
 * @param {*} keywords 
 */
exports.getArticle_TagAll = async function () {
    const result = await Article_Tag.findAndCountAll({})
    return result
}
