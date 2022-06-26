<template>
  <div class="main">
    <div class="head"></div>
    <div class="wrap">
      <div>
        <input type="text" v-model="isbn">
        <button @click="select2">点击搜书</button>
        <ul>
          <li v-for="item,index of book" :key="index">{{item}}</li>
        </ul>
        <img :src="book.photoUrl" alt="">
      </div>
    </div>
    <div class="footer"></div>
    <div v-html="book.description"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MainScreen',
  data () {
    return {
      isbn: '',
      book:{
        author:'',
        authorIntro:'',
        brand:'',
        code:'',
        createTime:'',
        description:"",
        designed:'',
        name:'',
        pages:'',
        photoUrl:'',
        price:'',
        published:'',
        publishing:'',
      }
    }
  },
  methods:{
    select2(){
      axios({
          method:"get",
          url:`https://api.jike.xyz/situ/book/isbn/${this.isbn}?apikey=12312.63dcf9fce31448b11a74d41ed8434245.abe4e7797c1036c21dacd20aaf5a2f5a`,
      }).then(res=>{
          console.log(res.data.data)
          let book = this.book
          let data = res.data.data
          book.author = data.author
          book.authorIntro = data.authorIntro
          book.brand = data.brand
          book.code = data.code
          book.createTime = data.createTime
          book.description = data.description
          book.designed = data.designed
          book.name = data.name
          book.pages = data.pages
          book.photoUrl = data.photoUrl
          book.price = data.price
          book.published = data.published
          book.publishing = data.publishing
      }).catch(()=>{
        console.log("出错了")
        alert('出错了')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
