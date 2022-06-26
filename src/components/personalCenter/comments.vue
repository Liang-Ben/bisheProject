<template>
  <div>
        <el-table
        :data="comments"
        style="width: 100%">
            <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left"  >
          <el-form-item label="评论内容:" >
            <span>{{ props.row.content }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column
        label="ISBN书号"
        width="180">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test8 "></i>
            <span style="margin-left: 3px">{{ scope.row.isbn }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="评分"
        width="80">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test55"></i>
            <span style="margin-left: 0">{{ scope.row.score }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="评论内容"
        width="180">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test2 "></i>
            <span style="margin-left: 0">{{ scope.row.content }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="评论时间"
        width="180">
        <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 0">{{ scope.row.time }}</span>
        </template>
        </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pages"
            @current-change="change">
        </el-pagination>

        <el-dialog :title="`评论`" :visible.sync="dialogFormVisible" :center="true" width="40vw">
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
</template>

<script>
import {_selectByUser,_DeleteComment,_UpdateComment} from '../../network/comment'
import {_userMessage} from '../../network/user'

export default {
    name:"comments",
    data(){
        return {
            size:0,
            id:'',
            userId:'',
            pages:10,
            pageNum:1,
            pageSize:10,
            comments:[],
            dialogFormVisible:false,
            commentForm:{
                input:'',
                score:0,
            },
        }
    },
    methods:{
        commentSub(){
            if(this.commentForm.input.trim()!=""){
                _userMessage().then(res=>{
                    if(res.data.code==403){
                        this.$message({
                            message: '您还未登录,无法评论',
                            type: 'warning'
                        });
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
                            _UpdateComment(this.id,this.commentForm.input,this.commentForm.score*2).then(res=>{
                                console.log(res.data)
                            }).then(()=>{
                                this.select()
                                this.$message({
                                    message: '修改评论成功',
                                    type: 'success'
                                });
                            this.dialogFormVisible = false
                        })
                            }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消评论提交'
                            });          
                                return 0
                            });
                    }else{
                        _UpdateComment(this.id,this.commentForm.input,this.commentForm.score*2).then(res=>{
                            console.log(res.data)
                        }).then(()=>{
                            this.select()
                            this.$message({
                                message: '修改评论成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                        })
                    }
                })
            }
        },

        handleEdit(id){
            this.dialogFormVisible = true
            this.id = id
        },
        handleDelete(row){
            console.log(row)
            _DeleteComment(row.id).then(res=>{
                if(this.size==1){
                    this.pageNum--
                }
                this.select()
            })
        },
        select(){
            _selectByUser(this.pageSize,this.pageNum,this.userId).then(res=>{
                this.pages = res.data.data.pages*10
                console.log(res.data)
                this.comments = res.data.data.list
                this.comments.forEach(element => {
                    element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                });
                this.size = res.data.data.size
            })
        },
        change(index){
            this.pageNum = index
            this.select()
        },
    },
    created(){
        _userMessage().then(res=>{
            console.log(res.data.data.id)
            this.userId = res.data.data.id 
            this.select()
        })
        
    },
}
</script>

<style lang="less" scoped>
/deep/.cell{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
/deep/.el-form--label-left .el-form-item__label{
    font-weight: 700;
    color: #99a9bf;
}
/deep/.el-textarea__inner{
    height: 8vw;
    }
/deep/.el-rate{
    margin-top: 0.8vw;
}
</style>