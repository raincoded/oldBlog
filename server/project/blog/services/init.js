// 服务层
const ArticleService = require("./ArticleService.js");

const UserService = require("./UserService.js");

const TagService = require("./TagService.js");

const CommentService = require("./CommentService.js");

const MessageService = require('./MessageService')

module.exports = {
    ArticleService,
    UserService,
    TagService,
    CommentService,
    MessageService,

}

// 移除
// const Article_Tag = require("./Article_Tag.js");
// Article_Tag,

// const PraiseService = require("./PraiseService.js");
// PraiseService,

// const EssaysService = require('./EssaysService')
// EssaysService