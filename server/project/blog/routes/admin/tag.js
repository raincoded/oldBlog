const express = require("express");
const router = express.Router();
// 服务层server
const Service = require('../../services/init');
// const getMsg = require("../getSendResult"); // 辅助函数

const baseUrl = '/admin/tag';

const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

/**
 * 添加标签
 * @param {'Object'}
 * @param {*} articleId 文章id
 * @param {*} tag 标签
 */
router.post(baseUrl, getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const result = await Service.TagService.addTags({
        params: req.body,
        isAdmin: true
    });
    if (result) {
        await Service.ArticleService.changeArticleTag({ id: req.body.articleId }); // 增加标签后，统一修改文章表中的标签
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
router.get(baseUrl, getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const result = await Service.TagService.getTagsByPage({
        params: req.query,
        isAdmin: false
    });
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
router.get(baseUrl + '/all', getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
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
router.delete(baseUrl + '/:id', getMsg.asyncHandler(async (req, res) => {
    if (!req.userId) throw new Error('你不是管理员!')
    const articleTag = await Service.TagService.getTagsById({ id: req.params.id });// 查询当前的标签对应的文章id
    const result = await Service.TagService.deleteTag(req.params.id);
    if (result) {
        await Service.ArticleService.changeArticleTag({ id: articleTag.articleId }); //删除标签后，统一修改文章表中的标签
        return {
            msg: '删除成功！'
        }
    } else {
        throw new Error('删除失败！')
    }

}))

module.exports = router;