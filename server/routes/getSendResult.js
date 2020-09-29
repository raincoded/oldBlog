// 辅助函数,用于将响应的信息进行规范化

// 错误
exports.getErr = function (err = "server internal error", errCode = 500) {
    return {
        code: errCode,
        msg: err,
    };
};

// 正确
exports.getResult = function (result) {
    return {
        code: 0,
        msg: result.msg ? result.msg : '',
        data: result.data ? result.data : '',
    };
};

// 用户处理异步报错
exports.asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            // res.send(result);// 正确时，发送响应
            res.send(exports.getResult(result));// 正确时，发送响应
        } catch (err) {
            next(err);
        }
    };
};

