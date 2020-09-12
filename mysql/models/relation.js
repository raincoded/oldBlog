// 设置模型关系
const Article = require("./Article");
const Tags = require("./Tags");
const Comments = require("./Comments");
Article.hasMany(Comments);
Article.hasMany(Tags);
Tags.belongsTo(Article);


