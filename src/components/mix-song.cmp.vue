<template>
	<section class="songs-list">
		<div >
			<youtube :video-id="songId" ref="youtube" @playing="playing" class="youtube-window"></youtube>
		</div>
		<ul>
			<li class="songs-details-main flex" v-for="song in songs" :key="song.id">
				<div class="songs-details">
					<button @click="play(song.id)">
						<i class="far fa-play-circle"></i>
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
import {mixService} from '@/services/mixService.js';
export default {
	name: "mix-song",
	props: {
		songs: Array,
		mix: Object,
		// refs:Object
	},
	data() {
		return {
      songId:null
    };
	},
	computed: {
		async player() {
			return this.$refs.youtube.player;
		},
	},
	methods: {
		emitSongId(songId) {
			this.$emit("emitRemoveSong", songId);
		},
		async play(songId) {
      // await this.$refs.youtube.player;
      var res = this.mix.songs.find(song => song.id === songId);
      this.songId = res.songUrlId
      return await this.$refs.youtube.player.playVideo();
      // console.log(this.$refs);
      // return res;
		},
		stopVideo() {
			this.$refs.youtube.player.stopVideo();
			
		},
		playing() {
			// this.duration = this.getTime();
		},
	},
	created() {
    // console.log('mix data', this.mixes)
	},
};
</script>

