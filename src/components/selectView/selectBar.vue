<template>
<div>
    <div class="select">
        <img src="static/pic/logo.png" alt="logo">
        <div>
            <el-input @change="selectInput()" placeholder="请输入" v-model="input" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="选择查询方式">
                <el-option label="ISBN号" value="1"></el-option>
                <el-option label="作者名" value="2"></el-option>
                <el-option label="书名"  value="3"></el-option>
                </el-select>
                <el-button @click="selectInput()" slot="append" icon="el-icon-search">查询</el-button>
            </el-input>
        </div>
    </div>
    <h3 v-if="typeName">{{typeName}}类查询结果:</h3>
    <ul class="list" v-if="success">
        <li v-for="item in booklist" :key="item.isbn">
            <img :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
            <div class="bookInfo">
                <p class="name" @click="bookDetail(item.isbn)">{{item.name}}</p>
                <el-rate
                        :value="item.aveScore1"
                        :max=5
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                </el-rate>
                <p class="author">{{item.author}}</p>
                <p class="isbn">ISBN:{{item.isbn}}</p>
            </div>
        </li>
    </ul>
    <div v-if="!success">
        <el-empty description="没有查询结果,请重新查询！"></el-empty>
    </div>
</div>
</template>

<script>
import {_selectByIsbn,_selectByAuthor,_selectByName,_selectBookType} from '../../network/selectBook'
import {Server} from '../../network/request'
export default {
    name:'selectBar',
    data(){
        return{
            input:'',
            select:'',
            message:true,
            booklist:'',
            success:false,
            typeName:'',
            typeId:'',
        }
    },
    watch:{
    },
    methods:{
        selectBookType(){
            _selectBookType(this.typeId).then(res=>{
                console.log(res.data)
                res.data.forEach(element => {
                    element.photoUrl = Server+element.photoUrl
                    element.aveScore1 = element.aveScore/2
                })
                this.booklist = res.data
                this.success = true
                this.$message({
                        message:`查询${this.typeName}类书籍`,
                        type: 'success',
                        duration:900,
                    })
            })
        },
        bookDetail(isbn){
           let routeUrl =  this.$router.resolve({path:"/bookDetail",query:{isbn}})
           window.open(routeUrl.href, '_blank');
        },
        selectInput(){
            if(this.input!=""){
                if(this.select=="1"){
                    _selectByIsbn(this.input).then(res=>{
                        if(res.data==null){
                            this.success=false}
                            else{
                                let book = []
                                res.data.photoUrl = Server+res.data.photoUrl
                                res.data.aveScore1 = res.data.aveScore/2
                                book.push(res.data)
                                this.booklist = book
                                this.typeName=''
                                this.success = true
                            }
                    })
                }else if(this.select=="2"){
                    _selectByAuthor(this.input).then(res=>{
                        // console.log(res.data)
                        this.setData(res.data)
                    })
                }else if(this.select=='3'){
                    _selectByName(this.input).then(res=>{
                        // console.log(res.data)
                        this.setData(res.data)
                    })
                }else{
                    if(this.message==true){
                        this.message=false
                        this.$message({
                            message:'请选择查询方式!',
                            type: 'warning',
                            duration:900,
                            onClose:()=>{/*console.log(this);*/this.message=true}//用function肯定不行，因为this是弹出框本身，而回调执行时，this已经销毁了，为undefined，而且也改不了message，除非把that=this传进来
                        })
                    }
                }
            }else{
                    if(this.message==true){
                    this.message=false
                    this.$message({
                        message:'输入为空!',
                        type: 'error',
                        duration:900,
                        onClose:()=>{/*console.log(this);*/this.message=true}//用function肯定不行，因为this是弹出框本身，而回调执行时，this已经销毁了，为undefined，而且也改不了message，除非把that=this传进来
                    })
                }
            }
        },
        setData(res){
            // console.log(res)
            if(res==[]||res==null||res==''){
                this.success = false
            }else{
                this.success = true
                res.forEach(element => {
                    element.photoUrl = Server+element.photoUrl
                    element.aveScore1 = element.aveScore/2
                })
                this.typeName=''
                this.booklist = res
            }
        }
    },
    mounted(){
        this.input = this.$store.state.input
        this.select = this.$store.state.selectType
        this.typeName = this.$store.state.type
        this.typeId = this.$store.state.typeId
        if(this.typeName!=''&&this.typeId!=''){
            this.selectBookType()
        }else{
            this.selectInput()
        }
    }
}
</script>

<style lang="less" scoped>

.select{
    margin-top: 2vw;
    margin-left: 2vw;
    display: flex;
    justify-content: start;
    align-items: center;
}
.select img{
    width: 10vw;
    margin-right: 2vw;
}
.select h1{
    margin-right: 20px;
}
   .el-input{
       width: 50vw;
    }
   .el-select{
    width: 9vw;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.list{
    margin-left: 5vw;
    li img{
        width: 10vw;
        height: 15vw;
        transition: .3s;
    }
    li img:hover{
        cursor: pointer;
        transform: scale(1.1,1.1);
    }
    li{
        margin:2.5vw 0;
        display: flex;
        width: 40vw;
    }
    div p{
        margin-bottom: 2vw;
    }
}
.bookInfo{
    margin-top: 1.3vw;
    margin-left: 1.5vw;
}
.author{
    font-size: 1.2vw;
    margin-top: 1.5vw;
}
.name{
    color: #37a;
    font-weight: 700;
}
.name:hover{
    cursor: pointer;
    color: brown;
}
.isbn{
    font-size: 1.2vw;
}
h3{
    margin: 3vw 3vw;
}
</style>