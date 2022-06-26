<template>
  <div >
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      :router='true'>
      <el-menu-item index="/personalCenter/userData">
        <i class="el-icon-user"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/personalCenter/comments">
        <i class="el-icon-coordinate"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/personalCenter/notes" >
        <i class="el-icon-document"></i>
        <span slot="title">读书笔记</span>
      </el-menu-item>
      <el-menu-item index="/personalCenter/collect">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
      <el-menu-item index="/personalCenter/recommend">
        <i class="el-icon-goods"></i>
        <span slot="title">图书推荐</span>
      </el-menu-item>
    </el-menu>
    <div class="center">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
    
  </div>
</template>

<script>
import{_userMessage} from '../network/user'
export default {
    name:"personalCenter",
    data(){
        return{
            user:'',

        }   
    },
    methods:{

    },

}
</script>

<style>
.center{
    width: 60vw;
    padding-top: 5vw;
    margin: 0 auto;
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
</style>