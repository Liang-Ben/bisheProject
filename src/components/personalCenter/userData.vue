<template>
<div>
  <h3>基本信息</h3>
  <div class="userData">
    <div class="data">
      <img v-if="user.avator" :src="user.avator" class="avator" alt="avator">
      <h5>用户名:{{user.userName}}</h5>
      <h5 v-if="user.sex">性别:{{user.sex}}</h5>
      <h5 v-if="user.email">电子邮箱:{{user.email}}</h5>
    </div>
    <div class="form">
        <h3 class="title">修改信息</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input  :disabled="!disable[0]" maxlength="20" placeholder="20字符以内" v-model.number="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input :disabled="!disable[1]" type="password" maxlength="16" placeholder='密码为8-16位字母、数字' v-model="ruleForm.passWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input :disabled="!disable[1]" type="password" maxlength="16" placeholder='重复密码一次' v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group :disabled="!disable[2]" v-model="ruleForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input :disabled="!disable[3]"  placeholder='电子邮箱' v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="upload">
            <input id="set" :disabled="!disable[4]" clearable type="file" name="file" ref="file" hidden='' @change="changeFile($event)">
            <p class="image"  @click="selectImg()" >
                <el-empty v-if="disable[4]" class="empty" description="点击上传头像(仅一张)"  :image="ruleForm.src" :image-size="120"></el-empty>
                <el-empty v-if="!disable[4]" class="empty2" description="当前已禁用"  :image="ruleForm.src" :image-size="120"></el-empty>
            </p>
            </el-form-item>
            <el-form-item>
                <button  class="button" type="button" @click="submitForm">确认修改</button>
                <span class="reset" @click="resetForm('ruleForm')">表单重置</span>
            </el-form-item>
        </el-form>
    </div>
    <el-checkbox-group class="checkGroup" v-model="type" @change="disableChange">
      <el-checkbox label="0" name="type">用户名</el-checkbox>
      <el-checkbox label="1" name="type">密码</el-checkbox>
      <el-checkbox class="check2" label="2" name="type">性别</el-checkbox>
      <el-checkbox label="3" name="type">电子邮箱</el-checkbox>
      <el-checkbox class="check4" label="4" name="type">头像</el-checkbox>
    </el-checkbox-group>
  </div>
  </div>
</template>

<script>

import{_userUpdata,_userMessage,_userSelect} from '../../network/user'
import {Server} from '../../network/request'
export default {
    name:"userData",
    data(){
            var checkName = (rule, value, callback) => {
                setTimeout(() => {
                if (value.length>=20) {
                    callback(new Error('请输入20字符以内的用户名'));
                }else {
                    callback();
                }
                }, 100);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!this.pattern.test(value)){
                    callback(new Error('密码为8-16位字母、数字'))
                } 
                else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.passWord) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            var validateEmail = (rule, value, callback)=>{
                if(value === ''){
                    callback(new Error("请输入电子邮箱"))
                }else if(!this.emailPattern.test(value)){
                    callback(new Error("电子邮箱格式不正确"))
                }else{
                    callback()
                }
            }
        return{
            disable:[false,false,false,false,false],
            type:[],
            imageUrl:'',
            user:'',
            pattern:  /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$/,
            emailPattern: /^[A-Za-z0-9\-_]+[A-Za-z0-9\.\-_]*[A-Za-z0-9\-_]+@[A-Za-z0-9]+[A-Za-z0-9\.\-_]*(\.[A-Za-z0-9\.\-_]+)*[A-Za-z0-9]+\.[A-Za-z0-9]+[A-Za-z0-9\.\-_]*[A-Za-z0-9]+$/,
            ruleForm: {
                id:'',
                passWord: '',
                checkPass: '',
                userName: '',
                file: null,
                src:'',
                sex:'',
                email:'',
            },
            result:{
                code:'',
                data:''
            },
            rules: {
                passWord: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                userName: [
                    { validator: checkName, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur'}
                ]
            }
        }
    },
    // watch:{
    //     type(){
    //         console.log(this.type)
    //     }
    // },
    methods:{
      selectImg:function(){
        document.getElementById('set').click()
      },
      changeFile(e){
        let _this = this
        this.ruleForm.file = e.target.files[0]
        if (!e || !window.FileReader) return  // 判断是否支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(this.ruleForm.file) // 文件转换
        reader.onloadend = function () {
            _this.ruleForm.src = this.result
      }
    },
      submitForm() {
            console.log(this.ruleForm)
            _userUpdata(this.ruleForm).then((res)=>{
                console.log(res.data)
                if(res.data.code==403){
                    this.$message({
                        message:'用户名重复，修改失败!',
                        type: 'warning',
                        duration:2000,
                    })
                }else if(res.data.code==4032){
                    this.$message({
                        message:'表单为空，拒绝更新!',
                        type: 'error',
                        duration:2000,
                    })
                }else{
                    this.$message({
                        message:'修改成功,新的信息将在下次登录时生效!',
                        type: 'success',
                        duration:2000,
                    })
                }
                _userSelect(this.ruleForm.id).then(res=>{
                    res.data.data.avator = Server+res.data.data.avator
                        this.user = res.data.data
                        this.ruleForm.id = res.data.data.id
                        console.log(res.data.data)
                    })
            })
      },
      resetForm(formName) {
        this.ruleForm.src = ''
        this.$refs[formName].resetFields();
      },
      disableChange(){
          let value = this.type
          let _this = this
          for(var i in this.disable){
              this.$set(this.disable,i,false)
          }
          value.forEach(function(value){
              _this.$set(_this.disable,value,true)
          })
      },
    },

    created(){
        _userMessage().then(res=>{
            if(res.data.data.avator!=null){
                res.data.data.avator = Server+res.data.data.avator
            }
            this.user = res.data.data
            this.ruleForm.id = res.data.data.id
            console.log(res.data.data)
        })
    }
}
</script>

<style lang="less" scoped>
.avator{
    width: 4.5vw;
    height: 4.5vw;
    border-radius: 4.5vw;
    margin-bottom: 2vw;
}
.userData{
    margin-top: 3vw;
    display: flex;
    justify-content: space-between;
}
.data{
    width: 30vw;
    margin-top: 2vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: start;
    h5{
        margin: 1vw 0;
    }
}
.title{
    margin-left: 6.5vw;
    margin-top: -4.7vw;
    margin-bottom: 5vw;
}
.form{
    width: 30vw;
}
/deep/.avatar-uploader .el-upload {
border: 1px dashed #d9d9d9 ;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
/deep/.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
}
/deep/.avatar {
width: 178px;
height: 178px;
display: block;
}
.empty{
    padding: 0;
}
.empty2{
    padding: 0;
}
.empty:hover{
    cursor: pointer;
}
.reset{
    float: right;
    line-height: 24px;
}
.reset:hover{
    cursor: pointer;
    color: #409EFF;
    border-bottom: 1px solid #409EFF;
}
.button{
    display: block;
    position: relative;
    right: 1.5vw;
    width: 23.5vw;
    height: 2.6vw;
    transition: 0.3s;
    font-size: 16px;
    color: #fff;
    border-radius: 0.2vw;
    background-color: #409EFF;
    border: none;
}
.button:hover{
    background-color: #b3d8ff;
    cursor: pointer;
}
.checkGroup{
    margin-top: 1vw;
    margin-left: 2vw;
    display: flex;
    flex-direction: column;
}
.el-checkbox{
    margin: 1.5vw 0;
}
.check2{
    margin-top: 5.3vw;
}
.check4{
    margin-top: 4.5vw;
}
</style>