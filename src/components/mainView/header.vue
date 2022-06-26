<template>
<div>
    <div class="select">
        <img src="static/pic/logo.png" alt="logo">
        <div>
            <el-input @change="selectTo" placeholder="请输入" v-model="input" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="选择查询方式" >
                <el-option label="ISBN号" value="1"></el-option>
                <el-option label="作者名" value="2"></el-option>
                <el-option label="书名"  value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="selectTo">查询</el-button>
            </el-input>
        </div>
    </div>
</div>
</template>

<script>
import {_selectCart} from '../../network/selectBook'
export default {
    name:'mainViewHeader',
    data(){
        return{
            input:'',
            select:'',
            message:true,
        }
    },
    methods:{
        selectPush(){
            this.$router.push({
                name:'xxx',
                params:{
                id:id
                }
            })
        },
        selectTo(){
            this.$store.commit('changeInput',this.input)
            this.$store.commit('changeSelectType',this.select)
            this.$store.commit('changeBookType','')
            this.$store.commit('changeTypeId','')
            this.$router.push({path:"/selectView"})
        }
    },
    created(){

    }
}
</script>

<style lang="less" scoped>

.select{
    margin-top: 2vw;
    margin-left: 12vw;
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

</style>