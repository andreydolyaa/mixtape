<template>
	<section class="songs-list">

		<!-- <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   				<div v-for="element in myArray" :key="element.id">{{element.name}}</div>
		</draggable> -->
		<ul>
			<draggable v-model="songsCopy" group="people" @start="drag=true" @end="drag=false" @end="onEnd">
				<li class="songs-details-main flex" v-for="(song,index) in songsCopy" :key="song.id">
					<div class="songs-details">
						<button v-if="!song.isPlaying" @click="setCurrSongPlaying(song);startSongPlaying(song,songs);">
							<i class="far fa-play-circle"></i>
						</button>
						<button v-if="song.isPlaying" @click="pauseSong(song);">
							<i class="far fa-pause-circle"></i>
						</button>


						<img :src="song.imgUrl" />
						<p>{{ song.title }}</p>
						<span>{{ song.duration }}</span>
					</div>
					<div class="sort-songs-buttons">
						<button v-on:click="emitSongPos(index,-1)"><i class="fas fa-sort-up"></i></button>
						<button v-on:click="emitSongPos(index,1)"><i class="fas fa-sort-down"></i></button>
					</div>
					<span class="delete-song" @click="emitSongId(song.id)">
						<i class="far fa-trash-alt"></i>
					</span>
				</li>
			</draggable>
		</ul>
		
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
import {eventBus} from '@/main.js';
import draggable from 'vuedraggable'

export default {
	name: "mix-song-list",
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
				//origin: window.location.origin, // or http(S)://your.domain.com
				origin:'http://localhost:8080/'
			},
			songsCopy: JSON.parse(JSON.stringify(this.songs)),
		};
	},
	computed: {
		isNowPlaying() {
			return this.$store.getters.getThisIsPlaying;
		},
		currSongPlaying(){
			return this.$store.getters.getCurrSongPlaying;
		},
	},
	methods: {
		onEnd(){
			console.log('drag end');
		},
		emitSongPos(songIdx,diff) {
			this.$emit("emitSongPos", {songIdx:songIdx,diff:diff});
		},	
		emitSongId(songId) {
			this.$emit("emitRemoveSong", songId);
		},
		setIsPlaying() {
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
		draggable
	},
}
</script>

