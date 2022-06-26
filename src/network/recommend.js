import {request} from '../network/request'
export function _RecommendByUser(userId,num){
    let form = new FormData
    form.append("userId",userId)
    form.append("num",num)
    return request({
        url: '/recommend/ByUser',
        method: 'post',
        data:form
    })
}

export function _RecommendByItem(userId,itemId,num){
    let form = new FormData
    form.append("userId",userId)
    form.append("itemId",itemId)
    form.append("num",num)
    return request({
        url: '/recommend/ByItem',
        method: 'post',
        data:form
    })
}