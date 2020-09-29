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
    const result = await Service.TagService.addTags(req.body)
    if (result) {
        return {
            msg: '添加成功！',
            data: result
        }
    } else {
        throw new Error('添加失败！')
    }
}))


/**
 * 获取一堆标签
 * @param {'Object'}
 * @param {int} page 
 * @param {int} limit 
 * @param {*} articleId 文章id
 * @param {*} tag 标签
 * @param {int} distinct 表示是否获取不重复的标签
 */
router.get('/', getMsg.asyncHandler(async (req, res) => {
    const result = await Service.TagService.getTagsAll(req.query)
    if (result) {
        return {
            msg: '获取成功！',
            data: result
        }
    } else {
        throw new Error('没有相关标签！')
    }
}))

/**
 * 删除标签
 * @param {int} id 标签id
 */
router.delete('/:id', getMsg.asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const result = await Service.TagService.deleteTag(req.params.id);
    if (result) {
        return {
            msg: '删除成功！'
        }
    }else{
        throw new Error('删除失败！')
    }

}))







module.exports = router;