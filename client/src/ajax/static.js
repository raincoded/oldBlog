import axios from './http'
export default {
    /**
     * 分页获取文章
     * @param {*} params 
     * @param {*} page 第几页
     * @param {*} limit 每页数量
     */
    getEmoji(params) {
        return axios.get("/json/emoji.json")
    },
}