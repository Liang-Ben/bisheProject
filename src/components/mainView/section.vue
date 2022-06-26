<template>
  <div class="section">
    <div class="block">
        <div class="left">
            <ul class="typeUl">
                <li v-for="item in type" :key="item.typeId" @click="selectTo(item.typeName,item.typeId)">
                    <i class="iconfont icon-lishi"></i>
                    <div>
                        <div class="title">{{item.typeName}}</div>
                        <div class="num">数量:{{item.num}}</div>
                    </div>
                </li>
            </ul>
            <!-- <el-pagination
                small
                layout="prev, pager, next"
                :total="50">
            </el-pagination> -->
        </div>
        <el-carousel height="40vw" indicator-position="outside">
        <el-carousel-item v-for="item in cart" :key="item.isbn" >
            <img class="imgCarousel" :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
        </el-carousel-item>
        </el-carousel>
        <div class="right">
            <img src="../../../static/pic/畅销.png" alt="">
            <hr>
            <ul>
                <li v-for="item in sale" :key="item.isbn">
                    <div>
                        <img :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
                        <div class="name">{{item.name}}</div>
                        <div class="author">{{item.author}}</div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
  <hr>
  <div class="block2">
      <router-link target="_blank" to="/"><img src="../../../static/pic/评分.png" style="height:4vw" alt="评分最高"></router-link>
      <hr>
        <ul>
            <li v-for="item in Score" :key="item.isbn">
                <div>
                    <img :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
                    <el-rate
                        :value="item.aveScore1"
                        :max=5
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    <div class="name" @click="bookDetail(item.isbn)">{{item.name}}</div>
                    <div class="author">{{item.author}}</div>
                </div>
            </li>
        </ul>     
        <hr>
        <!-- 专栏 -->
        <img src="../../../static/pic/王小波.png" style="height:4vw" alt="王小波">
        <hr>
        <ul class="special">
            <li v-for="item in specialColumn1" :key="item.isbn">
                <div>
                    <img :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
                    <el-rate
                        :value="item.aveScore1"
                        :max=5
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    <div class="name" @click="bookDetail(item.isbn)" >{{item.name}}</div>
                    <div class="author">{{item.author}}</div>
                </div>
            </li>
        </ul>  
        <hr>  
        <!-- 专栏 -->
        <img src="../../../static/pic/马尔克斯.png" style="height:4vw" alt="加西亚马尔克斯">
        <hr>
        <ul class="special" >
            <li v-for="item in specialColumn2" :key="item.isbn">
                <div>
                    <img :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
                    <el-rate
                        :value="item.aveScore1"
                        :max=5
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    <div class="name" @click="bookDetail(item.isbn)">{{item.name}}</div>
                    <div class="author">{{item.author}}</div>
                </div>
            </li>
        </ul>  
        <hr>  
  </div>
  </div>
</template>

<script>
import {_selectCart,_selectType,_selectSale,_selectScore, _selectByName, _selectByAuthor} from '../../network/selectBook'
import {Server} from '../../network/request'
export default {
    name:"mainViewSection",
    data(){
        return{
            type:"",
            cart:'',
            sale:'',
            Score:'',
            specialColumn1:'',
            specialColumn2:'',
        }
    },
    methods:{
        bookDetail(isbn){
           let routeUrl =  this.$router.resolve({path:"/bookDetail",query:{isbn}})
           window.open(routeUrl.href, '_blank');
        },
        selectTo(type,typeId){
            this.$store.commit('changeInput','')
            this.$store.commit('changeSelectType','')
            this.$store.commit('changeBookType',type)
            this.$store.commit('changeTypeId',typeId)
            this.$router.push({path:"/selectView"})
        }
    },
    created(){
        _selectType().then(res=>{
            this.type = res.data.slice(0,20)
        }),
        _selectCart().then(res=>{
            this.cart = res.data
            for(let i=0;i<this.cart.length;i++){
                this.cart[i].photoUrl= Server + this.cart[i].photoUrl
            }
        }),
        _selectSale().then(res=>{
            this.sale = res.data
            for(let i=0;i<this.sale.length;i++){
                this.sale[i].photoUrl= Server + this.sale[i].photoUrl
            }
        }),
        _selectScore().then(res=>{
            this.Score = res.data
            for(let i=0;i<this.Score.length;i++){
                this.Score[i].photoUrl= Server + this.Score[i].photoUrl
                this.Score[i].aveScore1=this.Score[i].aveScore/2
            }
        }),
        _selectByAuthor("王小波").then(res=>{
            this.specialColumn1 = res.data
            for(let i=0;i<this.specialColumn1.length;i++){
                this.specialColumn1[i].photoUrl= Server + this.specialColumn1[i].photoUrl
                this.specialColumn1[i].aveScore1=this.specialColumn1[i].aveScore/2
            }            
        }),
        _selectByAuthor("马尔克斯").then(res=>{
            this.specialColumn2 = res.data
            for(let i=0;i<this.specialColumn2.length;i++){
                this.specialColumn2[i].photoUrl= Server + this.specialColumn2[i].photoUrl
                this.specialColumn2[i].aveScore1=this.specialColumn2[i].aveScore/2
            }            
        })
    }
}
</script>

