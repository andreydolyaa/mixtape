<template>
	<section class="songs-list">
		<ul>
			<li class="songs-details-main flex" v-for="song in songs" :key="song.id">
				<div class="songs-details">
					<button v-if="!song.isPlaying" @click="setCurrSongPlaying(song);startSongPlaying(song,songs);">
						<i class="far fa-play-circle"></i>
					</button>
					<button v-else @click="pauseSong(song);">
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
import {eventBus} from '@/main.js';

export default {
	name: "mix-song",
	props: {
		songs: Array,
		mix: Object,
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
		isNowPlaying() {
			return this.$store.getters.getThisIsPlaying;
		},
		currSongPlaying(){
			return this.$store.getters.getCurrSongPlaying;
		}
	},
	methods: {	
		emitSongId(songId) {
			this.$emit("emitRemoveSong", songId);
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
		startSongPlaying(song,songs){
			eventBus.$emit('resume-music');
			this.$store.commit({
				type:'stopAllPlaying',
				song,
				songs
			})
			this.$store.commit({
				type:'startSongPlaying'
			})
		},
		pauseSong(song){
			eventBus.$emit('pause-music');
			this.$store.commit({
				type:'stopSongPlaying',
				song
			})
		}
	},
	created() {
		// console.log('mix data', this.mixes)
		
	},
	components:{
		
	},
}
</script>

