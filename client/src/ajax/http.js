import axios from 'axios'
axios.interceptors.request.use(config => { // config就是我们要发送的整个请求
    // console.log(config.url);
    return config; // 将处理的请求发送
})
axios.interceptors.response.use(res => { //服务器响应的数据
    if (res.status === 200) { // 200状态直接返回数据，其他状态再进行其他配置
        return res.data
    }
    return res;
})
export default axios