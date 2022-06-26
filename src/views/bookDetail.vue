<template>
<div class="out">
  
  <div  class="detail" :class="{'middle':recommend}" >
      <h2>{{book.name}}</h2>
      <div class="book">
        <img :src="book.photoUrl" alt="封面图片">
        <div class="message">
            <p>作者:{{book.author}}</p>
            <p>出版社:{{book.publishing}}</p>
            <p>出版时间:{{book.published}}</p>
            <p v-if="book.typeId==17">字数:{{book.pages}}字</p>
            <p v-if="book.typeId!=17">页数:{{book.pages}}页</p>
            <p>定价:{{book.price}}￥</p>
            <p>装帧:{{book.designed}}</p>
            <p>ISBN:{{book.isbn}}</p>
            <p>类别:{{book.typeName}}</p>
            <p>已知销量:{{book.saleNum}}</p>
            <el-button type="primary" size="small" @click="collect">收藏</el-button>
        </div>
      </div>
      <el-collapse class="list" v-model="activeNames" >
        <el-collapse-item  name="1">
            <template class="title" slot="title">
            作者简介<i class="iconfont icon-icon-test34 "></i><span>点击展开/回收</span>
            </template>
            <div v-html="book.authorIntro"></div>
        </el-collapse-item>
        <el-collapse-item  name="2">
            <template class="title" slot="title">
            内容简介<i class="iconfont icon-icon-test32 "></i><span>点击展开/回收</span>
            </template>
            <div v-html="book.description"></div>
        </el-collapse-item>
        <el-collapse-item  name="3">
            <template class="title" slot="title">
            目录<i class="iconfont icon-icon-test38  "></i><span>点击展开/回收</span>
            </template>
            <div v-html="book.menu"></div>
        </el-collapse-item>
        <el-collapse-item name="4">
            <template class="title" slot="title">
            评论区<i class="iconfont icon-icon-test38  "></i><span>点击展开/回收</span>
            </template>
            <comments :isbn="isbn"  :name="book.name"></comments>  
        </el-collapse-item>
        <el-collapse-item name="5">
            <template class="title" slot="title">
            读书笔记<i class="iconfont icon-icon-test38  "></i><span>点击展开/回收</span>
            </template>
            <notes :isbn="isbn"></notes>
        </el-collapse-item>
      </el-collapse>
  </div>

    <el-dialog :title="`收藏《${book.name}》`"  :visible.sync="dialogFormVisible" :center="true" width="40vw">
        <el-form class="form" >
        <el-form-item label="偏好程度:" class="rate" >
            <el-rate
            v-model="rate"
            show-text
            allow-half>
            </el-rate>
        </el-form-item>
        </el-form>
        <span>以上打分会影响对您的书籍推荐</span>
        <div slot="footer" class="dialog-footer">
        <button  class="button" @click="collectSubmit">确认</button>
        </div>
    </el-dialog>

  <div class="right" v-if="recommend">
    <h4 class="title">喜欢读"{{book.name}}"的人也喜欢:</h4>
    <ul>
        <li class="recommend" v-for="item in recommend" :key="item.isbn">
            <div>
                <img :src="item.photoUrl" @click="bookDetail(item.isbn)" class="imgHover" alt="">
                <el-rate
                    :value="item.aveScore"
                    :max=5
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
                <div class="name" @click="bookDetail(item.isbn)">{{item.name}}</div>
                <div class="author">{{item.author}}</div>
            </div>
        </li>
    </ul> 
  </div>
</div>


</template>

