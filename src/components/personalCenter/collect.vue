<template>
  <div>
        <ul class="collect">
          <li v-for="item,index in books" :key="item.isbn">
              <img class="img" :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
              <div class="bookInfo">
                  <p class="name" @click="bookDetail(item.isbn)">{{item.name}}</p>
                  <div class="rate">
                      <span>偏好度</span>
                      <el-rate
                              :value="collects[index].rate/2"
                              :max=5
                              disabled
                              show-score
                              text-color="#ff9900"
                              score-template="{value}">
                      </el-rate>
                  </div>
                  <p class="author">{{item.author}}</p>
                  <p class="isbn">ISBN:{{item.isbn}}</p>
              </div>
              <div class="buttons">
                  <el-button type="primary" size="mini" @click="edit(item.isbn)">修改偏好度</el-button>
                  <el-button type="danger" size="mini" @click="del(item.isbn)">删除</el-button>
              </div>
          </li>
        </ul>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pages"
            @current-change="change">
        </el-pagination>

        <el-dialog title="修改评分" :visible.sync="dialogFormVisible" :center="true" width="40vw">
            <el-form class="form" >
            <el-form-item label="偏好程度:" class="rate" >
                <el-rate
                v-model="rate"
                show-text
                allow-half>
                </el-rate>
            </el-form-item>
            </el-form>
            <span>以上打分会影响对您的书籍推荐</span>
            <div slot="footer" class="dialog-footer">
            <button  class="button" @click="collectSubmit">确认</button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import {Server} from '../../network/request'
import {_userMessage} from '../../network/user'
import {_SelectAll,_Delete,_Update} from '../../network/collect'
export default {
    name:"collect",
    data(){
        return {
            userId:'',
            pages:8,
            pageNum:1,
            pageSize:8,
            collects:[],
            dialogFormVisible:false,
            books:[],
            rate:0,
            isbn:'',
            size:0,
        }
    },
    methods:{
        edit(isbn){
          this.dialogFormVisible = true
          this.isbn = isbn
        },
        collectSubmit(){
          if(this.rate==0){
              this.$confirm('评分为0, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                  this.$message({
                      type: 'success',
                      message: '确认!'
                  });
                  }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消评论提交'
                  });          
                      return 0
                  });
          }
          _Update(this.userId,this.isbn,this.rate*2).then(res=>{
            if(res.data.code==200){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogFormVisible = false
            }
            this.select()
          })
        },
        del(isbn){
          _Delete(this.userId,isbn).then(res=>{
            if(res.data.code==200){
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
            if(this.size==1){
              this.pageNum--
            }
            this.select()
          })
        },
        bookDetail(isbn){
           let routeUrl =  this.$router.resolve({path:"/bookDetail",query:{isbn}})
           window.open(routeUrl.href, '_blank');
        },
        select(){
            _SelectAll(this.pageSize,this.pageNum,this.userId).then(res=>{
              console.log(res.data)
              this.pages = res.data.data.collect.pages*8
              res.data.data.books.forEach(element => {
                element.photoUrl = Server + element.photoUrl
                element.aveScore1 = element.aveScore/2
              });
              res.data.data.collect.list.forEach(element =>{
                element.time = element.time.split('T')[0]+' '+element.time.split('T')[1].split('.')[0]
              })
              this.collects = res.data.data.collect.list
              this.books = res.data.data.books
              this.size = res.data.data.collect.size
            })
        },
        change(index){
            this.pageNum = index
            this.select()
        },
    },
    created(){
      _userMessage().then(res=>{
        if(res.data.code==200){
          this.userId = res.data.data.id
        }
        this.select()
      })
    },
}
</script>

<style lang="less" scoped>
.img{
  transition: .3s;
}
.img:hover{
  cursor: pointer;
  transform: scale(1.1);
}
.name{
  font-size: 1vw;
  font-weight: 700;
  transition: 0.3s;
}
.name:hover{
  cursor: pointer;
  color: brown;
  transform: scale(1.1);
}
.collect{
  font-size: 0.9vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 60vw;
  height: 46vw;
  li{
    p{
      width: 10vw;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    margin-right: 3vw;
    width: 12vw;
    img{
      width: 10vw;
      height: 14vw;
    }
  }
}
/deep/.el-rate__icon{
  font-size:10px;
  width: 8px;
}
/deep/.el-rate__text{
  font-size: 10px;
}
.rate{
  display: flex;

}
.buttons{width: 10vw;
  display: flex;
  justify-content: space-between;
}
</style>