import axios from './http'
export default {
    /**
     * 分页获取文章
     * @param {*} params 
     * @param {*} page 第几页
     * @param {*} limit 每页数量
     */
    getArticlePage(params) {
        return axios.get("/api/article", {
            params
        })
    },
    /**
    * 根据id获取文章
    * @param {*} params id
    * @param {*} id 文章id
    */
   getArticleById(id) {
       return axios.get(`/api/article/${id}`)
   },
    /**
     * 根据用户id获取文章
     * @param {*} params  object
     * @param {*} userId  
     */
    getArticleByUser(params) {
        return axios.get("/api/article", {
            params
        })
    },
    // 获取文章，阅读，评论数量
    getArticleMes(){
        return axios.get('/api/message/article')
    },
     // 根据用户id获取用户信息
     getUserById(id){
        return axios.get(`/api/user/${id}`)
    },
     // 根据文章id获取点赞数
     getPraiseByArticleId(params){
        return axios.get(`/api/praise`,{
            params
        })
    },

}