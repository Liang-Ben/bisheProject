<template>
    <div>
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
          type="primary"
          @click="note(scope.row.isbn,scope.row.id)">编辑</el-button>
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
        </el-pagination></div>
</template>

<script>
import {_selectByUser,_DeleteNote} from '../../network/notes'
import {_userMessage} from '../../network/user'
export default {
    name:"notes",
    data(){
        return {
            size:0,
            userId:'',
            pages:3,
            pageNum:1,
            pageSize:3,
            notes:[],
        }
    },
    methods:{
        note(isbn,Id){
            this.$router.push({path:"/note",query:{isbn,Id}})
        },
        handleEdit(row){
            console.log(row)
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
            _selectByUser(this.pageSize,this.pageNum,this.userId).then(res=>{
                this.pages = res.data.data.pages*3
                console.log(res.data)
                this.notes = res.data.data.list
                this.notes.forEach(element => {
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
            console.log("用户id为"+res.data.data.id)
            this.userId = res.data.data.id 
            this.select()
        })
        
    },
}
</script>

<style lang="less" scoped>
.content{
  width: 50vw;
  display: flex;
  justify-content: center;
}
</style>