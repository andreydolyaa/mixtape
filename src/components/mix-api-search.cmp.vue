

<template>
	<section>
		<div class="searchTest">
			<input type="text" v-model="keyword" />
			<button @click="getSearchResults()">search</button>
		</div>
        <div v-if="searchResults">

			{{searchResults.title}}
            <img :src="searchResults.thumbnails.default.url" alt="">
			<button>
				<i class="fas fa-plus"></i>
			</button>
        </div>
            
			
	</section>
</template>

<script>
import { youTubeService } from "@/services/youTubeService.js";

export default {
	data() {
		return {
			keyword: "",
            searchResults: null,
		};
	},
	methods: {
		async getSearchResults() {
			var res = await youTubeService.query(this.keyword);
            this.searchResults = res;
			return this.searchResults;
        },

	},
};
</script>

<style>
</style>