<template>
	<section class="songs-list">
		<div>
			<youtube :video-id="songId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window"></youtube>
		</div>
		<ul>
			<li class="songs-details-main flex" v-for="song in songs" :key="song.id">
				<div class="songs-details">
					<button v-if="!song.isPlaying" @click="play(song,songs)">
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
		
		 <!-- <div class="global">
          <globalPlayer :refs="$refs"/>
    </div> -->
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
import globalPlayer from '@/components/global-player.cmp.vue';

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
				//origin: window.location.origin, // or http(S)://your.domain.com
				origin:'http://192.168.0.32:8080/'
			},
		};
	},
	computed: {
		async player() {
			return await this.$refs.youtube.player;
		},
		isNowPlaying() {
			return this.$store.getters.getThisIsPlaying;
		},
		getCurrSongPlaying(){
			return this.$store.getters.getCurrSongPlaying;
		},
	},
	methods: {	
		emitSongId(songId) {
			this.$emit("emitRemoveSong", songId);
		},
		async play(song,songs) {
			this.stopAllPlaying(song,songs);
			this.isPlaying = true;
			var res = this.mix.songs.find((currSong) => currSong.id === song.id);
			this.songId = res.songUrlId;
			this.setCurrSongPlaying(song)
			this.startCurrSong(song);
			this.setIsPlaying();
			await this.$refs.youtube.player.playVideo();
		},
		pauseVideo(song) {
			this.stopCurrSong(song)
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
		setCurrSongPlaying(song){
			this.$store.commit({
				type:'setCurrSong',
				song
			})
		},
		stopCurrSong(song){
			this.$store.commit({
				type:'stopSongPlaying',
				song
			})
		},
		startCurrSong(song){
			this.$store.commit({
				type:'startSongPlaying',
				song
			})
		},
		stopAllPlaying(song,songs){
			console.log(song);
			this.$store.commit({
				type:'stopAllPlaying',
				song,
				songs
			})
		}
	},
	created() {
		// console.log('mix data', this.mixes)
		this.status()
	},
	components:{
		globalPlayer
	},
	// watch: {
	// 	status(newValue, oldValue) {
	// 		//console.log(`Updating from ${oldValue} to ${newValue}`);
	// 		// Do whatever makes sense now
	// 		if (this.getCurrSongPlaying) {
	// 			console.log('playing',newValue)
	// 		}else{
	// 			console.log('Not Playing',newValue)
	// 		}
	// 	},
	// },
}
</script>

