import axios from 'axios'

export const Server = "http://localhost:8090"
export const avatorServer = 'http://localhost:8090/image/avator/'
const baseURL="/api"
export function request(config){
    const install = axios.create({
        baseURL,
        timeOut:2000
    });
    install.interceptors.request.use(data=>{
        if(!data.headers['token']&&localStorage.getItem("token")!=null){//前端这里设置token，如果Localstorage里没有token  header会设置token为null
            data.headers['token'] = localStorage.getItem("token")//然而这个null到后端会被解析成字符串"null"，无法配合拦截器判断空。所以前端直接在local没有token的时候不要加上这个头即可。
        }
        return data;
    },err=>{
        return err
    });
    install.interceptors.response.use(data=>{
        return data
    },err=>{
        throw err;
    });
    return install(config);
}