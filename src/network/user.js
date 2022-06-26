import { request } from "./request";
import Qs from 'qs'
export function _userInsert(userName,passWord){
    return request({
        url: '/user/insert',
        params:{
            userName,
            passWord
        }
    })
}
export function _userDelete(id){
    return request({
        url: '/user/delete',
        params:{
            id
        }
    })
}
export function _userLogin(id,passWord){
    let params = {
        id,
        passWord
    }
    console.log(params)
    return request({
        method: 'post',
        url: '/user/login',
        data:params
    })
}
export function _userMessage(){
    return request({
        url: '/user/message',
        method:'post',
    })
}
export function _userUpdata(form){
    let formData = new FormData;
    formData.append("id",form.id)
    formData.append("userName",form.userName)
    formData.append("passWord",form.passWord)
    formData.append("sex",form.sex)
    formData.append("avator",form.file)
    formData.append("email",form.email)
    console.log(formData,form)
    return request({
        url: '/user/update',
        method:'post',
        data: formData
    })
}
export function _userSelect(id){
    return request({
        url: '/user/select',
        params:{
            id
        }
    })
}