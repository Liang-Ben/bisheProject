<template>
    <ul ref="ul" class="menu" :class="{'show':active}">
      <li @click="scroll(1)"><i class="iconfont icon-icon-test57"></i>返回顶部</li>
      <li @click="scroll(2)"><i class="iconfont icon-icon-test59"></i>去往底部</li>
    </ul>
</template>

<script>
export default {
    name:"mainViewAside",
    data(){
      return{
        flag:true,
        active:false
      }
    },
    methods:{
      scroll(index){
        let that = this
        if(this.flag==false)return 0
        this.flag = false
        if(index==1){
          var target = 0
        }else{
          var target = document.body.offsetHeight - document.documentElement.clientHeight
        }
        let distance = (window.pageYOffset - target)/10
        var Interval = setInterval(function(){
          let dis = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
          document.documentElement.scrollTop -= dis
          setTimeout(function(){
            clearInterval(Interval)
            that.flag = true
          },150)
        },15)

      }
    },
    mounted(){
      let that = this
      window.addEventListener("scroll",()=>{
        if(window.pageYOffset>500){
          that.active=true
        }else{
          that.active=false
        }
      })
    },
}
</script>

<style lang="less" scoped>
.show{
  display: block;
}
.menu{
  width: 9vw;
  position: fixed;
  top: 30vw;
  right: 0;
}
ul{
  display: none;
}
ul li{
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  i{
    font-size: 25px;
  }
}
ul li:hover{
  cursor: pointer;
}
</style>
