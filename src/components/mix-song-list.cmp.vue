<template>
	<section class="songs-list flex column">
		<!-- <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   				<div v-for="element in myArray" :key="element.id">{{element.name}}</div>
		</draggable> -->
		<div v-if="mix">
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
		<ul v-if="mix">
			<draggable v-if="mix" v-model="filterBySong" group="people" @start="drag=true" @end="stopDrag">
				<li class="songs-details-main flex" v-for="(song,index) in filterBySong" :key="song.id">
					<div class="songs-details">
						<button v-if="!song.isPlaying" @click="setCurrSongPlaying(song);startSongPlaying(song,mixCopy.songs);">
							<i class="far fa-play-circle"></i>
						</button>
						<button v-if="song.isPlaying" @click="pauseSong(song);">
							<i class="far fa-pause-circle"></i>
						</button>
						<img :src="song.imgUrl" />
						<p :class="highlight">{{ song.title }}</p>
						<span>{{ song.duration }}</span>
					</div>
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

export default {
	name: "mix-song-list",
	props: {
		songs: Array,
		//mix: Object,
	},
	data() {
		return {
			autoPlay:false,
			songId: null,
			isAdd: false,
			isPlaying: false,
			playerVars: {
				autoplay: 1,
				//origin: window.location.origin, // or http(S)://your.domain.com
				origin: "http://localhost:8080/",
			},
			mixCopy: null,
			songTxt: "",
		};
	},
	computed: {
		mix() {
			var mix = this.$store.getters.getMix;
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
				var res = this.mix.songs.filter((song) => {
					return song.title.toLowerCase().includes(this.songTxt.toLowerCase());
				});
				return res;
		},
		highlight(){
			if(this.getCurrSongPlaying){
				return this.song ? 'song-highlight' : 'song-default-color'
			}
		}
	},
	methods: {
		stopDrag() {
			this.$emit("updateMix", this.mixCopy);
			this.$store.commit({ type: "resetIconsState" });
			this.$store.commit({ type: "startSongPlaying" });
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
			eventBus.$emit("resume-music");
			this.$store.commit({
				type: "stopAllPlaying",
				song,
				songs,
			});
			this.$store.commit({
				type: "startSongPlaying",
			});
		},
		pauseSong(song) {
			eventBus.$emit("pause-music");
			this.$store.commit({
				type:'stopSongPlaying',
				song
			})
		},
		openInputApi(){
			this.isAdd = true;
		},
		openInputSearch(){
			this.isAdd = false;
		}
	},
	created() {
		
	},
	components:{
		mixApiSearch,
		draggable
	},
};
</script>

