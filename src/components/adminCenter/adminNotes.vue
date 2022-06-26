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
        :data="notes"
        style="width: 100%">
            <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left"  >
          <el-form-item label="读书笔记内容:" >
            <br>
            <div class="content">
              <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);" v-html="props.row.content"></div>
            </div>
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
        label="发布时间"
        width="180">
        <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 0">{{ scope.row.time }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="是否公开"
        width="100">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test12 "></i>
            <el-tag type="success" v-if="scope.row.pub">公开</el-tag>
            <el-tag type="danger" v-if="!scope.row.pub">不公开</el-tag>
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
            :page-size='3'
            background
            layout="prev, pager, next"
            :total="pages"
            @current-change="change">
        </el-pagination>
    </div>
</template>

<script>
import {_selectAll,_DeleteNote,_selectByUser,_selectByIsbn} from '../../network/notes'
import {_userMessage} from '../../network/user'
export default {
    name:"adminNotes",
    data(){
        return {
            userId:'',
            pages:3,
            pageNum:1,
            pageSize:3,
            notes:[],
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
                _selectByIsbn(this.pageSize,this.pageNum,this.isbn).then(res=>{
                    this.pages = res.data.data.pages*3
                    this.notes = res.data.data.list
                    this.notes.forEach(element => {
                        element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                    });
                    this.size = res.data.data.size
                    this.pageNum = 1
                })
            }else{
                console.log("USER")
                _selectByUser(this.pageSize,this.pageNum,this.userId).then(res=>{
                    this.pages = res.data.data.pages*3
                    this.notes = res.data.data.list
                    this.notes.forEach(element => {
                        element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
                    });
                    this.size = res.data.data.size
                    this.pageNum = 1
                })
            }
        },
        handleDelete(row){
            console.log(row)
            _DeleteNote(row.id).then(res=>{
                if(this.size==1){
                    this.pageNum--
                }
                this.select()
            })
        },
        select(){
            _selectAll(this.pageSize,this.pageNum).then(res=>{
                this.pages = res.data.data.pages*3
                console.log(res.data)
                this.notes = res.data.data.list
                this.notes.forEach(element => {
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
.content{
  width: 50vw;
  display: flex;
  justify-content: center;
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