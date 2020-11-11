import axios from './http'
export default {
    /**
     * 分页获取文章
     * @param {*} params 
     * @param {*} page 第几页
     * @param {*} limit 每页数量
     */
    getArticlePage(params) {
        return axios.get("/blog/api/article", {
            params
        })
    },
    /**
    * 根据id获取文章
    * @param {*} params id
    * @param {*} id 文章id
    */
    getArticleById(id) {
        return axios.get(`/blog/api/article/${id}`)
    },
    // 发布文章
    postArticle(params){
        return axios.post('/blog/admin/article',{
            data: params
        })
    },
    // /**
    //  * 根据用户id获取文章
    //  * @param {*} params  object
    //  * @param {*} userId  
    //  */
    // getArticleByUser(params) {
    //     return axios.get("/blog/api/article", {
    //         params
    //     })
    // },
    // 获取文章，阅读，评论数量
    getArticleMes() {
        return axios.get('/blog/api/other/article')
    },
    //增加浏览量
    addArticleVivew(articleId) {
        return axios.put(`/blog/api/article/${articleId}`);
    },
    // 根据用户id获取用户信息
    getUserById(id) {
        return axios.get(`/blog/api/user/${id}`)
    },
    // 根据文章id获取点赞数
    getPraiseByArticleId(params) {
        return axios.get(`/blog/api/praise`, {
            params
        })
    },
    // 根据文章id获取评论
    getCommentByArticleId(articleId) {
        return axios.get(`/blog/api/comment/${articleId}`)
    },
    // 提交评论
    submitComment(params) {
        return axios.post('/blog/api/comment', {
            data: params
        })
    },
    deleteComment(id) {
        return axios.delete('/blog/admin/comment/' + id)
    },
    // 登录
    login(params) {
        return axios.post('/blog/admin/admin/login', {
            data: params
        })
    },
    // 注册
    // register(params) {
    //     return axios.post('/blog/api/user/register', {
    //         data: params
    //     })
    // },
    // 直接留言
    pushMessage(params) {
        return axios.post('/blog/api/message', {
            ...params
        })
    },
    // 回复留言
    replyMessage(params) {
        return axios.post('/blog/admin/message', {
            data: params
        })
    },
    // 分页获取留言
    getMessageByPage(params) {
        return axios.get('/blog/api/message', {
            params
        })
    },
    deleteMessage(id){
        return axios.delete('/blog/admin/message/' + id)
    },
    // 取消登录
    cancleLogin() {
        return axios.post('/blog/admin/user/cancle')
    }
}