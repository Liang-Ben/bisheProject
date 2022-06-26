<template>
  <div>
    <el-menu  mode="horizontal" >
  <el-menu-item v-if="userName" index="1">欢迎管理员:{{userName}}</el-menu-item>
    </el-menu>
    <el-menu
    default-active="1"
    class="el-menu-vertical"
    :router='true'>
    <el-menu-item index="/adminCenter/adminData">
        <i class="el-icon-menu"></i>
        <span slot="title">账号信息</span>
    </el-menu-item>
    <el-menu-item index="/adminCenter/adminUsers">
        <i class="el-icon-user "></i>
        <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/adminCenter/adminBook">
        <i class="iconfont icon-icon-test13 "></i>
        <span slot="title">图书编辑</span>
    </el-menu-item>
    <el-menu-item index="/adminCenter/adminBooks">
        <i class="iconfont icon-icon-test8"></i>
        <span slot="title">图书信息</span>
    </el-menu-item>
    <el-menu-item index="/adminCenter/adminComments">
        <i class="el-icon-tickets"></i>
        <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/adminCenter/adminNotes" >
        <i class="el-icon-document"></i>
        <span slot="title">读书笔记</span>
    </el-menu-item>

    </el-menu>
    <div class="center">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import{_message} from '../network/admin'
export default {
    name:"adminCenter",
    data(){
        return{
            userName:'',
        }
    },
    methods:{
        changeAd(){
            this.$store.commit('changeAdmin',false)
            console.log("admin改为false")
        }
    },
    created(){
        _message().then(res=>{
            console.log(res.data)
            this.userName = res.data.data.userName
        })
    },
    beforeRouteEnter(to,from,next){
        console.log(this)
        next(vm=>{
            vm.$store.commit('changeAdmin',true)
            console.log("admin改为true")
        })
        console.log("触发了前置")
    },
    beforeRouteLeave(to,from,next){
        this.changeAd()
        console.log("触发了后置")
        next()
    }
}
</script>

<style lang="less" scoped>
.center{
    width: 70vw;
    padding-top: 2vw;
    margin: 0 0 0 20vw;
}
.el-menu-vertical{
    position: absolute;
    left: 0;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    width: 10vw;
    height: 20vw;
    margin-top: 2vw;
}
i{
    font-size: 20px;
    margin-right: 8px;
}
</style>