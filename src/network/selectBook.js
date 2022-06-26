import { request } from "./request";
export function _selectBook(isbn){
    return request({
        url: '/book/selectBook',
        params:{
            id:isbn
        }
    })
}

export function _selectAll(pageNum,pageSize){
    return request({
        url:'/book/selectBooks',
        params:{
            pageSize,
            pageNum
        }
    })
}

export function _selectByIsbn(isbn){//预览信息
    return request({
        url:'/book/selectByIsbn',
        params:{
            isbn
        }
    })
}
export function _selectByName(name){
    return request({
        url:'/book/selectByName',
        params:{
            name
        }
    })
}
export function _selectByAuthor(author){
    return request({
        url:'/book/selectByAuthor',
        params:{
            author
        }
    })
}
export function _selectType(){
    return request({
        url: '/book/selectAllType'
    })
}
export function _selectCart(){
    return request({
        url: '/book/selectCart'
    })
}
export function _selectSale(){
    return request({
        url: '/book/selectSale'
    })
}
export function _selectScore(){
    return request({
        url: '/book/selectScore'
    })
}
export function _selectBookType(typeid){
    return request({
        url: '/book/selectTypeId',
        params:{
            typeid
        }
    })
}