<template>
  <section v-if="mix" class="details">
    <div class="mix shadow" v-on:click="onMixView(mix._id);startSong()">
      <!-- <pre>{{checkTitleLang}}</pre> -->
      <img :src="mix.imgUrl" />
      <img
        class="img-frame"
        src="https://res.cloudinary.com/hw-projects/image/upload/v1606518099/appmixes/logo_frame.png"
      />
    <!-- <div  class="info-stats">
        <span class="mix-views">{{ mix.views }} <i class="fas fa-eye"></i></span>
        <span class="mix-likes">{{ mix.likes }} <i class="fas fa-heart"></i></span>
    </div> -->

    <div class="info">
      <span class="mix-name"  :class="checkLang">{{ mix.name }}</span>
       <!-- <span class="mix-views">{{ mix.views }} <i class="fas fa-eye"></i></span> -->
        <span class="mix-likes">{{ mix.likes }} <i class="fas fa-heart"></i></span>
    </div>
    </div>
    
        <!-- <button class="preview-play-btn" @click="playMixFromPreview"><i class="fas fa-play"></i></button> -->
  </section>
</template>
 
<script>
import { eventBus } from "@/main.js";
export default {
  name: 'mix-preview',
  props: {
    mix: Object
  },
  methods: {
    onMixView(mixId) {
      //console.log('mixId',mixId)
      this.$router.push(`/mix/details/${mixId}`)
    },
    playMixFromPreview(){
      // this.$store.commit({ type: 'setMix', mix:this.mix })
      // var autoPlaySong = this.mix.songs[0];
      // this.$store.commit({
			// 	type: "setCurrSong",
			// 	song: autoPlaySong,
      // });
      // eventBus.$emit('play-music');
      // this.$store.commit({
			// 	type: "startSongPlaying",
      // });
      // var newMix = JASON.prase(JASON.stringify(this.mix.songs[0].isPlaying = true));
      // console.log('NEW MIXXXXXXXXXXXX: ', newMix);
      // this.$store.dispatch({type:'saveMix',mix:newMix});
    },
    startSong(){
			this.$store.commit({ type: "setMix", mix:this.mix });
			var autoPlaySong = this.mix.songs[0];
			this.$store.commit({
				type: "setCurrSong",
				song: autoPlaySong,
			});
			this.$store.commit({
				type: "startSongPlaying",
			});
			var updatedMix = JSON.parse(JSON.stringify(this.mix));
			updatedMix.songs[0].isPlaying = true;
			updatedMix.songs[0].title = 'Mac Miller - Good News 2010';
			console.log("@@@: ", updatedMix);
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix,
			});
    }
    
  },
  computed: {
    checkLang() {
      //console.log('this.mix.genre',this.mix.genre)
      return this.mix.genre === 'israeli' ? 'mix-name isreali' : 'mix-name'
    },
    // mixImg() {
    //   if (!this.mix) return
    //   //console.log(this.mix)

    //   //random image not in use
    //   //var max = this.mix.songs.length 
    //   //var songIdx = Math.floor(Math.random() * (max - 0) + 0);

    //   // 
    //   var song = this.mix.songs[0]
    //   var img = song.imgUrl
    //   //console.log('img',img)
    //   return img

    // },
  },
  created() {
    //console.log('mix data',this.mix)
  }
}
</script>

<style>
</style>