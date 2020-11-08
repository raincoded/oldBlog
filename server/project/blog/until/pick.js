/**
 * 对对象过滤出想要的属性
 * @param {*} obj 要过滤的对象
 * @param  {...any} props 过滤的项
 */
module.exports = function (obj, ...props) {
    if (!obj || typeof (obj) !== 'object') {
        return obj
    }
    const newObj = {};
    for (const key in obj) {
        if (props.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj
}