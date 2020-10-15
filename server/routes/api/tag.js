const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
const getMsg = require("../getSendResult"); // 辅助函数

/**
 * 添加标签
 * @param {'Object'}
 * @param {*} articleId 文章id
 * @param {*} tag 标签
 */
router.post('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.TagService.addTags(req.body);
    if (result) {
        await Service.ArticleService.changeArticleTag(req.body.articleId); // 增加标签后，统一修改文章表中的标签
        return {
            msg: '添加成功！',
            data: {
                "id": result.id,
                "articleId": result.articleId,
                "tag": result.tag,
            }
        }
    } else {
        throw new Error('添加失败！')
    }
}))

/**
 * 分页获取标签
 * @param {'Object'}
 * @param {int} page 
 * @param {int} limit 
 * @param {*} articleId 文章id
 * @param {*} tag 标签
 * @param {int} distinct 表示是否获取不重复的标签
 */
router.get('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.TagService.getTagsByPage(req.query);
    // console.log(result);
    if (result.count > 0) {
        return {
            msg: '获取成功！',
            data: result
        }
    } else {
        return {
            msg: '没有相关标签！',
            data: result
        }
    }
   
}))

// 获取所有标签
router.get('/all', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.TagService.getTagsAll();
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    } else {
        return {
            msg: '没有相关标签！',
            data: result
        }
    }
}))


/**
 * 删除标签
 * @param {int} id 标签id
 */
router.delete('/:id', getMsg.asyncHandler(async (req, res) => {
    const articleTag = await Service.TagService.getTagsById(req.params.id);// 查询当前的标签对应的文章id
    const result = await Service.TagService.deleteTag(req.params.id);
    if (result) {
        await Service.ArticleService.changeArticleTag(articleTag.articleId); //删除标签后，统一修改文章表中的标签
        return {
            msg: '删除成功！'
        }
    } else {
        throw new Error('删除失败！')
    }

}))

module.exports = router;