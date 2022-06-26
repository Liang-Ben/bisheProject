import {request} from '../network/request'

export function _emailSend(userId){
    let data = new FormData;
    data.append("id",userId)
    return request({
        url: '/email/send',
        method:'post',
        data
    })
}

export function _emailCheck(userId,password,code){
    let data = new FormData;
    data.append("password",password)
    data.append("code",code)
    data.append("id",userId)
    return request({
        url: '/email/check',
        method:'post',
        data
    })
}