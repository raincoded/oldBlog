// 随机生成文章
const Mock = require('mockjs');
const Service = require('../../server/services/init');
var mockdatas = [{
    title: 'Laravel5.4安装passport时遇到的一些问题',
    tag: 'laravel,nginx,proxy,vue'
},
{
    title: 'Vue history模式编译后nginx无法访问的问题',
    tag: 'vue'
},
{
    title: '屏蔽nPlayer视频广告',
    tag: 'nPlayer'
},
{
    title: 'php 验证身份证号',
    tag: '验证身份'
},
{
    title: 'redis命令笔记',
    tag: 'redis'
},
{
    title: '这两天搞了win7+ubuntu双系统',
    tag: 'ubuntu,win7,ubuntu12双系统'
},
{
    title: '微软果然开始封锁盗版win7了！',
    tag: 'win7盗版'
},
{
    title: 'win7 重建图标缓存',
    tag: ''
}
]

var i = 1;
var Random = Mock.Random;

const data = Mock.mock({
    'list|7': [{
        'title|': function () {
            // return Random.ctitle(5)
            // console.log( mockdatas[i].title);
            const title = mockdatas[i].title
            return title
        },
        'content': function () {
            return Random.cparagraph(2)
        },
        'author': function () {
            return Random.cname()
        },
        'views': 0,
        'tag': function () {
            // var a = Math.round(Math.random() * (3 - 1) + 1)
            // var arr = []
            // for (let i = 0; i < a; i++) {
            //     arr.push(Random.ctitle(3))
            // }
            // return arr.toString()
            const tag = mockdatas[i++].tag
            return tag
        },
        'userId': function () {
            return Math.round(Math.random() * (32 - 23) + 23)
        }
    }]
})
async function a() {
    for (var i = 0; i < data.list.length; i++) {
        // console.log(data.list[i]);
        const article = await Service.ArticleService.addArticle(data.list[i])
        // await Service.TagService.addTags({
        //     tag:data.list[i].tag
        // })
        // console.log('文章', article.id);
        // console.log('标签', data.list[i].tag.split(','));
        if (data.list[i].tag.length>0) {
            const tag = data.list[i].tag.split(',')
            // return 
            for (let j = 0; j < tag.length; j++) {
                Service.TagService.addTags({
                    tag: tag[j],
                    articleId: article.id
                })
            }
        }

    }
    // console.log('ok');
}
a()
// console.log(data);