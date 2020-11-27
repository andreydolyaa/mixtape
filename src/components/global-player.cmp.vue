


<template>
	<section class="globalPlayer">
		<div>
			<!-- <div v-if="getCurrSongPlaying">
				<youtube :video-id="getCurrSongPlaying.songUrlId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window"></youtube>
			</div> -->
		</div>
		<div class="global-player">
			<h1 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h1>
			<button @click="play" >
				<i class="far fa-play-circle"></i>
			</button>
			<button @click="pause" >
				<i class="far fa-pause-circle"></i>
			</button>
			<button @click="stop">
				<i class="far fa-stop-circle"></i>
			</button>
		<!-- v-if="getCurrSongPlaying.isPlaying" -->
		</div>
	</section>
</template>

<script>
export default {
	name: "global-player",
	props: {
		refs: Object,
	},
	data() {
		return {
			songId: "",
			isPlaying: true,
			isPause: false,
			playerVars: {
				autoplay: 1,
			},
		};
	},
	computed: {
		async player() {
			return this.$refs.youtube.player;
		},
		getCurrSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
	},
	methods: {
		stop() {
			this.$refs.youtube.player.stopVideo();
		},
		pause() {
			this.$refs.youtube.player.pauseVideo();
			this.$store.commit({
				type:'stopSongPlaying'
			})
			this.$emit()
		},
		play() {
			this.refs.youtube.player.playVideo();
			this.$store.commit({
				type:'startSongPlaying',
				song
			})
		},
		playing() {
			// this.duration = this.getTime();
		},
	},
	created() {},
};
</script>

<style>
</style>