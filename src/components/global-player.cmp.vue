


<template>
	<section>

		<div class="global-player">
			<h1 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h1>
			<button @click="play"><i class="far fa-play-circle"></i></button>
			<button @click="pause"><i class="far fa-pause-circle"></i></button>

			<button @click="stop"><i class="far fa-stop-circle"></i></button>
		</div>

	</section>

</template>

<script>
import { eventBus, STOP_MUSIC } from "@/main.js";
export default {
	props: {
		refs: Object,
	},
	data() {
		return {
			isPlaying: true,
			isPause: false,
		};
	},
	computed: {
		getCurrSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
		player() {
			return this.$refs.youtube.player;
		},
	},
	methods: {
		stop() {
			this.refs.youtube.player.stopVideo();
		},
		pause() {
			this.refs.youtube.player.pauseVideo();
		},
		play() {
			this.refs.youtube.player.playVideo();
		},
	},
};
</script>

<style>
</style>