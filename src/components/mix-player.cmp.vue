

<template>
	<section v-if="getMixes">
        <!-- //// THIS CMP IS HIDDEN !!!! -->
		<div>
			<youtube :video-id="currSongPlaying" ref="youtube" @playing="playing" class="youtube-window"></youtube>
		</div>
        <!-- //////////////////////////// -->


        <div>
            <h1 v-if="getCurrSong">Now Playing - {{getCurrSong.title}}</h1>
        </div>


		<div class="player-list">
			<ul>
				<li v-for="song in getMixes[0].songs" :key="song.id">
					{{song.title}}
					<button @click="startPlaying(song);playVideo();getSong(song.id,getMixes[0]._id)">play</button>
					<button @click="stopVideo">pause</button>
                    <input type="range" min="0" max="100" v-model="volume"  @input="changeVolume">
                    
				</li>
			</ul>
		</div>
		<globalPlayer />
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
import globalPlayer from '@/components/global-player.cmp.vue';
export default {
	data() {
		return {
            videoId: "lG0Ys-2d4MA",
            currSongTitle:'',
            currSongPlaying: null,
            volume:50,
            duration:''
		};
	},
	computed: {
		player() {
			return this.$refs.youtube.player;
		},
		getMixes() {
			return this.$store.getters.getMixesForDisplay;
		},
		getCurrSong(){
			this.$store.getters.getCurrSong;
		}
	},
	methods: {
		playVideo() {
			this.$refs.youtube.player.playVideo();
		},
		stopVideo() {
			this.$refs.youtube.player.stopVideo();
		},
		playing() {
			this.duration = this.getTime();
		},
		startPlaying(song) {
            this.currSongPlaying = song.songUrlId;
            this.currSongTitle = song.title;
        },
        changeVolume(){
            this.$refs.youtube.player.setVolume(this.volume)
        },
        async getTime(){
            this.duration = await this.$refs.youtube.player.getDuration();
            return duration;
		},
		getSong(songId,mixId){
			console.log(songId, mixId);
			this.$store.dispatch({
				type:'getSongById',
				songId,
				mixId
			})
		}
	},
	components:{
		globalPlayer
	}
};
</script>

<style>
</style>