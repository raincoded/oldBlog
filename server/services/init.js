// 服务层
const ArticleService = require("./ArticleService.js");

const UserService = require("./UserService.js");

const TagService = require("./TagService.js");

const CommentService = require("./CommentService.js");

const PraiseService = require("./PraiseService.js");

const MessageService = require('./MessageService')

const EssaysService = require('./EssaysService')

module.exports = {
    ArticleService,
    UserService,
    TagService,
    CommentService,
    PraiseService,
    MessageService,
    EssaysService
}

// 移除
// const Article_Tag = require("./Article_Tag.js");
// Article_Tag,