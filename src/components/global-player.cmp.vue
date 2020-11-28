


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
			<!--------------- THIS IS THE PLAYER PROGRESS BAR  ! ------------------->
			<div class="progress-bar">
				<p v-if="currTime">{{currTime}}</p>
				<p v-else>00:00</p>
				<input @input="moveTo()" type="range" :min="currTime" :max="totalTimeInput" v-model="currTimePlaying" />
				<p v-if="totalTime">{{totalTime}}</p>
				<p v-else>00:00</p>
			</div>
			<!-------------- those are prev song next song buttons ------------->
			<div>
				<button @click="onNextSong">NEXT</button>
				<button @click="onPrevSong">PREV</button>
			</div>
		</div>
	</section>
</template>

<script>
import { eventBus } from "@/main.js";
import { utilService } from "@/services/utilService.js";
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
			currTime: 0,
			currTimePlaying: 0,
			totalTime: 0,
			totalTimeInput: 0,
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
			this.totalTimeInput = Math.floor(event.getDuration());
			this.totalTime = utilService.convertSecondsToTime(
				Math.floor(event.getDuration())
			);
			setInterval(() => {
				this.currTime = utilService.convertSecondsToTime(
					Math.floor(event.getCurrentTime())
				);
				this.currTimePlaying = Math.floor(event.getCurrentTime());
			}, 1000);
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
				type:'setPrevSongNotPlaying',
				songIdx:idx
			})

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
				type:'startSongPlaying'
			})
		},
		async moveTo() {
			await this.$refs.youtube.player.seekTo(this.currTimePlaying);
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
		},
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


