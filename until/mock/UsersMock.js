// 随机生成用户
const Mock = require('mockjs');
const Service = require('../../server/services/init');
var Random = Mock.Random;
let data = Mock.mock({
    'list|1': [{
        'name|': function () {
            return Random.cname(5)
        },
        'email': function () {
            return `${Random.word(1)}@qq.com`
        },
        'password': function () {
            return Random.word(10)
        },
        'power':-1
    }]
})

// list = data.list;
// // console.log(list);
// async function a(){
//     for(var i=0;i<list.length;i++){
//         console.log(list[i]);
//         await Service.UserService.addUsers(list[i])
//     }
// }
// a()
Service.UserService.addUsers(data.list).then(req=>{
    console.log('正确',req);
}).catch(err=>{
    console.log('错误',err);
})