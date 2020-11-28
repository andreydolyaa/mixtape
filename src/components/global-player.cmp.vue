


<template>
	<section class='globalPlayer'>
		<div>
			<div v-if='getCurrSongPlaying'>
				<youtube :video-id='getCurrSongPlaying.songUrlId' ref='youtube' @playing='playing' :player-vars='playerVars' class='youtube-window'></youtube>
			</div>
		</div>
		<div class='global-player'>
			<p><i class="fas fa-music"></i></p>
			<h2 v-if='getCurrSongPlaying'>{{getCurrSongPlaying.title}}</h2>
			<h2 v-else>Artist - Unknown</h2>
			<button v-if='!isPlayingNow' @click='play'>
				<i class='far fa-play-circle'></i>
			</button>
			<button v-else @click='pause'>
				<i class='far fa-pause-circle'></i>
			</button>
		</div>
	</section>
</template>

<script>
import { eventBus } from '@/main.js';
export default {
	name: 'global-player',
	data() {
		return {
			songId: '',
			isPlaying: false,
			isPause: false,
			playerVars: {
				autoplay: 1,
				origin: window.location.origin
			},
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
	},
	methods: {
		pause() {
			this.$refs.youtube.player.pauseVideo();
			this.$store.commit({
				type: 'stopSongPlaying',
			});
		},
		play() {
			this.$refs.youtube.player.playVideo();
			this.$store.commit({
				type: 'startSongPlaying',
			});
		},
		playing() {

		},
	},
	created() {
		eventBus.$on('pause-music', () => {
			this.pause();
		});
		eventBus.$on('resume-music', () => {
			this.play();
		});
	},
};
</script>

<style>
</style>


// VLE6Y1q13qE