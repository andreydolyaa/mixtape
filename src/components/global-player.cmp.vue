


<template>
  <section>

      <div class="global-player">
          <h1 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h1>
          <button @click="play">play</button>
          <button @click="stop">Pause</button>
      </div>
      
  </section>

</template>

<script>
import {eventBus,STOP_MUSIC} from '@/main.js';
export default {
    props:{
        refs:Object
    },
    data(){
        return{
            isPlaying:false
        }
    },
    methods:{

    },
    computed:{
        getCurrSongPlaying(){
            return this.$store.getters.getCurrSongPlaying;
        },
    },
    methods:{
        stop(){
            this.refs.youtube.player.stopVideo();
        },
        play(){
            this.refs.youtube.player.startVideo();
        }
    }
}
</script>

<style>

</style>