




<template>
	<section v-if="getMixes">
		<div>
			<h1>test</h1>

			<!-- <div class="list1">
                <ul>
					<li v-for="mixes in getMixes[1].songs" :key="mixes.id">
						{{mixes.title}}
                        <youtube :video-id="mixes.songUrlId" ref="youtube" @playing="playing" class="youtube-window"></youtube>
		                <button @click="playVideo">play</button>
					</li>
				</ul>
			</div>-->

			<!-- <div v-for="mixes in getMixes[1].songs" :key="mixes.id">
                {{mixes.title}}
                <youtube :video-id="mixes.songUrlId" ref="youtube" @playing="playing" class="youtube-window"></youtube>
		                <button @click="playVideo">play</button>
			</div>-->

			<!-- <div>
                            <iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+mixes.songUrlId+'?autoplay=0&showinfo=0'" frameborder="0" allow="accelerometer; autoplay;  picture-in-picture" allowfullscreen @click="play"></iframe>
			</div>-->
			<!-- <div class="list1">
                <h1>list 1</h1>
				<ul>
					<li v-for="mixes in getSongs[0].mixes" :key="mixes.id">
						<iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+mixes.songUrlId+'?autoplay=0&showinfo=0'" frameborder="0" allow="accelerometer; autoplay; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</li>
				</ul>
			</div>
			</div>-->

			<!-- <div class="container-audio">
                    <audio controls  loop autoplay>
                   <source src="" type="audio/ogg" @click="play">      
                    </audio>
			</div>-->
			<div>
				<youtube :video-id="currSongPlaying" ref="youtube" @playing="playing" class="youtube-window"></youtube>
                
			</div>
			<div>
				<ul>
					<li v-for="song in getMixes[0].songs" :key="song.id">
						{{song.title}}
						<button @click="startPlaying(song.songUrlId);playVideo()">play</button>
                        <button @click="stopVideo">pause</button>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
export default {
	data() {
		return {
			videoId: "lG0Ys-2d4MA",
			currSongPlaying: null,
		};
	},
	computed: {
		player() {
			return this.$refs.youtube.player;
		},
		getMixes() {
			return this.$store.getters.getMixesForDisplay;
		},
	},
	methods: {
		playVideo() {
			this.$refs.youtube.player.playVideo();
        },
        stopVideo(){
            this.$refs.youtube.player.stopVideo();
        },
		playing() {
			console.log("o/ we are watching!!!");
		},
		startPlaying(songUrlId) {
			this.currSongPlaying = songUrlId
		},
	},
};
</script>

<style>
</style>

// .ytp-large-play-button