<template>
	<section class="songs-list flex column">
		<!-- <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   				<div v-for="element in myArray" :key="element.id">{{element.name}}</div>
		</draggable> -->
		<div class="search-song-and-social-container" v-if="mix">
			<div class="search-and-add">
				<i @click="openInputApi" class="fas fa-plus-circle"></i>
				<i @click="openInputSearch" class="fas fa-search"></i>
				<mixApiSearch v-if="isAdd" />
					<div class="search-song" v-if="!isAdd">
						<el-input
							type="text"
							placeholder="Search song in mix..."
							v-model="songTxt"
							@input="filterBySong"
							clearable>
						</el-input>
				</div>
			</div>
				<mix-social /> 
		</div>
		<ul v-if="mix" class="songsUl">	
			<draggable v-if="mix" v-model="filterBySong" group="people" @start="drag=true" @end="stopDrag">

				<li class="songs-details-main flex" v-for="(song,index) in filterBySong" :key="song.id">
				<!-- <div>	{{song}} </div> -->
				<!-- <div>	{{currSongPlaying}} </div> -->
					<div class="songs-details">
						<button v-if="!song.isPlaying" @click="setCurrSongPlaying(song);startSongPlaying(song,filterBySong)">
							<i class="far fa-play-circle"></i>
						</button>
						<button v-else @click="pauseSong(song);">
							<i class="far fa-pause-circle"></i>
						</button>					
						<img :src="song.imgUrl" />						
						
						<p :class="song.isPlaying  ? 'highlight-color' : 'default-color'">{{ song.title }}</p>

						<span>{{ song.duration }}</span>
					</div>
					<!-- <div v-if="song.isPlaying" class="img-equalizer">
						<img src="" />
					</div> -->
					<div class="sort-songs-buttons">
						<button v-on:click="emitSongPos(index,-1)">
							<i class="fas fa-sort-up"></i>
						</button>
						<button v-on:click="emitSongPos(index,1)">
							<i class="fas fa-sort-down"></i>
						</button>
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
import mixApiSearch from "@/components/mix-api-search.cmp.vue";
import mixSocial from '@/components/social-mix.cmp.vue';
import socketService from "@/services/socketService.js";

export default {
	name: "mix-song-list",
	props: {
		songs: Array,
		//mix: Object,
	},
	data() {
		return {
			songId: null,
			isAdd: false,
			isPlaying: false,
			mixCopy: null,
			songTxt: "",
			equalizer: ''
		};
	},
	computed: {
		mix() {
			var mix = this.$store.getters.getMix;
			if(!mix) return
			this.mixCopy = JSON.parse(JSON.stringify(mix));
			return this.mixCopy;
		},
		isNowPlaying() {
			return this.$store.getters.getThisIsPlaying;
		},
		currSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
		getMix() {
			return this.$store.getters.getMix;
		},
		filterBySong() {
			if(!this.songTxt){
				return this.mix.songs
			}
				var res = this.mix.songs.filter((song) => {
					//console.log('song',song.isPlaying)
					return song.title.toLowerCase().includes(this.songTxt.toLowerCase());
				});
				console.log('@@@@@@@@@@@@@@@@@@22: ',res);
				return res;
		},
		isSongPlaying(){
			return this.$store.getters.getCurrSongIsPlaying;
		}
	},
	methods: {
		stopDrag() {
			this.$emit("updateMix", this.mixCopy);
			// this.$store.commit({ type: "resetIconsState" });
			// this.$store.commit({ type: "startSongPlaying" });
		},
		emitSongPos(songIdx, diff) {
			this.$emit("emitSongPos", { songIdx: songIdx, diff: diff });
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
		setCurrSongPlaying(song) {
			this.$store.commit({
				type: "setCurrSong",
				song,
			});
		},
		startSongPlaying(song, songs) {
			this.$store.commit({
				type: "setCurrSong",
				song,
			});
			eventBus.$emit("resume-music");
			var songs = JSON.parse(JSON.stringify(this.getMix))
			var songId = this.currSongPlaying.songUrlId;
			const idx = this.getMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			songs.songs.forEach(song => song.isPlaying = false);
			songs.songs[idx].isPlaying = true;
			this.$store.dispatch({
				type: "saveMix",
				mix: songs
			})
			socketService.emit('curr-song-playing',this.currSongPlaying);
		},
		pauseSong(song) {
			eventBus.$emit("pause-music");
			this.$store.commit({
				type:'stopSongPlaying',
				song
			})
			var songId = this.currSongPlaying.songUrlId;
			const idx = this.getMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			var updatedMix = JSON.parse(JSON.stringify(this.getMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
		},
		openInputApi(){
			this.isAdd = true;
		},
		openInputSearch(){
			this.isAdd = false;
		},
		
	},
	created() {
		// socketService.setup();
    	// socketService.emit('join room',this.roomId);
    	socketService.emit('curr-song-playing',this.currSongPlaying)
    	socketService.on('play-song',song => {
		  console.log('SONG PLAYING :',song);
		  this.$store.commit({
				type: "setCurrSong",
				song,
			});
    	})
		
	},
	components:{
		mixApiSearch,
		draggable,
		mixSocial
	},
};
</script>

