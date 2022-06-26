<template>
  <div>
        <div class="select">
            <span>请输入ISBN:</span>
            <el-input
            placeholder="请输入ISBN"
            v-model="isbn"
            clearable>
            </el-input>
            <el-button @click="selectById" type="primary">查询</el-button>
        </div>
    <el-table
            :data="books"
            style="width: 120%">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left"  >
            <el-form-item label="封面:" >
                <div>
                    <img class="image" :src="props.row.photoUrl" alt="">
                </div>
            </el-form-item>
            <div class="tips">
                <el-form-item label="类别名:" >
                        {{props.row.typeName}}
                </el-form-item>
                <el-form-item label="装订:" >
                        {{props.row.designed}}
                </el-form-item>            
                <el-form-item label="销量:" >
                        {{props.row.saleNum}}
                </el-form-item>
                <el-form-item label="平均分:" >
                        {{props.row.aveScore}}
                </el-form-item>
                <el-form-item label="提供商:" >
                        {{props.row.brand}}
                </el-form-item>
                <el-form-item label="出版社:" >
                        {{props.row.publishing}}
                </el-form-item>
                <el-form-item label="页数:" >
                        {{props.row.pages}}
                </el-form-item>
            </div>
            <el-form-item label="作者简介:" >
                    {{props.row.authorIntro}}
            </el-form-item>
            <el-form-item label="内容简介:" >
                    {{props.row.description}}
            </el-form-item>
            <el-form-item label="目录:" >
                    {{props.row.menu}}
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
            label="书名"
            width="180">
            <template slot-scope="scope">
                <i class="iconfont icon-icon-test8 "></i>
                <span style="margin-left: 3px">{{ scope.row.name }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="作者"
            width="180">
            <template slot-scope="scope">
                <i class="iconfont icon-icon-test36 "></i>
                <span>{{ scope.row.author }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="出版时间"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 0">{{ scope.row.published }}</span>
            </template>
            </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">更新</el-button>
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
import {_selectAll,_selectBook} from '../../network/selectBook'
import {Server} from '../../network/request'
import {_BookDelete} from '../../network/book'
export default {
    name:"adminBooks",
    data(){
        return{
            pages:10,
            pageNum:1,
            pageSize:10,
            books:[],
            size:0,
            isbn:null
        }
    },
    methods:{
        selectById(){
            _selectBook(this.isbn).then(res=>{
                res.data.data.photoUrl = Server + res.data.data.photoUrl
                res.data.data.published = res.data.data.published.split("T")[0]
                this.books = []
                this.books.push(res.data.data)
            })
        },
        select(){
            _selectAll(this.pageNum,this.pageSize).then(res=>{
                console.log(res.data)
                this.pages = res.data.data.pages*10
                res.data.data.list.forEach(element => {
                    element.photoUrl = Server+element.photoUrl
                    element.published = element.published.split('T')[0]
                });
                this.books = res.data.data.list
                this.size = res.data.data.size
            })
        },
        handleEdit(row){
            this.$router.push({
                name:'adminBook',
                params:{
                    update:true,
                    data:row
                }
            })
        },
        handleDelete(row){
            console.log(row.isbn)
            _BookDelete(row.isbn).then(res=>{
                this.$message({
                    type:'success',
                    message:"删除成功"
                    })
                if(this.size==1){
                    this.pageNum--
                }
                this.select()
            })
        },
        change(index){
            this.pageNum = index
            this.select()
        },
    },
    created(){
        this.select()
    }
}
</script>

<style lang="less" scoped>
/deep/.author{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.image{
    width: 12vw;
}
.tips{
    width: 60vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
}
/deep/label{
    font-weight: 700;
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