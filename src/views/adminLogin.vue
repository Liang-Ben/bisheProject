<template>
  <div class="backgorund">
    <div class="formback">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="id" prop="id">
                <el-input v-model.number="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <router-link to="/adminRegister" class="register">注册</router-link>
        </el-form>
    </div>
  </div>
</template>

<script>
import {_Login} from '../network/admin'
export default {
    name:'adminLogin',
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _Login(this.ruleForm.id,this.ruleForm.pass).then(res=>{
                console.log(res)
                localStorage.setItem("AdminToken",res.data.data.token)
                this.$router.push({path:'/adminCenter'})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    data(){
            var checkId = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('id不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    }else{
                        callback();
                    }
                }, )
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };
        return{
            ruleForm: {
                id: '',
                pass: '',
            },
            rules: {
                id: [
                    { validator: checkId, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],

            },

        }
    }
}
</script>
<style lang="less" scoped>
.backgorund{
    overflow: hidden;
    margin-top: 0;
    width: 100%;
    height: 94vh;
    background-image: url(../../static/pic/背景.webp);
    background-size: contain;
}

.formback{
    margin-top: 10vw;
    margin-left: 55vw;
    padding-top: 3vw;
    width: 30vw;
    height: 20vw;
    border-radius: 1vw;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: white;
}
/deep/.ruleForm{

    width: 25vw;
}
.register{
    float: right;
    font-size: 18px;
    border-bottom: 1px solid black ;
}
</style>