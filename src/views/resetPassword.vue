<template>
<div>
  <header>
      <img src="../../static/pic/logo.png" alt="">
      <h2>密码重置</h2>
  </header>
  <section>
      <el-steps class="steps" :space="400" :active="active" finish-status="success" align-center>
        <el-step title="填写新密码"></el-step>
        <el-step title="重置成功"></el-step>
      </el-steps>
      <div v-if="codeFlag">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" maxlength="16" placeholder='密码为8-16位字母、数字、特殊字符' v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" maxlength="16" placeholder='重复密码一次' v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  label="验证码" prop="checkCode">
                    <div class="code">
                        <el-input  type="text" maxlength="6" placeholder='输入验证码' v-model="ruleForm.checkCode" autocomplete="off"></el-input>
                        <el-button :disabled="disable" type="primary" @click="send">{{text}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <button  class="button" @click="submitForm('ruleForm')">确认重置</button>
                    <span class="reset" @click="resetForm('ruleForm')">表单重置</span>
                </el-form-item>
            </el-form>
      </div>
      <div v-if="!codeFlag">
              <el-result icon="success" title="重置成功" >
              </el-result>
              
      </div>
  </section>
</div>
</template>

<script>
import {_emailSend,_emailCheck} from '../network/email'
import {_userSelect} from '../network/user'
export default {
    name:'resetPassword',
        data() {
                var validateCode = (rule, value, callback) => {
                    if (!value) {
                    return callback(new Error('请输入验证码'));
                    }
                    setTimeout(() => {
                    if (!this.patternPass.test(value)) {
                        callback(new Error('请输入6位数字验证码'));
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
                    } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
                };
      return {
          Inter : null,
          time:5,
        text:'获取验证码',
        disable:false,
        active:1,
        codeFlag:true,
        checked:false,
        pattern:  /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$/,
        patternPass: /^\d{6}$/,
        ruleForm: {
          pass: '',
          checkPass: '',
          checkCode: '',
        },
        userId:null,
        result:{
            code:'',
            data:''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkCode: [
            { validator: validateCode, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      send(){
          if(this.userId!=''){
            _emailSend(this.userId).then(res=>{
                console.log(res)
            })
            this.disable = true
            this.Inter = setInterval(()=>{
                this.time--
                this.text = '还剩'+this.time+'S' 
                if(this.time==0){
                    clearInterval(this.Inter)
                    this.time = 5
                    this.text = '获取验证码'
                    this.disable = false
                }
            },1000)

          }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              _emailCheck(this.userId,this.ruleForm.pass,this.ruleForm.checkCode).then(res=>{
                  if(res.data.code==200){
                      this.active = 2
                      this.codeFlag = false
                  }else{
                this.$message({
                    message:'验证码不正确!',
                    type: 'error',
                    duration:2000,
                })
                  }
              })
          } else {
            this.$message({
                message:'输入不符合规则!',
                type: 'error',
                duration:2000,
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created(){
      this.userId = this.$route.query.id
    }
  }

</script>

<style lang="less" scoped>
/deep/.el-button{
    width: 8vw;
}
header {
    margin-top: 2vw;
    margin-left: 12vw;
    display: flex;
    align-items: center;
}
header img{
    width: 10vw;
    margin-right: 2vw;
}
section{
    width: 85vw;
    margin: 0 auto;
    .steps{
        margin-top: 4%;
        margin-left: 50%;
        transform: translate(-50%);
    }
}
.demo-ruleForm{
    margin-top: 4vw;
    margin-left: 24.5vw;
    width: 30vw;
}
.button{
    display: block;
    position: relative;
    right: 0vw;
    width: 23.5vw;
    height: 2.6vw;
    transition: 0.3s;
    margin-left: 0vw;
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
.button:disabled{
    background: #b3d8ff;
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
.check{
    display: block;
    line-height: 5vw;
    margin-top: -1.5vw;
}
/deep/.code{
    display: flex;
    justify-content: space-between;
    .el-input{
        width: 14vw;
    }
}
</style>