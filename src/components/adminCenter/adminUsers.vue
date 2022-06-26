<template>
    <div>   
        <div class="select">
            <span>请输入用户id:</span>
            <el-input
            placeholder="请输入内容"
            v-model="id"
            clearable>
            </el-input>
            <el-button @click="selectById" type="primary">查询</el-button>
        </div>
        <el-table
        :data="users"
        style="width: 100%">
        <el-table-column
        label="用户id"
        width="80">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test8 "></i>
            <span style="margin-left: 3px">{{ scope.row.id }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
            <i class="iconfont icon-icon-test36  "></i>
            <span style="margin-left: 0">{{ scope.row.userName }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
            <img :src="scope.row.avator" onerror="this.src='../../../static/pic/暂无.jpeg';" alt="">
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
            :page-size='10'
            background
            layout="prev, pager, next"
            :total="pages"
            @current-change="change">
        </el-pagination>
    </div>
</template>

<script>
import {_selectUsers,_selectUser} from '../../network/admin'
import {_userMessage,_userSelect,_userDelete} from '../../network/user'
import{Server} from '../../network/request'
export default {
    name:"adminUsers",
    data(){
        return {
            userId:'',
            pages:10,
            pageNum:1,
            pageSize:10,
            users:[],
            size:0,
            id:''
        }
    },
    methods:{
        selectById(){
            _selectUser(this.id).then(res=>{
                console.log(res)
                if(res.data.data.avator==null){
                    res.data.data.avator = '../../../static/pic/暂无.jpeg'
                }else{
                    res.data.data.avator = Server + res.data.data.avator
                }
                this.users = []
                this.users.push(res.data.data)
            })
        },
        handleDelete(row){
            console.log(row)
            _userDelete(row.id).then(res=>{
                if(this.size==1){
                    this.pageNum--
                }
                this.select()
            })
        },
        select(){
            _selectUsers(this.pageSize,this.pageNum).then(res=>{
                this.pages = res.data.data.pages*10
                this.users = res.data.data.list
                this.users.forEach(element => {
                    element.avator = Server+element.avator
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
img{
    height: 3vw;
    width: 3vw;
    border-radius: 1.5vw
}
/deep/.el-input{
    width: 20vw;
    margin: 0 2vw;
}
.select span{
    color:grey;
    font-weight:700;
}
.select{
    height: 4.2vw;
    display: flex;
    width: 50vw;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: 1vw;
    margin-bottom: 2vw;
}
</style>