<script>
import {_selectBook} from '../network/selectBook'
import {Server} from '../network/request'
import {_userMessage} from '../network/user'
import {_Insert} from '../network/collect'
import {_RecommendByItem} from '../network/recommend'
import comments from '../components/selectView/comments.vue'
import notes from '../components/selectView/notes.vue'
export default {
    name:'bookDetail',
    components:{comments,notes},
    data(){
        return{
            book:'',
            isbn:'',
            activeNames:['1','2','3','4','5'],
            dialogFormVisible:false,
            rate:0,
            id:'',
            recommend:null
        }
    },
    methods:{
        bookDetail(isbn){
           this.$router.push({path:"/bookDetail",query:{isbn}})
           this.$router.go(0)
        },
        collect(){
            _userMessage().then(res=>{
                if(res.data.code==403){
                    this.$message({
                        message: '请先登录！',
                        type: 'warning'
                    })                      
                }else if(res.data.code==200){
                    this.dialogFormVisible=true
                    this.id = res.data.data.id
                }
            })
        },
        collectSubmit(){
            if(this.rate==0){
                this.$confirm('偏好为0, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '确认!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消收藏提交'
                    });          
                        return 0
                    });
            }
            _Insert(this.id,this.isbn,this.rate*2).then(res=>{
                if(res.data.code==200){
                    this.$message({
                        type: 'success',
                        message: '收藏成功!'
                    })
                    this.dialogFormVisible=false
                }else{
                    if(res.data.code==403){
                        this.$message({
                            type: 'warning',
                            message: '不可重复收藏!'
                        })
                    }
                }
            })
        }
    },
    created(){
        this.isbn = this.$route.query.isbn
        _selectBook(this.$route.query.isbn).then(res=>{
            res.data.data.authorIntro = '&nbsp&nbsp&nbsp&nbsp'+ res.data.data.authorIntro
            res.data.data.photoUrl = Server + res.data.data.photoUrl
            res.data.data.published = res.data.data.published.split('T')[0]
            this.book = res.data.data
        })
        _userMessage().then(res=>{
            if(res.data.code==200){
                _RecommendByItem(res.data.data.id,this.isbn,10).then(res=>{
                    if(res.data.length==0){
                        return 0
                    }
                    res.data.forEach(element => {
                        element.photoUrl = Server +element.photoUrl
                        element.aveScore/=2
                    });
                    this.recommend = res.data
                })
            }
        })
    }
}
</script>

<style lang="less" scoped>

.out{
    display: flex;
}
.detail{
    overflow: hidden;
    margin-left: 20vw;
    width: 60vw;
    transition: 1s;
}
.middle{
    transform: translate(-10vw);
}
h2{
    margin-top: 3vw;
    margin-bottom: 2vw;
}
.book{
    display: flex;
    align-items: flex-start;
    margin-top: 3vw;

    img{
        width: 14vw;
    }
    .message{
        margin-left: 2vw;
        width: 40vw;
        height: 22vw;
        display: inline-block;
        font-size: 1vw;
        line-height: 2vw;
    }
}
.list{
    div{
        font-size: 1.2vw;
        margin-top: 2vw;
    }
    span{
        margin-left: 2vw;
        margin-top: 0.8vw;
        font-size: 0.6vw;
    }
}
/deep/.el-collapse-item__header{
    color: #409EFF;
    font-size: 1.5vw;
    i{
        font-size: 2vw;
        margin-top: 0.2vw;
    }
}
/deep/.el-rate{
    margin-top: 1.1vw;
}
.button:hover{
    cursor: pointer;
}
.right{
    width: 20vw;
    margin-right: 4vw;
    margin-top: 9vw;
    animation: walkIn 1s;
}
.imgHover{
 transition: 0.5s;   
}
.imgHover:hover{
    transform: scale(1.1);
    cursor: pointer;
}
.title{
    margin-bottom: 2vw;
}
.recommend{
    margin-bottom: 2vw;
    img{
        width: 8vw;
    }
}

@keyframes walkIn {
    0%{
        transform: translate(-10vw);
    }
    100%{
        transform: translate(0);
    }
}
.name{
    font-size: 1vw;
    margin-bottom: 0.2vw;
    transition: 0.5s;
}
.name:hover{
    transform: scale(1.1,1.1);
    transform-origin: right-center;
    color: brown;
    cursor: pointer;
}
.author{
    font-size: 0.9vw;
}
</style>