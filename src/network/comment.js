import { request } from "./request";
export function _InsertComment(userId,isbn,content,score){
    return request({
        url: '/comment/insert',
        method: 'post',
        params:{
            userId,
            isbn,
            content,
            score
        }
    })
}
export function _UpdateComment(Id,content,score){
    return request({
        url: '/comment/update',
        method: 'post',
        params:{
            Id,
            content,
            score
        }
    })
}
export function _selectByUser(pageSize,pageNum,userId){
    return request({
        url: 'comment/selectByUser',
        method: 'post',
        params:{
            pageSize,
            pageNum,
            userId
        }
    })
}


export function _DeleteComment(id){
    return request({
        url: 'comment/delete',
        method: 'get',
        params:{
            id
        }
    })
}
export function _selectComments(pageSize,pageNum,isbn){
    return request({
        url: 'comment/selectByIsbn',
        method: 'post',
        params:{
            pageSize,
            pageNum,
            isbn
        }
    })
}


export function _selectAll(pageSize,pageNum){
    return request({
        url: 'comment/select',
        method: 'post',
        params:{
            pageSize,
            pageNum
        }
    })
}