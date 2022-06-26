<template>
<div >
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="bookform">
        <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="form.isbn"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input  v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提供方" prop="brand">
            <el-input  v-model="form.brand" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="装订" prop="designed">
                <el-select v-model="form.designed" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="书名" prop="name">
            <el-input  v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="页数/字数" prop="pages">
            <el-input  v-model="form.pages" ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input type="" v-model="form.price" ></el-input>
        </el-form-item>
        <el-form-item label="出版商" prop="publishing">
            <el-input  v-model="form.publishing" ></el-input>
        </el-form-item>
        <el-form-item label="出版时间" prop="published">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.published" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="种类ID" prop="typeId">
            <el-input type="" v-model="form.typeId" ></el-input>
        </el-form-item>
        <el-form-item label="平均分数" prop="aveScore">
            <el-input-number v-model="form.aveScore" :precision="2" :step="0.1" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="销售量" prop="saleNum">
            <el-input-number v-model="form.saleNum" :step="1000" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="作者简介" prop="authorIntro">
            <el-input autosize type="textarea" v-model="form.authorIntro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介" prop="description">
            <el-input autosize type="textarea" v-model="form.description" ></el-input>
        </el-form-item>
        <el-form-item label="封面" class="upload">
            <input  id="set"  clearable type="file" name="file" ref="file" hidden='' @change="changeFile($event)">
            <p class="image"  @click="selectImg()" >
                <el-empty  class="empty" description="点击上传封面(仅一张)"  :image="photo" :image-size="120"></el-empty>
            </p>
        </el-form-item>
        <el-form-item label="目录" prop="menu">
            <el-input autosize type="textarea" v-model="form.menu" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="!update" type="primary" @click="submitForm('form')">提交</el-button>
            <el-button v-if="update" type="primary" @click="updateForm('form')">更新</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {_BookInsert,_BookUpdate} from '../../network/book'
export default {
    name: 'adminBook',
        data() {
      var checkIsbn = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ISBN不能为空'));
        }
        setTimeout(() => {
          if (Number(value).toString()=="NaN") {
            callback(new Error('请输入数字值'));
          } else {
            if (value.length!=13) {
              callback(new Error('必须为13位'));
            } else {
              callback();
            }
          }
        }, 100);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入作者'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入作者简介'));
        }else {
          callback();
        }
      };
      return {
        update:false,
        form: {
          author: '',
          authorIntro: '',
          isbn: '',
          brand: '',
          description: '',
          designed: '',
          name: '',
          pages: '',
          photoUrl: null,
          price: '',
          publishing: '',
          published: '',
          typeId: '',
          menu: '',
          aveScore: 5,
          saleNum: 0,
        },
        photo:'',
        rules: {
          author: [
            { validator: validatePass, trigger: 'blur' }
          ],
          authorIntro: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          isbn: [
            { validator: checkIsbn, trigger: 'blur' }
          ]
        },
        options: [{
          value: "精装",
          label: '精装'
        }, {
          value: "平装",
          label: '平装'
        }, {
          value: "电子版",
          label: '电子版'
        }],
      }
    },
    methods: {
      selectImg:function(){
        document.getElementById('set').click()
      },
      changeFile(e){
        let _this = this
        this.form.photoUrl = e.target.files[0]
        if (!e || !window.FileReader) return  // 判断是否支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(this.form.photoUrl) // 文件转换
        reader.onloadend = function () {
            _this.photo = this.result
        }
      },
      updateForm(formName){
          if(this.form.isbn==''||this.form.isbn==null){
              this.$message({
                  type:'error',
                  message:'isbn不可为空'
              })
              return 0
          }
          _BookUpdate(this.form).then(res=>{
              console.log(res.data)
              this.$message({
                  type: "success",
                  message: "成功提交",
              })
          })
      },
      submitForm(formName) {
        for(let i in this.form){
            if(this.form[i]==''){
                this.$message({
                type: "error",
                message: "未填充完整",
            })
                return 0
            }
        }
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(_this.form)
            _BookInsert(_this.form).then(res=>{
                console.log(res)
                _this.$message({
                    type: "success",
                    message: "成功提交",
                })
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
    created(){
        if(this.$route.params.data){
            this.form = this.$route.params.data
            this.update = this.$route.params.update
            this.photo = this.form.photoUrl
        }
        console.log(this.form.published)
    }
}
</script>

<style lang="less" scoped>
/deep/.bookform{
    display: flex;
    flex-wrap: wrap;
    width: 50vw;
}
/deep/.el-form-item{
    width: 25vw;
}
/deep/.upload .el-form-item__label{
    margin-top: 20%;
}
</style>