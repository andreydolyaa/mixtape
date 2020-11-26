

<template>
	<section>
		<div class="searchTest">
			<!-- <input type="text" v-model="keyword" /> -->
			<el-input v-model="keyword" type="text" placeholder="Search song..." clearable></el-input>
			<button @click="getSearchResults()">
				<i class="fas fa-search"></i>
			</button>
		</div>
		<div v-if="searchResults">
			<img :src="searchResults.thumbnails.default.url" alt />
			<button @click="addSongToMix()">
				<i class="fas fa-plus"></i>
			</button>
		</div>
	</section>
</template>

<script>
import { youTubeService } from "@/services/youTubeService.js";
import { mixService } from "@/services/mixService.js";

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
			var res = await youTubeService.query(this.keyword);
			this.searchResults = res;
			return this.searchResults;
		},
		addSongToMix() {
			var mixCopy = JSON.parse(JSON.stringify(this.getCurrMix));
			this.createNewSong.title = this.searchResults.title;
			this.createNewSong.songUrlId = this.searchResults.songId;
			this.createNewSong.imgUrl = this.searchResults.thumbnails.default.url;
			mixCopy.songs.unshift(this.createNewSong);
			console.log(mixCopy);

			this.$store.dispatch({
				type: "saveMix",
				mix: mixCopy,
			});
		},
	},
};
</script>

<style>
</style>