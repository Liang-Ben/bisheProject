<template>
  <div id="app" >
    <div v-show="!admin">
      <el-menu  class="el-menu-app" mode="horizontal" :router='true'>
        <el-menu-item  index="/">回到主页</el-menu-item>
        <el-menu-item   index="/chat">聊天室</el-menu-item>
        <el-menu-item  v-if="user" index="/personalCenter/recommend">猜你喜欢</el-menu-item>
        <el-menu-item  v-if="user" index="/personalCenter">欢迎您,{{user.userName}}</el-menu-item>
        <el-menu-item  v-if="!user" @click="dialogFormVisible = true">登录</el-menu-item>
        <el-menu-item v-if="!user" index="/register">注册</el-menu-item>
        <el-menu-item v-if="user" @click="logOut">退出</el-menu-item>
      </el-menu>
    </div>


    <transition name="slide-fade">
      <router-view/>
    </transition>



    <el-dialog  title="平台登录" :visible.sync="dialogFormVisible" :center="true" width="40vw">
        <el-form class="form" :model="form">
          <el-form-item label="ID:"  :label-width="formLabelWidth">
            <el-input v-model="form.id" maxlength="10" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth" >
            <el-input v-model="form.passWord" maxlength="16" autocomplete="off" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button  class="button" @click="userLogin(form.id,form.passWord)">登录</button>
        </div>
        <div slot="footer" ><span class="reset" @click="reset">忘记密码</span></div>
</el-dialog>
  </div>
</template>

<script>
import mainViewHeader from"./components/mainView/header.vue"
import mainView from './views/mainView.vue'
import {_userLogin,_userMessage} from './network/user'
export default {
  name: 'App',
  components: { mainView,mainViewHeader },
  data(){
    return{
        dialogFormVisible: false,
        form: {
          id: '',
          passWord: '',
        },
        formLabelWidth: '8vw',
        user:'',
        token:localStorage.getItem("token"),
        admin:false
      }
  },
  watch:{
    '$store.state.admin'(){
      this.admin = this.$store.state.admin
    }
  },
  methods:{
    reset(){
      if(this.form.id==''){
        this.$message({
          message:'请先填写id!',
          type:'warning',
          duration:2000
        })
      }else{
        let id = this.form.id
        this.$router.push({path:'/resetPassword',query:{id}})
        this.dialogFormVisible=false
      }
    },
    logOut(){
      this.user=''
      localStorage.removeItem("token");
      this.token = null
      this.$router.push({path:'/'})
    },
    userLogin(id,passWord){
      _userLogin(id,passWord).then(res=>{
        if(res.data.data==null&&res.data.code==403){
            this.$message({
              message:'id不存在!',
              type: 'warning',
              duration:2000,
          })
        }else if(res.data.data==null&&res.data.code==200){
                      this.$message({
              message:'密码错误!',
              type: 'warning',
              duration:2000,
          })
        }else{
          this.user = res.data.data.user
          // console.log(this.user)
          this.token = res.data.data.token
          localStorage.setItem("token",res.data.data.token)
          // console.log(localStorage.getItem("token"))
          this.dialogFormVisible=false
        }
      })
    }
  },
  created(){
    if(localStorage.getItem("token")){
        _userMessage().then(res=>{
          this.user = res.data.data
          // console.log(res.data.data)
        })
    }
    this.admin = this.$store.state.admin
  }
}
</script>

<style lang="less" >
*{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
a{
    text-decoration: none;
  }
.el-menu-item{
    height: 40px !important;
    line-height: 40px !important;
  }
.el-menu-app{
  display: flex;
  justify-content: end;
}
.button{
    margin-bottom: 1vw;
    margin-top: 0vw;;
    margin-left: 1.5vw;
    width: 22vw;
    height: 2.5vw;
    transition: 0.3s;
    font-size: 16px;
    color: #fff;
    border-radius: 0.2vw;
    background-color: #409EFF;
    border: none;
}
.form{
  width: 30vw;
}
img{
    max-width: 50vw;
}
blockquote{                         //引用的css样式
    font-weight: 500;
    color: #909399;
}
blockquote::before{
    content: "\e683";
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
blockquote::after{                           
    content: "\e682";
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.slide-fade{
  width: 100%;
  background-color: white;
}
.slide-fade-enter, .slide-fade-leave-to
{
  position: absolute;
  transform:translateX(-10%)  ;
  opacity:0;
}

.slide-fade-enter-active {
  background-color: white;
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s ease;
  background-color: white;
  transform:translateX(10%)   ;
  z-index: 100;
}
.reset{
  margin-left: 19vw;
  border-bottom: 1px solid black;
}
.reset:hover{
  color: #409EFF;
  border-bottom: 1px solid #409EFF;
  cursor: pointer;
}
</style>
