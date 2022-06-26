<template>
  <div>
      <div class="window">
        <ul class="memberList">
            <li class="userMessage" v-for="(value,key,index) in userList" :key="index" @click="touser(key)">
                <img :src="Server+value" alt="">
                <span>{{key}}</span>
            </li>
        </ul>
                <div class="chatright">
                    <ul class=" List">
                        <li  v-for="(value,index) in message" :key="index">
                            <div :class={message:!value.myself,myMessage:value.myself}>
                                <img :src="Server+value.avator" alt="">
                                <span>{{value.username}}</span>
                            </div>
                                
                                <p :class={text:value.myself,color:value.touser} class="center">
                                    <el-tag type="success" v-if="value.touser">私聊你 :</el-tag>
                                    <span class="myText">{{value.textMessage}}</span>
                                </p>
                        </li>
                    </ul>

                <div class="input">
                    <el-input v-model="send" placeholder="请输入内容"></el-input>
                    <el-button @click="Send" type="primary">发送</el-button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {avatorServer} from '../network/request'
import {_userMessage,_userSelect} from '../network/user.js'
export default {
    name:'chat',
    beforeRouteEnter(to,from,next){
        if(localStorage.getItem("token")==null){
            next(vm=>{
                vm.$message({
                    message:'请先登录!',
                    type: 'error',
                    duration:2000,
                })
                vm.$router.push({
                    path:'/'
                })
            })
            console.log("触发了前置")
        }else{
            next()
        }
    },
    beforeRouteLeave(to,from,next){
        if(this.Websocket){
            this.Websocket.close()
        }
        console.log("触发了后置")
        next()
    },    
    data(){
        return{
            username:null,
            avator:'',
            userList:[],
            message:[],
            send:'',
            Websocket:null,
            Server:''
        }
    },
    methods:{
        touser(key){
            this.send = "@ "+key+' '
        },
        send1(){
            console.log("群发")
            if(this.send==''){return}
			var param = {};
			param['username'] = this.username;
			param['message'] = this.send;
			param['type'] = '群发';
			param['tousername'] = '';
            this.Websocket.send(JSON.stringify(param))
            this.send = ''
        },
        send2(){
            console.log("私发")
            if(this.send==''){return}
			var param = {};
			param['username'] = this.username;
			param['message'] = this.send.split(' ')[2];
			param['type'] = '私发';
			param['tousername'] = this.send.split(' ')[1];;
            this.Websocket.send(JSON.stringify(param))
            this.send = ''            
        },
        Send(){
            if(this.send.indexOf("@") == 0){
                this.send2()
            }else{
                this.send1()
            }
        }
    },
    created(){
        _userMessage().then(res=>{
            if(res.data.code==200){
                _userSelect(res.data.data.id).then(res=>{
                    this.username = res.data.data.userName
                    if(res.data.data.avator){
                        this.avator = res.data.data.avator.split('/')[3]
                    }else{
                        this.avator = "暂无.jpeg"
                    }
                }).then(()=>{
                    this.Server = avatorServer
                    var websocket = null;
                    if('WebSocket' in window){
                        websocket = new WebSocket("ws://localhost:8090/websocket/"+this.username+'/'+this.avator);
                        this.Websocket = websocket
                    }else{
                        alert('Not support websocket')
                    }

                    //连接发生错误的回调方法
                    websocket.onerror = ()=>{
                        console.log("发生错误");
                    };
                
                    //连接成功建立的回调方法
                    websocket.onopen = (event)=>{
                        console.log("建立连接");
                    }
                
                    //接收到消息的回调方法
                    websocket.onmessage = (event)=>{
                        let data = JSON.parse(event.data);
                        console.log(data)
                    //更新content的内容（上线）
                    if(data.messageType=="1"){
                        // console.log("成功")
                        // this.userList.push(data.username)
                    }
                    //更新content的内容（下线）
                    if(data.messageType=="2"){
                        // console.log("成功")
                        // this.userList.splice(this.userList.indexOf(data.username),1)
                    }
                    // 更新content的内容（更新用户列表）
                    if(data.messageType=="3"){
                        //先清空
                        this.userList = data.onlineUsers;
                    }
                    // 更新content的内容（更新用户群发消息）
                    if(data.messageType=="4"||data.messageType=="5"||data.messageType=="6"){
                        // console.log(data);
                        if(data.username==this.username){data.myself = true}
                        if(data.messageType=='5'){data.touser = true}
                        this.message.push(data)
                    }
                        
                    }
                
                    //连接关闭的回调方法
                    websocket.onclose = ()=>{
                        console.log("关闭连接");
                    }
                
                    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                    window.onbeforeunload = ()=>{
                        alert("已关闭连接");
                        websocket.close();
                    }
                    })
            }else{
                // this.$router.push({path:'/'})
            }
        })

                
        //开始


    }
}
</script>

<style scoped lang="less">
.input{
    display: flex;
    width: 850px;
}
li img{
    width: 40px;
    height: 40px;
    border-radius: 20vw;
}
.memberList{
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-right: 20px;
    width: 250px;
    height: 560px;
    overflow: auto;
    background-color: #EBEEF5;
    border: 10px solid #EBEEF5;
    border-radius: 5px;
}
.userMessage{
    box-sizing: border-box;
    width: 250px;
    height: 50px;
    display: flex;
    align-items: center;
    span{
        margin-left: 10px;
    }
    margin-bottom: 10px;
    padding-left: 10px;
    background-color: #E4E7ED;
    border: 10px solide #E4E7ED;
    border-radius: 5px;
    transition: 0.5s;
}
.userMessage:hover{
    cursor: pointer;
    background-color: #C0C4CC;
    border: 10px solide #C0C4CC;
}
.List{
    width: 940px;
    height: 500px;
    overflow: auto;
    li{
        width: 900px;
    }
    p{
        margin-left: 50px;
    }
}
/deep/.el-tag{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin-right: 10px;
}

.myText{
    display: inline-block;
    border: 10px solid white;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
}
.text{
    display: flex;
    justify-content: flex-end;
        .myText{
        margin-right: 50px;
    }
}
.color{
    color: #409EFF;
}
.message{
    display: flex;
    align-items: flex-start;
        span{
        margin-left: 5px;
        }
}
.myMessage{
    display: flex;
    align-items: flex-start;
    flex-direction: row-reverse;
    justify-content: flex-start;
    span{
        margin-right: 5px;
    }

}
.window{
    margin-top: 50px;
    margin-left: 100px;
    padding-left: 20px;
    display: flex;
    width: 1300px;
}
.chatright{
    box-sizing: border-box;
    background-color: #EBEEF5;
    padding-left: 20px;
    padding-right: 0px;
    width: 980px;
    border: 20px solid #EBEEF5;
    border-radius: 10px;
}
</style>