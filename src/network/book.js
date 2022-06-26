import {request} from '../network/request'

export function _BookInsert(form){
    let  formData = new FormData();
    formData.append("isbn",form.isbn)
    formData.append("author",form.author)
    formData.append("authorIntro",form.authorIntro)
    formData.append("brand",form.brand)
    formData.append("description",form.description)
    formData.append("designed",form.designed)
    formData.append("name",form.name)
    formData.append("pages",form.pages)
    formData.append("photoUrl",form.photoUrl)
    formData.append("price",form.price)
    formData.append("publishing",form.publishing)
    formData.append("published",form.published.toString().split("(中国标准时间)")[0])
    formData.append("typeId",form.typeId)
    formData.append("menu",form.menu)
    formData.append("aveScore",form.aveScore)
    formData.append("saleNum",form.saleNum)
    return request({
        url: '/book/insert',
        method:'post',
        data:formData
    })    
}

export function _BookUpdate(form){
    let  formData = new FormData
    console.log(form.published)
    formData.append("isbn",form.isbn)
    formData.append("author",form.author)
    formData.append("authorIntro",form.authorIntro)
    formData.append("brand",form.brand)
    formData.append("description",form.description)
    formData.append("designed",form.designed)
    formData.append("name",form.name)
    formData.append("pages",form.pages)
    formData.append("photoUrl",form.ptotoUrl)
    formData.append("price",form.price)
    formData.append("publishing",form.publishing)
    formData.append("published",form.published.toString().split("(中国标准时间)")[0])
    formData.append("typeId",form.typeId)
    formData.append("menu",form.menu)
    formData.append("aveScore",form.aveScore)
    formData.append("saleNum",form.saleNum)
    return request({
        url: '/book/update',
        method:'post',
        data:formData
    })    
}

export function _BookDelete(id){
    return request({
        url: '/book/delete',
        method:'post',
        params:{
            id
        }
    })
}