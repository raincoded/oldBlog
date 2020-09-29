// 随机生成用户
const Mock = require('mockjs');
const Service = require('../../server/services/init');
var Random = Mock.Random;
const data = Mock.mock({
    'list|1': [{
        'name|': function () {
            return Random.cname(5)
        },
        'email': function () {
            return `${Random.word(1)}@qq.com`
        },
        'password': function () {
            return Random.word(17)
        },
        'power':-1
    }]
})
// console.log(data);

// for(var i=0;i<data.list.length;i++){
//     Service.UserService.addUsers(data.list[i])
// }
Service.UserService.addUsers(data.list).then(req=>{
    console.log('正确',req);
}).catch(err=>{
    console.log('错误',err);
})