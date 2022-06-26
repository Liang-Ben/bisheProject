import {request} from './request'
export function _submitNote(id,isbn,content,pub){
    var data = new FormData;
    data.append("id",id)
    data.append("isbn",isbn)
    data.append("content",content)
    data.append("pub",pub)
    return request({
        url: '/note/submit',
        method:'post',
        data:data
    })
}
export function _UpdateNote(Id,content,pub){
    return request({
        url: '/note/update',
        params:{
            Id,
            content,
            pub
        }
    })
}
export function _selectById(Id){
    return request({
        url: '/note/selectById',
        params:{
            Id,
        }
    })
}

export function _selectByIsbn(pageSize,pageNum,isbn){
    return request({
        url: '/note/selectByIsbn',
        params:{
            pageSize,
            pageNum,
            isbn
        }
    })
}

export function _selectAll(pageSize,pageNum){
    return request({
        url: '/note/select',
        params:{
            pageSize,
            pageNum,
        }
    })
}

export function _selectByUser(pageSize,pageNum,userId){
    return request({
        url: 'note/selectByUser',
        method: 'post',
        params:{
            pageSize,
            pageNum,
            userId
        }
    })
}

export function _DeleteNote(id){
    return request({
        url: 'note/delete',
        method: 'get',
        params:{
            id
        }
    })
}