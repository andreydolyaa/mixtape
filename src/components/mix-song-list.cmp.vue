<template>
	<section class="songs-list flex column">
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
			
		

	<!-- <vue-draggable-resizable  @dragging="onDrag" :resizable="false" :parent="true">
					</vue-draggable-resizable> -->

			<!-- <template> -->
				<!-- <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;" > -->
				
				<!-- <li  class="songs-details-main flex" v-for="(song,index) in filterBySong" :key="song.id" >
					</li> -->   
					<!-- @add="onAdd($event, true)" group:'visbility' -->
					<!-- mix -->
					<!-- {{mix}} -->
   				<draggable v-if="mix" class="list-group min-height songs-details-main" 
				:list="mix.songs" :options="{animation:200 }"  
				:element="'ul'" @change="update">
					
					<li class="list-group-item" v-for="(song, index) in mix.songs" :key="song.id" :data-id="song.id">
						
						<div class="song-container">

							<div class="songs-details">
								<button v-if="!song.isPlaying" @click="setCurrSongPlaying(song);startSongPlaying(song,filterBySong)">
									<i class="fas fa-play"></i>
								</button>
								<button v-else @click="pauseSong(song);">
									<i  :class="song.isPlaying  ? 'highlight-color' : 'default-color'" class="fas fa-pause"></i>
								</button>					
								<img :src="song.imgUrl" />						
								
								<p :class="song.isPlaying  ? 'highlight-color' : 'default-color'">{{ song.title }}</p>

								<span class="song-duration">{{ song.duration }}</span>
							</div>
							
							<div class="actions">
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
							</div>
						</div>
					</li>
            	</draggable>
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
			equalizer: '',
			songsListDragable: null,
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
			// var mix = this.$store.getters.getMix;
			var mix = this.mix;
			console.log('mix',mix)
			if(!mix) return
			var mixCopy = JSON.parse(JSON.stringify(mix));
			if(!this.songTxt){
				return mixCopy.songs
			}
			return mixCopy.songs.filter((song) => {
				//console.log('song',song.isPlaying)
				return song.title.toLowerCase().includes(this.songTxt.toLowerCase());
			});
		},
		isSongPlaying(){
			return this.$store.getters.getCurrSongIsPlaying;
		}
	},
	methods: {
		onAdd(event, visible) {
				let id = event.item.getAttribute('data-id');
				console.log('id',id)

            },
		update() {
			this.filterBySong.map((songs, index) => {
				songs.order = index + 1;
			})
			this.$store.dispatch({
				type: "saveMix",
				mix: this.mix
			})
			socketService.emit('mix-updated', this.mix);
			console.log('filterBySong', this.mix)
		
		},
		onResize: function (x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
			},
			onDrag: function (x, y) {
			this.x = x
			this.y = y
		},
		stopDrag(songIdx) {
			console.log('stopDrag',this.filterBySong,songIdx)
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
			socketService.emit('set-song-playing',this.currSongPlaying);
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
			socketService.emit('pause-song-playing',this.currSongPlaying);
		},
		openInputApi(){
			this.isAdd = true;
		},
		openInputSearch(){
			this.isAdd = false;
		},
		
	},
	created() {
		socketService.setup();
        // socketService.emit('join room',this.room);
    	// socketService.emit('set-song-playing',this.currSongPlaying)
    	socketService.on('play-song',song => {
			this.$store.commit({
				type: "setCurrSong",
				song,
			});
		})
		socketService.on('song-time', currTimePlaying => {
				eventBus.$emit('song-time',currTimePlaying);
		})

		socketService.on('pause-song',currSong => {
			eventBus.$emit('pause-music');
		})
		
		
	},
	components:{
		mixApiSearch,
		draggable,
		mixSocial
	},
};
</script>

<style>

.draggable{
width: 100% !important;
height: 40px !important;
}
</style>

