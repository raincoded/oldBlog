const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const cookieParser = require("cookie-parser");
//指定静态资源路径
const staticRoot = path.resolve(__dirname, "../public");

// console.log(staticRoot);

// 页面重定向
// const history = require('connect-history-api-fallback');
// app.use(history());

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({extended: true})); // extended表示是否使用新的qs(querystring)库解析

// 解析 application/json 格式的请求体
app.use(express.json());

// 处理静态资源
app.use(express.static(staticRoot));

// app.set('trust proxy', true);// 处理代理地址

// 使用cookie中间件
app.use(cookieParser('nihao'));

// 解析token
app.use(require('./tokenMiddleware'))

// 上传文本
app.use("/upload/uploadTxt", require('./upload/uploadTxt'));

// 上传图片
app.use("/upload/uploadImg", require('./upload/uploadImg'));

// 其他请求
app.use("/api/user", require('./api/user'));
app.use("/api/admin", require('./api/admin'));
app.use("/api/article", require('./api/article'));
app.use("/api/comment", require('./api/comment'));
app.use("/api/tag", require('./api/tag'));
app.use("/api/praise", require('./api/praise'));
app.use("/api/essays", require('./api/essays'));
app.use("/api/message", require('./api/message'));
app.use("/api/other", require('./api/other'));

// 错误中间件
app.use(require('./errorMiddleware'))

// 监听端口
app.listen(port, '0.0.0.0', () => {
    console.log(`server listen on ${port}`);
});

// /*
// 输入：strIP：ip地址
// 返回：如果通过验证返回true,否则返回false；
// */
// function isIP(strIP) {
//     if (isNull(strIP)) return false;
//     var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
//     if (re.test(strIP)) {
//         if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
//     }
//     return false;
// }
// //ipv4
// var v4reg = /^((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))\.(((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([0-9]))\.){2}((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))$/
// var v6reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/gm;
