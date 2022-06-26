import {request} from '../network/request'
export function _Insert(id,isbn,rate){
    return request({
        url: '/collect/insert',
        method: 'post',
        params:{
            id,
            isbn,
            rate
        }
    })
}

export function _Delete(id,isbn){
    return request({
        url: '/collect/delete',
        method: 'post',
        params:{
            id,
            isbn,
        }
    })
}

export function _SelectAll(pageSize,pageNum,id){
    return request({
        url: '/collect/selectAll',
        method: 'post',
        params:{
            pageSize,
            pageNum,
            id,
        }
    })
}

export function _Update(id,isbn,rate){
    return request({
        url: '/collect/update',
        method: 'post',
        params:{
            id,
            isbn,
            rate
        }
    })
}