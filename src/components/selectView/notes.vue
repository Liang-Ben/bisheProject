<template>
  <div class="notes">
        <div class="tips">
            <p @click="note(isbn)">写读书笔记<i class="iconfont icon-icon-test13 "></i></p>
        </div>
        <ul class="commentUl">
            <li v-for="item,index in notes" :key="item.id">
                <div class="top">
                    <img :src="item.avator" onerror="this.src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';this.onerror=null" alt="头像">
                    <p class="name">{{item.userName}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
                <div class="content" v-html="item.content">
                </div>
                <div class="agree" :class="{agreeShadow:notesShadow[index]}" @click="agree(index)">
                    <i class="iconfont icon-dianzan1"></i>
                    {{item.agree}}
                </div>
                <hr>
            </li>
        </ul>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="pages"
            @current-change="change">
        </el-pagination>

  </div>
</template>

<script>
import {_userMessage} from '../../network/user'
import {_selectByIsbn}from '../../network/notes'
import {Server} from '../../network/request'
export default {
name:'notes',
    data(){
        return{
            userId:'',
            pages:10,
            pageNum:1,
            pageSize:3,
            notes:'',
            notesShadow:'',
            dialogFormVisible:false,
            commentForm:{
                input:'',
                score:0,
            },
            value:0,
        }
    },
    methods:{
        change(index){
            this.pageNum = index
            this.select()
        },
        note(isbn){
            this.$router.push({path:"/note",query:{isbn}})
        },
        select(){
            _selectByIsbn(this.pageSize,this.pageNum,this.isbn).then(res=>{
                this.pages = res.data.data.pages*3
                this.notes = res.data.data.list
                this.notesShadow = new Array(this.notes.length).fill(false)
                console.log(this.notesShadow)
                this.notes.forEach(element => {
                    element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                    element.avator = Server+element.avator
                    element.avescore = element.score/2
                });
            })
        }
        
    },
    props:['isbn','name'],
    created(){
        this.select()
    }
}
</script>

<style lang="less" scoped>
// /deep/img{
//     max-width: 50vw;
// }
// /deep/blockquote{                         //引用的css样式
//     font-weight: 500;
//     color: #909399;
// }
// /deep/blockquote::before{
//     content: "\e683";
//     font-family: "iconfont" !important;
//     font-size: 16px;
//     font-style: normal;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// }
// /deep/blockquote::after{                           
//     content: "\e682";
//     font-family: "iconfont" !important;
//     font-size: 16px;
//     font-style: normal;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// }
.tips{
    margin-top: 3vw;
    color:#409EFF;
    width: 30vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -moz-user-select: none; /*mozilar*/
    -webkit-user-select: none; /*webkit*/
    -ms-user-select: none; /*IE*/
    user-select: none;
    p:nth-child(1){
        line-height: 2vw;
        width: 7vw;
        text-align: center;
        color: #C65E24;
        font-size: 1vw;
        background-color: rgba(198,94,36,0.15);
    }
    p:nth-child(2):hover{
        cursor: pointer;
    }
}
.commentUl{
    margin-top: 2vw;
    .top{
        display: flex;
        align-items: center;
    }
    img{
        height: 3vw;
        width: 3vw;
        border-radius: 1.5vw;
    }
    li{
        margin: 1vw 0;
        img{
            margin-right: 1vw;
        }
    }
    .name{
        font-size: 1vw;
        margin-right: 1vw;
    }
    .time{
        margin-left: 2vw;
        font-size: 0.5vw;
        margin-top: 0.1vw;
    }
    .content{
        margin-top: 1vw;
        margin-bottom: 1vw;
    }
    .agree{
        color: gray;
        -moz-user-select: none; /*mozilar*/
        -webkit-user-select: none; /*webkit*/
        -ms-user-select: none; /*IE*/
        user-select: none;
    }
}
.agreeShadow{
    color: #409EFF !important;
}
.input{
    height: 6vw;
}
</style>