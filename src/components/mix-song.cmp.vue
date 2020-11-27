<template>
	<section class="songs-list">
		<div>
			<youtube :video-id="songId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window"></youtube>
		</div>
		<ul>
			<li class="songs-details-main flex" v-for="song in songs" :key="song.id">
				<div class="songs-details">
					<button v-if="!song.isPlaying" @click="play(song)">
						<i class="far fa-play-circle"></i>
					</button>
					<button v-else @click="pauseVideo(song)">
						<i class="far fa-pause-circle"></i>
					</button>

					<img :src="song.imgUrl" />
					<p>{{ song.title }}</p>
					<span>{{ song.duration }}</span>
				</div>
				<span class="delete-song" @click="emitSongId(song.id)">
					<i class="far fa-trash-alt"></i>
				</span>
			</li>
		</ul>
		
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";

export default {
	name: "mix-song",
	props: {
		songs: Array,
		mix: Object,
		// refs:Object
	},
	data() {
		return {
			songId: null,
			isPlaying: false,
			playerVars: {
				autoplay: 1,
			},
		};
	},
	computed: {
		async player() {
			return this.$refs.youtube.player;
		},
		isNowPlaying() {
			return this.$store.getters.getThisIsPlaying;
		},
		getCurrSongPlaying(){
			return this.$store.getters.getCurrSongPlaying;
		}
	},
	methods: {	
		emitSongId(songId) {
			this.$emit("emitRemoveSong", songId);
		},
		async play(song) {
			this.songs.forEach(song => song.isPlaying = false);
			this.isPlaying = true;
			song.isPlaying = true;
			var res = this.mix.songs.find((currSong) => currSong.id === song.id);
			this.songId = res.songUrlId;
			this.setIsPlaying();
			await this.$refs.youtube.player.playVideo();
		},
		pauseVideo(song) {
			song.isPlaying = false;
			this.$refs.youtube.player.pauseVideo();
			this.isPlaying = false;
			this.setIsPlaying();
		},
		playing() {
			// this.duration = this.getTime();
		},
		setIsPlaying() {
			console.log("@@@isPALYING:", this.isPlaying);
			this.$store.commit({
				type: "nowPlaying",
				isPlaying: this.isPlaying,
			});
		},
		
	},
	created() {
		// console.log('mix data', this.mixes)
	},
	components:{
		
	}
};
</script>