<style lang="less">
.block{
    height: 42vw;
}
.section{
    box-sizing: border-box;
    width: 85vw;
    margin: 0 auto;
    padding: 3vw 3vw 3vw 3vw;
}


  .el-carousel__item{
      width: 27vw;
      img{
          height: 40vw;
          transition: 0.3s;
      }
  }
  .el-carousel{
      width: 27vw;
  }
  .block{
      display: flex;
      flex-wrap: wrap;
  }
  .left{
      width: 20vw;
      height: 40vw;
      color: #475669;
  }
  .typeUl{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      font-size: 0.8vw;
  }
  .typeUl li{
      box-sizing: border-box;
      padding-left: 2vw;
      transition: 0.2s;
      width: 50%;
      height: 4vw;
      display: flex;
      justify-content: start;
      align-items: center;
      background-color: #FFF;
      div{
          margin-left: 0.2vw;
          line-height: 1.5vw;
      }
      .title{
          font-weight: 700;
          font-size: 1vw;
      }
  }
  .typeUl li:hover{
      color: rgb(157, 48, 48);
      transform: scale(1.1,1.1);
      cursor: pointer;
  }

  .right{
      box-sizing: border-box;
      width: 30vw;
      height: 40vw;
      padding: 0 3vw;
      img{
          height: 4vw;
      }
      ul{
          display: flex;
          margin-top: 1vw;
          flex-wrap: wrap;
      }
      ul li{
          width: 40%;
          margin-left: 2vw;
          margin-bottom: 1vw;
          display: flex;
          flex-wrap: wrap;
          transition: 0.2s;
          div{
              width: 100%;
          }
      }
      ul img{
          width: 4.5vw;
          height: 6vw;
      }
      .name,.author{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .name{
          font-size: 0.8vw;
      }
      .author{
          font-size: 0.8vw;
      }
      ul li:hover{
          transform: scale(1.1,1.1);
          cursor: pointer;
      }
  }
  .icon-lishi{
      font-size: 2.2vw;
  }
  .block2{
      width: 79vw;
      ul{
          width: 79vw;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          margin-top: 1vw;
      }
      ul li{
          width: 14vw;
          margin: 0 3.5vw 1vw 1.5vw;
          img{
              width: 10.5vw;
              height: 15vw;
          }
          img:hover{
              cursor: pointer;
          }
        .name,.author{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            transition: 0.2s;
        }
        .name{
            font-weight: 700;
        }
        .name:hover{
            cursor: pointer;
            color: brown;
            transform: scale(1.1,1.1);
        }
      }
    .special{
          width: 79vw;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          margin-top: 1vw;
          li{
                width: 10vw;
                margin: 0 3.4vw 1vw 1.5vw;
                img{
                    width: 9.5vw;
                    height: 14vw;
                }
                .name,.author{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    transition: 0.2s;
                }
                .name{
                    font-weight: 700;
                }
                .name:hover{
                    color: brown;
                    transform: scale(1.1,1.1);
                }
          }
    }
  }
  .imgCarousel{
      width: 27vw;
  }
  .imgCarousel:hover{
      transform: scale(1.1,1.1);
      cursor: pointer;
  }
  .el-rate__icon{
      font-size:1.2vw;
  }
</style>