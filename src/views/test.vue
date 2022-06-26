<template>
  <div>
      <div class="window">
        <ul class="memberList">
            <li class="userMessage" v-for="(value,key,index) in userList" :key="index">
                <img :src="Server+value" alt="">
                <span>{{key}}</span>
            </li>
        </ul>
                <div class="right">
                    <ul class=" List">
                        <li  v-for="(value,index) in message" :key="index">
                            <div :class={message:!value.myself,myMessage:value.myself}>
                                <img :src="Server+value.avator" alt="">
                                <span>{{value.username}}</span>
                            </div>
                            <p :class={text:value.myself}><span class="myText">{{value.textMessage}}</span></p>
                            
                        </li>
                    </ul>

                <div class="input">
                    <el-input v-model="send" placeholder="请输入内容"></el-input>
                    <el-button @click="send1" type="primary">发送</el-button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {avatorServer} from '../network/request'
export default {
    name:'test',

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
        }
    },
    created(){
        this.Server = avatorServer
        this.username = Math.random()*100
        this.avator = "36691dbe-4270-4a76-8b72-adc4c3a754b5s33861336.jpg"
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
		if(data.messageType=="4"){
			// console.log(data);
            if(data.username==this.username){data.myself = true}
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
    background-color: rgb(236, 245, 255);
    border: 10px solid rgb(236, 245, 255);
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
    background-color: rgb(198, 226, 255);
    border: 10px solide rgb(198, 226, 255);
    border-radius: 5px;
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
.myText{
    display: inline-block;
    border: 10px solid #EBEEF5;
    border-radius: 5px;
    background-color: #EBEEF5;
    margin-bottom: 10px;
}
.text{
    display: flex;
    justify-content: flex-end;
        .myText{
        margin-right: 50px;
    }
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
.right{
    box-sizing: border-box;
    background-color: rgb(236, 245, 255);
    padding-left: 20px;
    padding-right: 0px;
    width: 980px;
    border: 20px solid rgb(236, 245, 255);;
    border-radius: 10px;
}
</style>