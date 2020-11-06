import axios from './http'
export default {
    /**
     * 获取表情
     */
    getEmoji() {
        return axios.get("/json/emoji.json")
    },
    // 上传图片
    uploadImg(formData){
        return  axios.post("/upload/uploadImg", formData)
    },
    // 上传文章
    uploadArticle(params){
        return  axios.post("/upload/uploadTxt", params)
    }
}