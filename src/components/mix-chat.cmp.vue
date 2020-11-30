<template>
	<section >
		<h2>chat app</h2>
		<div class="chat-msgs">
			<ul>
				<li v-for="(msgz, idx) in msgsHistory" :key="idx + msgz">
					<p>{{ msgz.name }}: {{ msgz.txt }}</p>
				</li>
				<li v-for="(msgz, idx) in msgs" :key="idx">
					<p>{{ msgz.name }}: {{ msgz.txt }}</p>
				</li>
			</ul>
		</div>
		<div class="chat-form">
			{{ room }}
			<p v-if="isTyping">Someone typing...</p>
			<form @submit.prevent="sendMsg">
				<input type="text" v-model="msg.txt" @keydown="isTypingNow" @keyup="isNotTypingNow" />
				<button>SEND</button>
			</form>
		</div>
	</section>
</template>
<script>
import socketService from "@/services/socketService.js";
export default {
	props: {
		mix: Object,
	},
	data() {
		return {
			msg: { name: "You", txt: "" },
			msgsHistory: [],
			msgs: [],
			room: this.mix._id,
			isTyping: false,
		};
	},
	methods: {
		sendMsg() {
			socketService.emit("send message", {
				msg: this.msg,
				roomId: this.room,
			});
			this.msg.txt = "";
		},
		isTypingNow() {
			socketService.emit("is typing", this.isTyping);
			this.isTyping = true;
		},
		isNotTypingNow() {
			socketService.emit("is not typing", this.isTyping);
			this.isTyping = false;
		},
	},
	created() {
		console.log("this.mix", this.mix);
		socketService.setup();
		socketService.emit("join room", this.room);
		socketService.on("chat message", (message) => {
			this.msgs.push(message);
		});
		socketService.on("type msg", (isTyping) => {
			this.isTyping = true;
		});
		socketService.on("stop type msg", (isTyping) => {
			this.isTyping = false;
		});
		socketService.on("message history", (messages) => {
			messages.filter((msg) => {
				if (msg.roomId === this.mixId) {
					this.msgsHistory.push(msg.msg);
				}
			});
		});
	},
};
</script>
<style>
</style>
