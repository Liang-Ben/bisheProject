<template>
<div>
  <header>
      <img src="../../static/pic/logo.png" alt="">
      <h2>用户注册</h2>
  </header>
  <section>
      <el-steps class="steps" :space="400" :active="active" finish-status="success" align-center>
        <el-step title="填写注册信息"></el-step>
        <el-step title="注册成功"></el-step>
      </el-steps>
      <div v-if="codeFlag">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
                <el-form-item label="用户名" prop="username">
                    <el-input maxlength="20" placeholder="20字符以内" v-model.number="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" maxlength="16" placeholder='密码为8-16位字母、数字、特殊字符' v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" maxlength="16" placeholder='重复密码一次' v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-checkbox class="check" v-model="checked">我已阅读并同意 《用户服务协议》 和 《隐私政策》</el-checkbox>
                    <button :disabled="!checked" class="button" @click="submitForm('ruleForm')">确认注册</button>
                    <span class="reset" @click="resetForm('ruleForm')">表单重置</span>
                </el-form-item>
            </el-form>
      </div>
      <div v-if="!codeFlag">
              <el-result icon="success" title="注册成功" subTitle="返回的ID将作为您的账号,请牢记">
                <template slot="extra">
                    <el-tag type="info">您的ID为:{{result.data}}</el-tag>
                </template>
              </el-result>
              
      </div>
  </section>
</div>
</template>

<script>
import {_userInsert,_userLogin} from "../network/user"
export default {
    name:"login",
        data() {
                var checkName = (rule, value, callback) => {
                    if (!value) {
                    return callback(new Error('用户名不能为空'));
                    }
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
                    } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
                };
      return {
        active:1,
        codeFlag:true,
        checked:false,
        pattern:  /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$/,
        ruleForm: {
          pass: '',
          checkPass: '',
          username: '',
        },
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
          username: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.userInsert(this.ruleForm.username,this.ruleForm.pass)
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
      userInsert(userName,password){
          _userInsert(userName,password).then(res=>{
              console.log(res.data)
              this.result.code = res.data.code
              this.result.data = res.data.data
              if(res.data.code==403){
                this.$message({
                    message:'用户名重复，请重新选择!',
                    type: 'warning',
                    duration:2000,
                })
              }else if(res.data.code==200){
                this.active++
                this.codeFlag = false
              }
          })
      }
    }
  }
</script>

<style lang="less" scoped>
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
</style>