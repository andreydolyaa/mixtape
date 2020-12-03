


<template>
	<section class="globalPlayer">
		<div>
			<div v-if="getCurrSongPlaying">
				<youtube :video-id="getCurrSongPlaying.songUrlId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window" @ended="ended"></youtube>
			</div>
		</div>
		<div class="global-player">
		 <!-- // todo check @click="resetIcon" -->
		 <div class="logo" :class="isPlayingClass" >
        		<router-link to="/">
				<img
					class="reflect"
					src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame"
				/>
				
				</router-link>
			</div>
			<marquee-text class="title-width">
			<h2 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h2>
			<h2 v-else>Artist - Unknown</h2>
			</marquee-text>

			<!--------------- THIS IS THE PLAYER PROGRESS BAR  ! ------------------->
			<div class="progress-bar">
				<p v-if="currTime">{{currTime}}</p>
				<p v-else>00:00</p>
				<input @input="moveTo()" type="range" :min="currTime" :max="totalTimeInput" v-model="currTimePlaying" />
				<p v-if="totalTime">{{totalTime}}</p>
				<p v-else>00:00</p>
			</div>
			<!-------------- those are prev song next song buttons ------------->
			<div class="step-btn">
				<button @click="onPrevSong">
					<i class="fas fa-step-backward"></i>
				</button>
				<button v-if="!isPlayingNow" @click="play">
					<i class="fas fa-play"></i>
				</button>
				<button v-else @click="pause">
					<i class="far fa-pause-circle"></i>
				</button>
				<button @click="onNextSong">
					<i class="fas fa-step-forward"></i>
				</button>
			</div>
			<div>
				<button v-if="!isMuted" @click="mute">
					<i class="fas fa-volume-up"></i>
				</button>
				<button v-else @click="unmute">
					<i class="fas fa-volume-mute"></i>
				</button>
			</div>
		</div>
	</section>
</template>

<script>
import { eventBus } from "@/main.js";
import { utilService } from "@/services/utilService.js";
import socketService from "@/services/socketService.js";
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
				// host: 'https://www.youtube.com',
				// videoId: this.songId
			},
			currTime: 0,
			currTimePlaying: 0,
			totalTime: 0,
			totalTimeInput: 0,
			isMuted: false,
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
		timePlaying(){
			return this.currTimePlaying;
		},
		 isPlayingClass() {
			var currSong = this.$store.getters.getCurrSongIsPlaying;
			//return currSong
			return currSong ? 'logo-playing' : 'logo-stop'
		},
	},
	methods: {
		pause() {
			this.$refs.youtube.player.pauseVideo();
			this.$store.commit({
				type: "stopSongPlaying",
			});
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
		},
		play() {
			this.$refs.youtube.player.playVideo();
			this.$store.commit({
				type: "startSongPlaying",
			});
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = true;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
		},
		playing(event) {
			this.totalTimeInput = Math.floor(event.getDuration());
			this.totalTime = utilService.convertSecondsToTime(
				Math.floor(event.getDuration())
			);
			setInterval(() => {
				this.currTime = utilService.convertSecondsToTime(
					Math.floor(event.getCurrentTime())
				);
				this.currTimePlaying = Math.floor(event.getCurrentTime());
				socketService.emit('move-to-new-time',this.currTimePlaying);
			}, 1000);

			eventBus.$on('getTime',()=>{
				socketService.emit('move-to-new-time',this.currTimePlaying);
			})
		},
		
		ended() {
			this.autoPlayNextSong();
		},
		autoPlayNextSong() {
			var mixLength = this.currMix.songs.length;
			var nextSong;
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			this.$store.commit({
				type: "setPrevSongNotPlaying",
				songIdx: idx,
			});

			if (idx < this.currMix.songs.length - 1) {
				nextSong = this.currMix.songs[idx + 1];
			} else if (idx === this.currMix.songs.length - 1) {
				nextSong = this.currMix.songs[0];
			}
			var nextSongId = nextSong.songUrlId;
			this.$refs.youtube.player.loadVideoById(nextSongId);
			this.$store.commit({
				type: "setCurrSong",
				song: nextSong,
			});
			this.$store.commit({
				type: "startSongPlaying",
			});
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
			socketService.emit('next-song',nextSong)
		},
		async moveTo() {
			await this.$refs.youtube.player.seekTo(this.currTimePlaying, true);
			socketService.emit('move-to',this.currTimePlaying);
		},
		onNextSong() {
			this.autoPlayNextSong();
		},
		onPrevSong() {
			var mixLength = this.currMix.songs.length;
			var nextSong;
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			if (idx > 0) {
				nextSong = this.currMix.songs[idx - 1];
			} else if (idx === 0) {
				nextSong = this.currMix.songs[this.currMix.songs.length - 1];
			}
			var nextSongId = nextSong.songUrlId;
			this.$refs.youtube.player.loadVideoById(nextSongId);
			this.$store.commit({
				type: "setCurrSong",
				song: nextSong,
			});
			this.$store.commit({
				type: "startSongPlaying",
			});
			this.$store.commit({
				type: "setPrevSongNotPlaying",
				songIdx: idx,
			});
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
			socketService.emit('prev-song',nextSong)
		},
		mute() {
			this.isMuted = true;
			this.$refs.youtube.player.mute();
		},
		unmute() {
			this.isMuted = false;
			this.$refs.youtube.player.unMute();
		},
	},
		created() {
		socketService.setup();
    	socketService.emit('join room',this.room);
		eventBus.$on("pause-music", () => {
			this.pause();
		});
		eventBus.$on("resume-music", () => {
			this.play();
		});
		eventBus.$on('song-time',currTimePlaying => {
			this.$refs.youtube.player.seekTo(currTimePlaying,true);
			this.currTimePlaying = currTimePlaying
		})
		eventBus.$on('song-time-sync',currTimePlaying => {
			this.$refs.youtube.player.seekTo(currTimePlaying,true);
			this.currTimePlaying = currTimePlaying
			eventBus.$off('song-time-sync');
		})

		
	},
};
</script>

<style>
</style>


