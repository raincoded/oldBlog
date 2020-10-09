import axios from './http'
export default {
    /**
     * 获取表情
     */
    getEmoji() {
        return axios.get("/json/emoji.json")
    },
}