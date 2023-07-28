import axios from 'axios'



//创建axios实例,用于发送请求
const instance = axios.create({
    baseURL:'http://127.0.0.1:5000/api',//设置api的url
    timeout:5000,//设置5秒请求超时时间
});

//添加请求拦截器
instance.interceptors.request.use(
    function(config) {
        //在请求发送之前对请求配置进行处理
        //config参数是请求的配置对象，可以修改请求头、参数等
        return config
    },
    function(error) {
        //发生错误时的处理，将错误继续向后传递
        return Promise.reject(error)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    function(response) {
        //响应的数据部分
        return response.data
    },
    function(error) {
        return Promise.reject(error)
    }
)

//导出实例
export default instance;