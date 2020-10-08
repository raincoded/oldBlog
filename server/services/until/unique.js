// 数组去重字符串
module.exports = function (arr) {
    var temp = {},
    arr = [],
    len = this.length;
// 遍历数组
for (var i = 0; i < len; i++) {
    // 判断temp的属性名里有没有数组的值，如果没有就执行里面的代码，则取反
    if (!temp[this[i]]) {
        temp[this[i]] = 'abc';
        arr.push(this[i]);
    }
}
return arr;
}