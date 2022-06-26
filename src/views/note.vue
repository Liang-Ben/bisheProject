<template>
  <div >
      <div v-show="!success">
            <div class="book" @click="bookDetail(isbn)">
                <img :src="book.photoUrl" :alt="book.name">
                <div class="text">
                        <p>
                            <el-rate
                            v-model="rate"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                            </el-rate>
                        </p>
                        <p class="name">{{book.name}}</p>
                        <p class="author">{{book.author}}</p>
                </div>
                </div>
                <div class="tool">
                    <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editor"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                    />
                    <Editor
                        style="height: 500px; overflow-y: hidden;"
                        v-model="html"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="onCreated"
                    />
                </div>
                <div  class="buttons">
                    <el-button v-if="!Id" type="primary" @click="submit">提交笔记</el-button>
                    <el-button v-if="Id" type="primary" @click="edit">修改笔记</el-button>
                    <el-button type="danger" @click="clear">清空笔记</el-button>
                    <el-checkbox v-model="pub" :true-label='1' :false-label="0">是否公开</el-checkbox>
                </div>
        </div>
        <div v-if="success" class="result">
            <el-result icon="success" title="提交成功" subTitle="选择下一步操作">
            <template slot="extra">
                <el-button v-if="!Id" type="primary" size="medium" @click="goOn">再写一篇</el-button>
                <el-button v-if="!Id" type="primary" size="medium" @click="returnTo">返回详情页</el-button>
                <el-button v-if="Id" type="primary" size="medium" @click="returnToPersonal">返回个人中心</el-button>
            </template>
            </el-result>
        </div>
  </div>
</template>

<script>
import {Server} from '../network/request'
import {_selectByIsbn} from '../network/selectBook'
import {_userMessage} from '../network/user'
import {_submitNote,_selectById,_UpdateNote} from '../network/notes'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    components:{Editor,Toolbar},
    name:'note',
    data(){
        return {
            book:'',
            rate:0,
            isbn:'',
            editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { },
            mode: 'default', // or 'simple',
            pub:0,
            success:false,
            Id:null
        }
    },
    methods:{
        edit(){
            if(this.html.trim()=='<p><br></p>'){
                this.$message({
                    message: '无有效输入,无法发表笔记',
                    type: 'warning'
                })              
                return 0     
            }
            _UpdateNote(this.Id,this.html,this.pub).then(res=>{
                console.log("更新为"+this.pub)
                if(res.data.code==200){
                    this.success = true
                }
            })
        },
        returnToPersonal(){
            this.$router.push({path:"/personalCenter/notes"})
        },
        returnTo(){
            let isbn = this.isbn
            this.$router.push({path:"/bookDetail",query:{isbn}})
        },
        goOn(){
            this.clear()
            this.success = !this.success
        },
        bookDetail(isbn){
           let routeUrl =  this.$router.resolve({path:"/bookDetail",query:{isbn}})
           window.open(routeUrl.href, '_blank');
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        clear(){
            this.editor.clear()
        },
        submit(){
            _userMessage().then(res=>{
                if(this.html.trim()=='<p><br></p>'){
                    this.$message({
                        message: '无有效输入,无法发表笔记',
                        type: 'warning'
                    })              
                    return 0     
                }
                if(res.data.code==403){
                    this.$message({
                        message: '您还未登录,无法发表笔记',
                        type: 'warning'
                    })
                }else{
                    _submitNote(res.data.data.id,this.isbn,this.html,this.pub).then(res=>{
                        if(res.data.code==200){
                            this.success = true
                        }
                    })
                }
            })
        }
    },
    created(){
        this.isbn = this.$route.query.isbn
        this.Id = this.$route.query.Id
        if(this.Id!=null){
            _selectById(this.Id).then(res=>{
                this.html = res.data.data.content
                this.pub = res.data.data.pub
            })
        }
        _selectByIsbn(this.isbn).then(res=>{
            res.data.photoUrl = Server + res.data.photoUrl
            this.rate= res.data.aveScore/2
            this.book = res.data
        }),
        this.editorConfig = {placeholder: '请输入内容...',MENU_CONF: {} }
        this.editorConfig.MENU_CONF['uploadImage'] = {
            server: `${Server}/note/image`,
            fieldName: 'file',
            onSuccess(file, res) {
                console.log(`${file.name} 上传成功`, res)
            },
            customInsert(res, insertFn) {
            // res 即服务端的返回结果
            res.data.url =Server+res.data.url
            // 从 res 中找到 url alt href ，然后插图图片
            insertFn(res.data.url)
            },
        }

    },
    mounted() {

    },
    watch:{
        pub:{
            immediate: true,
            handler(n,o){
                console.log(n,o)
            }
        }
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
.book{
    width: 50vw;
    margin: 0 auto;
    img{
        height: 6vw;
    }
    display: flex;
    background-color: rgb(245, 242, 242);
}
.book:hover{
    cursor: pointer;
}
.text{
    font-size: 1vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 3vw;
    color: #999;
}
.name{
    font-size: 0.9vw;
}
.author{
    font-size: 0.7vw;
}
/deep/.el-rate__item{
    width: 1vw;
}
/deep/.el-rate__icon{
    font-size: 0.5vw;
}
.tool{
    border: 1px solid black;
    width: 50vw;
    margin: 2vw auto;
}
.buttons{
    width: 50vw;
    margin: 2vw auto;
    .el-checkbox{
        margin-left: 3vw;
    }
}
.editor-content-view img {
  max-width: 15vw;
}
.result{
    margin-top: 8vw;
}
</style>