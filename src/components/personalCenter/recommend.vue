<template>
<div class="out">
  <div class="block2">
        <h2>猜你喜欢</h2>
        <h4>以下是为您推荐的图书</h4>
        <ul>
            <li v-for="item in books" :key="item.isbn">
                <div>
                    <img :src="item.photoUrl" @click="bookDetail(item.isbn)" alt="">
                    <el-rate
                        :value="item.aveScore"
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
  </div>
  </div>
</template>

<script>
import {Server} from '../../network/request'
import {_userMessage} from '../../network/user'
import {_RecommendByUser,_RecommendByItem} from '../../network/recommend'
export default {
    name:"recommend",
    data(){
        return{
            books:[]
        }
    },
    created(){
        _userMessage().then(res=>{
            _RecommendByUser(res.data.data.id,10).then(res=>{
                console.log(res.data)
                res.data.forEach(element => {
                    element.photoUrl = Server +element.photoUrl
                    element.aveScore/=2
                });
                this.books = res.data
            })
        })
    },
    methods:{
        bookDetail(isbn){
           let routeUrl =  this.$router.resolve({path:"/bookDetail",query:{isbn}})
           window.open(routeUrl.href, '_blank');
        },
    },
}
</script>

<style lang="less" scoped>
.out{
    margin-top: -5vw;
}
h2,h4{
    margin: 3vw 0;
}
.block2{
    width: 60vw;
    ul{
        width: 60vw;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 2vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        margin-top: 1vw;
    }
    ul li{
        
        width: 10vw;
        margin: 0 2.5vw 1vw;
        img{
            width: 10vw;
            height: 14.5vw;
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
}
</style>