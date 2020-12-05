<template>

	<section class="chat-app">
		<!-- <h2>chat app</h2> -->
        <marquee-text>
        <div class="now-playing" v-if="getSong">
        <p><span> Now Playing - </span> {{getSong.title}} </p>

        </div>
        </marquee-text>
        <h1>{{users}}</h1>
		<div class="chat-msgs">
			<ul>
				<li v-for="(msgz, idx) in msgsHistory" :key="idx + msgz">
					<p class="msg">{{ msgz.name }}: {{ msgz.txt }}</p>
				</li>
                
				<li v-for="(msgz, idx) in msgs" :key="idx">
					<p class="msg">{{ msgz.name }}: {{ msgz.txt }}</p>
				</li>
			</ul>
		</div>
        <!-- <div class="setUser">

            <form @submit.prevent="setUserName">
            <input type="text" placeholder="Select nickname..." v-model="msg.name">
            </form>
        </div> -->
		<div class="chat-form">
			<p class="some-typing" v-if="isTyping">Someone typing...</p>
			<form @submit.prevent="sendMsg">
				<input type="text" v-model="msg.txt" @keydown="isTypingNow" @keyup="isNotTypingNow" placeholder="Share your thoughts..."/>
				<button><i class="far fa-paper-plane"></i></button>
                <select name="emojis" class="emojis" v-model="msg.txt">
                    <option value="" selected disabled hidden>{{chatEmojis[1]}}</option>
                    <option v-for="emoji in chatEmojis" :value="emoji" :key="emoji">{{emoji}}</option>
                </select>
				<!-- <button><img src="https://res.cloudinary.com/hw-projects/image/upload/v1606416732/appmixes/send-messege_s_red.png"></button> -->
			</form>
		</div>
	</section>
</template>
<script>
import socketService from "@/services/socketService.js";
export default {
    props:{
        mixId:String
    },
    data() {
        return {
            msg: {name:'Guest',txt:''},
            msgsHistory:[],
            msgs: [],
            room:this.mixId,
            isTyping:false,
            chatEmojis:['🤙','😎','👍','😂','👻','🕺','💃','🤩','🥳','👽','🤖'],
            users:null
        };
    },
    computed:{
        getSong(){
            return this.$store.getters.getCurrSongPlaying;
        },
    },
    methods: {

        sendMsg(){
            if(!this.msg.txt) return;
            socketService.emit('send message',{msg:this.msg,roomId:this.room});
            console.log('CHAT MSG SENT : ',this.msg);
            this.msg.txt = '';
        },
        isTypingNow(){
            socketService.emit('is typing',this.isTyping)
            this.isTyping = true;
        },
        isNotTypingNow(){
            socketService.emit('is not typing',this.isTyping)
            this.isTyping = false;
        },
        setUserName(){

        }
    },
    created() {
        socketService.setup();
        socketService.emit('join room',this.room);
        socketService.on('chat message',message => {
            this.msgs.push(message)
        })
        socketService.on('type msg',isTyping => {
                this.isTyping = true;
        })
        socketService.on('stop type msg',isTyping => {
            this.isTyping = false;
        })
        socketService.on('message history' , messages => {
            messages.filter(msg => {
                if( msg.roomId === this.mixId){
                    this.msgsHistory.push(msg.msg);
                }
            })
        })
        socketService.on('user joined',username => {
            this.msgs.push(username)
            console.log('username ',username);
        })

        socketService.on('getCount',totalConnected => {
            this.users = totalConnected;
        })

        
    },
    
};
</script>
<style>
</style>
