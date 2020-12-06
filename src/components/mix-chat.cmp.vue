<template>

	<section class="chat-app">
		<!-- <h2>chat app</h2> -->
        <!-- test -->
        <!-- just a test dont use<a @click="sendMsgWhatsapp"> whatsapp link njs</a> -->
        
        <span hidden><i class="far fa-comments"></i></span>
        <marquee-text>
        <div class="now-playing" v-if="getSong">
        <p><span> Now Playing - </span> {{getSong.title}} </p>

        </div>
        </marquee-text>
		<div class="chat-msgs">
			<ul>
				<li v-for="(mesg, idx) in msgsHistory" :key="idx + mesg">
					<p class="msg">{{ mesg.name }}: {{ mesg.txt }}</p>
				</li>
                
				<li v-for="(mesg, idx) in msgs" :key="idx">
					<p v-if="mesg.txt" class="msg">{{ mesg.name }}: {{ mesg.txt }}</p>
                    <div v-if="mesg.gif">
                        {{mesg.name}}:
                        <img :src="mesg.gif" class="gif">
                    </div>
				</li>

                
			</ul>
		</div>
		<div class="chat-form raised">
			<p class="some-typing" v-if="isTyping">Someone typing...</p>
			<form @submit.prevent="sendMsg">
				<input  type="text" v-model="msg.txt" @keydown="isTypingNow" @keyup="isNotTypingNow" placeholder="Share your thoughts..."/>
				<button><i class="far fa-paper-plane"></i></button>
                <select name="emojis" class="emojis" v-model="msg.txt">
                    <option value="" selected disabled hidden>{{chatEmojis[1]}}</option>
                    <option v-for="emoji in chatEmojis" :value="emoji" :key="emoji">{{emoji}}</option>
                </select>
            <select name="gifs" v-model="msg.gif" @change="sendMsg">
                <option value="" selected disabled hidden>GIF</option>
                    <option v-for="gif in gifs" :key="gif" :value="gif">gif</option>
            </select>
            <button @click="clearChat"><i class="far fa-trash-alt"></i></button>
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
            msg: {
                name:this.getUser,
                txt:'',
                gif:'',
            },
            msgsHistory:[],
            msgs: [],
            gifsList:[],
            gif:'',
            room:this.mixId,
            isTyping:false,
            chatEmojis:['🤙','😎','👍','😂','👻','🕺','💃','🤩','🥳','👽','🤖'],
            users:null,
            gifs:["https://www.icegif.com/wp-content/uploads/dancing-icegif-3.gif",'https://media0.giphy.com/media/Qz5jqYCH9l5t4Dz1Di/giphy.gif','https://gif-free.com/uploads/posts/2017-11/1509959847_snoopy-dancing.gif','https://www.askideas.com/media/08/Funny-Dancing-Gif-Image.gif','https://media4.giphy.com/media/e7QR593l1Vl94uqs9x/source.gif','https://media4.giphy.com/media/l3V0pGcu4HosNs57a/source.gif','https://media1.giphy.com/media/4QFzDdeLmo19MTm9AF/source.gif','https://i.pinimg.com/originals/5a/c5/50/5ac550d16dc31f593fd3b316eaf47d42.gif']
        };
    },
    computed:{
        getSong(){
            return this.$store.getters.getCurrSongPlaying;
        },
        getUser(){
             return this.$store.getters.getLoggedinUser;
        }
    },
    methods: {
        sendMsgWhatsapp(){
            this.$store.dispatch({ type: "sendMsgWhatsApp"});
        },
        sendMsg(){
            // if(!this.msg.txt || !this.msg.gif) return;
            socketService.emit('send message',{msg:this.msg,roomId:this.room});
            console.log('CHAT MSG SENT : ',this.msg);
            this.msg.txt = '';
            this.msg.gif = '';
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

        },
        clearChat(){
            this.msgs = [];
            this.msgsHistory = [];
            socketService.emit('clear chat')
        }
    },
    created() {
        // socketService.setup();
        // socketService.emit('join room',this.room);
        socketService.on('chat message',message => {
            this.msgs.unshift(message)
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

        socketService.on('clear-all-chat',()=>{
            this.msgs = [];
            this.msgsHistory = [];
        })

        
    },
    
};
</script>
<style>
</style>