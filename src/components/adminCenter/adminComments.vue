<template>
  <div>
        <div class="select">
            <span>查询条件:</span>
            <el-input
            placeholder="请输入ISBN"
            v-model="isbn"
            :disabled="display1"
            clearable>
            </el-input>
            <el-input
            placeholder="请输入用户名"
            :disabled="display2"
            v-model="userId"
            clearable>
            </el-input>
            <el-button @click="selectBy" type="primary">查询</el-button>
            <el-button @click="selectFirst" type="primary">查询全部</el-button>
        </div>
        
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
        label="用户id"
        width="80">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test36  "></i>
            <span style="margin-left: 0">{{ scope.row.userId }}</span>
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

  </div>
</template>

<script>
import {_selectAll,_DeleteComment,_UpdateComment,_selectByUser,_selectComments} from '../../network/comment'
import {_userMessage} from '../../network/user'

export default {
    name:"adminComments",
    data(){
        return {
            id:'',
            userId:'',
            pages:10,
            pageNum:1,
            pageSize:10,
            comments:[],
            size:0,
            isbn:'',
            userId:'',
            display1:null,
            display2:null,
            type:0
        }
    },
    watch:{
        isbn(){
            if(this.isbn==''){
                this.display2=null
            }else{
                this.display2=true
            }
        },
        userId(){
            if(this.userId==''){
                this.display1=null
            }else{
                this.display1=true
            }
        }
    },
    methods:{
        selectBy(){
            this.type=1
            if(this.isbn!=''){
                console.log("ISBN")
                _selectComments(this.pageSize,this.pageNum,this.isbn).then(res=>{
                    console.log(res.data)
                    this.pages = res.data.data.pages*10
                    this.comments = res.data.data.list
                    this.comments.forEach(element => {
                        element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                    });
                    this.size = res.data.data.size
                    this.pageNum = 1
                })
            }else{
                console.log("USER")
                _selectByUser(this.pageSize,this.pageNum,this.userId).then(res=>{
                    this.pages = res.data.data.pages*10
                    this.comments = res.data.data.list
                    this.comments.forEach(element => {
                        element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                    });
                    this.size = res.data.data.size
                    this.pageNum = 1
                })
            }
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
            _selectAll(this.pageSize,this.pageNum).then(res=>{
                this.pages = res.data.data.pages*10
                console.log(res.data)
                this.comments = res.data.data.list
                this.comments.forEach(element => {
                    element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                });
                this.size = res.data.data.size
                this.pageNum = 1
            })
        },
        selectFirst(){
            this.index = 1
            this.type = 0
            this.select()
        },
        change(index){
            this.pageNum = index
            if(this.type==0){
                this.select()
            }else{
                this.selectBy()
            }
        },

    },
    created(){
            this.select()
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
/deep/.el-input{
    width: 20vw;
    margin:0 0.5vw;
}
.select span{
    color:grey;
    font-weight:700;
}
.select{
    height: 4.2vw;
    display: flex;
    width: 60vw;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: 1vw;
    margin-bottom: 2vw;
}
</style>