const express = require("express");
const router = express.Router();
const Service = require('../../services/init'); // 服务层server
// const getMsg = require("../getSendResult"); // 辅助函数

const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

// 提供页面信息

// 获取文章，阅读，评论数量
router.get('/api/other/article', getMsg.asyncHandler(async (req, res) => {
	console.log('其他');
	const articleResult = await Service.ArticleService.getArticleAll(); // 获取所有的文章
	const commentResult = await Service.CommentService.getCommentAll({ isAdmin: false }); // 获取所有的评论
	let articleRotal = 0,
		viewsRotal = 0,
		commentRotal = 0;
	if (articleResult && commentResult) {
		articleRotal = articleResult.length;
		articleResult.forEach(element => {
			viewsRotal += element.views;
		});
		commentRotal = commentResult.length;
		return {
			code: 0,
			msg: '获取成功！',
			data: {
				articleRotal, viewsRotal, commentRotal
			}
		}
	}
	throw new Error('获取失败')
}))
module.exports = router;
