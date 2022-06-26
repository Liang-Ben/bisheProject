import axios from 'axios'
import { _Insert } from './collect';

export const Server = "http://localhost:8090"
const baseURL="/api"
function admin(config){
    const install = axios.create({
        baseURL,
        timeOut:2000
    });
    install.interceptors.request.use(data=>{
        if(!data.headers['token']&&localStorage.getItem("AdminToken")!=null){//前端这里设置token，如果Localstorage里没有token  header会设置token为null
            data.headers['token'] = localStorage.getItem("AdminToken")//然而这个null到后端会被解析成字符串"null"，无法配合拦截器判断空。所以前端直接在local没有token的时候不要加上这个头即可。
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

export function _InsertAdmin(userName,passWord){
    return admin({
        url: '/admin/insert',
        method: 'post',
        params: {
            userName,
            passWord
        }
    })
}

export function _message(){
    return admin({
        url: '/admin/message',
        method: 'post',
    })
}

export function _Delete(id){
    return admin({
        url: '/admin/delete',
        method: 'post',
        params: {
            id
        }
    })
}

export function _Login(id,passWord){
    return admin({
        url: '/admin/login',
        method: 'post',
        data: {
            id,
            passWord
        }
    })
}

export function _Update(form){
    let formData = new FormData;
    formData.append("id",form.id)
    formData.append("userName",form.userName)
    formData.append("passWord",form.passWord)
    return admin({
        url: '/admin/update',
        method: 'post',
        data: formData
    })
}

export function _selectUsers(pageSize,pageNum){
    return admin({
        url: '/admin/selectUsers',
        method: 'get',
        params: {
            pageSize,
            pageNum
        }
    })
}

export function _selectUser(id){
    return admin({
        url: '/admin/select',
        method: 'get',
        params: {
            id
        }
    })
}