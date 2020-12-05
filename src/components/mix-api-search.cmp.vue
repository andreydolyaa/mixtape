

<template>
	<section>
		<div class="searchTest">
			<!-- @keyup.enter="getSearchResults()" -->
			<!-- <input type="text" v-model="keyword" /> -->
			<form @submit.prevent="getSearchResults()">
			<el-input v-model="keyword" type="text" placeholder="Add song to mix..." clearable></el-input>
			</form>
			<span @click="getSearchResults()">
				<i class="fas fa-search"></i>
			</span>
		</div>
		<!-- <div class="searchResults" v-if="searchResults">
			<p>{{searchResults.title}}</p>
			<img :src="searchResults.thumbnails.default.url" alt />
			<button @click="addSongToMix()">
				<i class="fas fa-plus"></i>
			</button>
		</div> -->
		<div class="searchResults" v-if="searchResults">
			<ul>
				<li v-for="result in searchResults" :key="result.id.videoId">
					<p>{{result.snippet.title}}</p>
					<img :src="result.snippet.thumbnails.default.url">
					<button @click.prevent="addSongToMix(result)">
						<i class="fas fa-plus"></i>
					</button>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { youTubeService } from "@/services/youTubeService.js";
import { mixService } from "@/services/mixService.js";
import socketService from "@/services/socketService.js";
import { eventBus } from "@/main.js";
export default {
	data() {
		return {
			keyword: "",
			searchResults: null,
			createNewSong: mixService.createNewSong(),
			currMix: "",
		};
	},
	computed: {
		getCurrMix() {
			this.currMix = this.$store.getters.getMix;
			return this.currMix;
		},
	},
	methods: {
		async getSearchResults() {
			if(this.keyword === '') return;
			var res = await youTubeService.query(this.keyword);
			this.searchResults = res;
			console.log('SERACH RESULT : ',this.searchResults);
			return this.searchResults;
		},
		addSongToMix(result) {
			console.log('THIS SONG' ,result);
			console.log('ADD SONG BUTTON CLICKED');
			var mixCopy = JSON.parse(JSON.stringify(this.getCurrMix));
			this.createNewSong.title = result.snipprt.title;
			this.createNewSong.songUrlId = result.id.videoId;
			this.createNewSong.imgUrl = result.snippet.thumbnails.default.url;
			mixCopy.songs.unshift(this.createNewSong);
			console.log(mixCopy);

			this.$store.dispatch({
				type: "saveMix",
				mix: mixCopy,
			});
			socketService.emit('mix-updated',mixCopy);
			this.createNewSong = mixService.createNewSong();
		},
	},
	created(){
    	
	}
};
</script>

<style>
</style>