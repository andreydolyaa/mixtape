<template>
	<section ref="mix-list-home" class="mix-list-home container">
		<!-- <h2>Home mix list </h2> -->
		<!-- mark -->
		<div ref="mix-list-home container">
			<nav class="mixes-nav">
				<div class="genre-title">{{ genre }}</div>
				<ul class="nav-show-all-ul">
					<li class="mix-link-show-all" v-on:click="showList(genre)">
						Show all
						<span>
							<i class="fas fa-angle-double-right"></i>
						</span>
					</li>
				</ul>
			</nav>

			<ul class="ul-mixes">
				<li class="mix" v-for="mix in mixes" :key="mix._id" >
					<mix-preview :mix="mix" />
					<!-- <button @click="startSong(mix)">play</button> -->
					
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import mixPreview from "../components/mix-preview.cmp.vue";
import { eventBus } from "@/main.js";
import { mixService } from "@/services/mixService.js";
export default {
	name: "mix-list-home",
	props: {
		genre: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			a: null,
			videoId: "BubwLnPcQjc",
			mixTopA: null,
			currMix:''
		};
	},
	computed: {
		currSongPlaying(){
      		return this.$store.getters.getCurrSongPlaying;
    	},
		mixes() {
			var mixes = this.$store.getters.getMixesForDisplay;
			if (!mixes) return;
			//console.log('this.genre',this.genre)
			if (!this.genre) return mixes;
			//console.log('filter')
			var res = mixes.filter((item) => {
				//console.log('item',item.genre)
				return item.genre.toLowerCase() === this.genre.toLowerCase();
			});
			//console.log('res',res)
			return res;
		},
		getMix() {
			return this.$store.getters.getMix;
		},
	},
	methods: {
		showList(genre) {
			this.$store.commit({ type: "setGenre", genre });
			//this.genre = genre
			//console.log('genre', this.genre)
			this.$router.push(`mix/list`);
		},
		// startMusic(mix){
		// 	// this.$store.commit({ type: "setMix", mix });
		// 	if(this.currSongPlaying){
		// 		return
		// 	}else{
		// 		var autoPlaySong = mix.songs[0];
		// 		this.$store.commit({
		// 			type: "setCurrSong",
		// 			song: autoPlaySong,
		// 		});
		// 		this.$store.commit({
		// 			type: "startSongPlaying",
		//   });
		// 	}
		// }
	},
	components: {
		mixPreview,
	},
	created() {
		// eventBus.$on('reset-icons',()=>{
		// 	var mixCopy = JSON.parse(JSON.stringify(this.getMix));
			
		// 	mixCopy.songs.forEach(song => {
		// 		if(song.id !== this.currSongPlaying.id){
		// 			song.isPlaying = false;
		// 		}
		// 		this.$store.dispatch({
		// 		type: "saveMix",
		// 		mix: mixCopy
		// 	})
		// 	});
			
		// })
	},
}; // end of export default
</script>

<style>
</style>

