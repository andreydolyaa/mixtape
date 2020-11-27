


<template>
	<section class="globalPlayer">
		<div>
			<div v-if="getCurrSongPlaying">
				<youtube :video-id="getCurrSongPlaying.songUrlId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window"></youtube>
			</div>
		</div>
		{{getCurrSongPlaying}}
		<div class="global-player">
			<h1 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h1>
			<button v-if="!isPlayingNow" @click="play">
				<i class="far fa-play-circle"></i>
			</button>
			<button v-else @click="pause">
				<i class="far fa-pause-circle"></i>
			</button>
		</div>
	</section>
</template>

<script>
export default {
	name: "global-player",
	data() {
		return {
			songId: "",
			isPlaying: false,
			isPause: false,
			playerVars: {
				autoplay: 1,
			},
		};
	},
	computed: {
		player() {
			return this.$refs.youtube.player;
		},
		getCurrSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
		isPlayingNow(){
			return this.$store.getters.getCurrSongIsPlaying;
		}
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
		playing() {
			
		},
	},
};
</script>

<style>
</style>