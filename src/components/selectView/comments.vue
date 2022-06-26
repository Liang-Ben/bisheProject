<template>
  <div class="comments">
      <div class="back"></div>
        <div>
            <el-dialog  :append-to-body="true" :title="`评论${name}`" :visible.sync="dialogFormVisible" :center="true" width="40vw">
            <el-form class="form" >
            <el-form-item label="评分:" class="rate" >
                <el-rate
                v-model="commentForm.score"
                show-text
                allow-half>
                </el-rate>
            </el-form-item>
            <el-form-item label="我的评论:"  >
                <el-input class="input" type="textarea" v-model="commentForm.input"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <button  class="button" @click="commentSub">提交评论</button>
            </div>
            </el-dialog>
        </div>
        <div class="tips">
            <p @click="comment">我来说两句<i class="iconfont icon-icon-test13 "></i></p>
        </div>
        <ul class="commentUl">
            <li v-for="item,index in comments" :key="item.id">
                <div class="top">
                    <img :src="item.avator" onerror="this.src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';this.onerror=null" alt="头像">
                    <p class="name">{{item.userName}}</p>
                    <el-rate
                        v-model="item.avescore"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    <p class="time">{{item.time}}</p>
                </div>
                <div class="content">
                    {{item.content}}
                </div>
                <div class="agree" :class="{agreeShadow:commentsShadow[index]}" @click="agree(index)">
                    <i class="iconfont icon-dianzan1"  ></i>
                    {{item.agree}}
                </div>
                <hr>
            </li>
        </ul>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pages"
            @current-change="change">
        </el-pagination>

  </div>
</template>

<script>
import {_userMessage} from '../../network/user'
import {_InsertComment,_selectComments}from '../../network/comment'
import {Server} from '../../network/request'
export default {
name:'comments',
    data(){
        return{
            userId:'',
            pages:1000,
            pageNum:1,
            pageSize:10,
            comments:'',
            commentsShadow:'',
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
        select(){
            _selectComments(this.pageSize,this.pageNum,this.isbn).then(res=>{
                this.pages = res.data.data.pages*10
                this.comments = res.data.data.list
                this.commentsShadow = new Array(this.comments.length).fill(false)
                console.log(this.commentsShadow)
                this.comments.forEach(element => {
                    element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                    element.avator = Server+element.avator
                    element.avescore = element.score/2
                });
            })
        },
        agree(index){
            if(this.commentsShadow[index]==false){
                this.comments[index].agree++
            }else{
                this.comments[index].agree--
            }
            this.$set(this.commentsShadow,index,!this.commentsShadow[index])

        },
        comment(){
            this.dialogFormVisible = true
        },
        commentSub(){
            if(this.commentForm.input.trim()!=""){
                _userMessage().then(res=>{
                    if(res.data.code==403){
                        this.$message({
                            message: '您还未登录,无法评论',
                            type: 'warning'
                        });
                        _InsertComment(res.data.data.id,this.isbn,this.commentForm.input,this.commentForm.score*2).then(res=>{
                            console.log(res.data)
                        }).then(()=>{
                            this.select()
                            this.$message({
                                message: '添加评论成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                        })
                        return 0
                    }
                    if(this.commentForm.score==0){
                        this.$confirm('评分为0, 是否继续?', '提示', {
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
                                message: '已取消评论提交'
                            });          
                                return 0
                            });
                    }else{
                        _InsertComment(res.data.data.id,this.isbn,this.commentForm.input,this.commentForm.score*2).then(res=>{
                            console.log(res.data)
                        }).then(()=>{
                            this.select()
                            this.$message({
                                message: '添加评论成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                        })
                    }
                })
            }
        }
    },
    props:['isbn','name'],
    created(){
        this.select()
    }
}
</script>

<style lang="less" scoped>

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
        border-radius: 1.5vw
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
        font-size: 0.7vw;
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
/deep/.el-textarea__inner{
    height: 8vw;
}
/deep/.el-dialog__body{
    padding: 0;
    margin-left: 4vw;
}
/deep/.el-dialog__footer{
    margin-top: 4vw;
    height: 5vw;
}
/deep/.el-rate{
    margin-top: 0.3vw;
}
.rate{
    display: flex;
    align-items: center;
}
.button:hover{
    cursor: pointer;
}
</style>