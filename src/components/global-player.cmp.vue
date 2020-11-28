


<template>
	<section class="globalPlayer">
		<div>
			<div v-if="getCurrSongPlaying">
				<youtube :video-id="getCurrSongPlaying.songUrlId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window" @ended="ended"></youtube>
			</div>
		</div>
		<div class="global-player">
			<p>
				<i class="fas fa-music"></i>
			</p>
			<h2 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h2>
			<h2 v-else>Artist - Unknown</h2>
			<button v-if="!isPlayingNow" @click="play">
				<i class="far fa-play-circle"></i>
			</button>
			<button v-else @click="pause">
				<i class="far fa-pause-circle"></i>
			</button>
			<div>
				<p v-if="currTime">{{currTime}}</p>
				<p v-else>00:00</p>
				<input @input="moveTo" type="range" :min="currTime" :max="totalTime" v-model="moveTime">
				<p>{{totalTime}}</p>
			</div>
		</div>
	</section>
</template>

<script>
import { eventBus } from "@/main.js";
import {utilService} from "@/services/utilService.js";
export default {
	name: "global-player",
	data() {
		return {
			songId: "",
			isPlaying: false,
			isPause: false,
			playerVars: {
				autoplay: 1,
				origin: window.location.origin,
			},
			currTime:'',
			totalTime:'',
			moveTime:'',
			newTime:''
		};
	},
	computed: {
		async player() {
			return await this.$refs.youtube.player;
		},
		getCurrSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
		isPlayingNow() {
			return this.$store.getters.getCurrSongIsPlaying;
		},
		currMix() {
			return this.$store.getters.getMix;
		},
	},
	watch: {

	},
	methods: {
		pause() {
			this.$refs.youtube.player.pauseVideo();
			this.$store.commit({
				type: "stopSongPlaying",
			});
		},
		play() {
			this.$refs.youtube.player.playVideo();
			this.$store.commit({
				type: "startSongPlaying",
			});
		},
		playing(event) {
			this.totalTime = utilService.convertSecondsToTime(Math.floor(event.getDuration()));
			setInterval(()=>{
				this.currTime = utilService.convertSecondsToTime(Math.floor(event.getCurrentTime()))
			},1000)
			this.moveTo(event)
		},
		change(){
			
		},
		ended() {
			this.playNextSong();
		},
		playNextSong() {
			var mixLength = this.currMix.songs.length;
			var nextSong;
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex((song) => song.songUrlId === songId);
			if (idx < this.currMix.songs.length - 1){
				nextSong = this.currMix.songs[idx + 1];
			}
			else if(idx  === this.currMix.songs.length -1){
				nextSong = this.currMix.songs[0];
			}
			var nextSongId = nextSong.songUrlId;
			this.$refs.youtube.player.loadVideoById(nextSongId);
			this.$store.commit({
				type: "setCurrSong",
				song: nextSong,
			});
		},
		moveTo(event){
			console.log('time To move to: ',this.moveTime);
			console.log('move toEVENT: ',event)
			if(this.moveTime){
				this.$refs.youtube.player.seekTo(this.moveTime);
				// this.moveTime = '';
			}
		}
	},
	created() {
		eventBus.$on("pause-music", () => {
			this.pause();
		});
		eventBus.$on("resume-music", () => {
			this.play();
		});
	},
};
</script>

<style>
</style>


// VLE6Y1q13qE
//getCurrentTime
//getDuration