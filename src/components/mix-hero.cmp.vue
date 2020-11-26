<template>
  <section class="hero">
    <h2>Pick a mix and join the mixTape</h2>
    <!-- <button @click="playVideo">play</button> -->

    <mix-videoPlayer />
    <!-- <mix-carousel /> -->
  </section>
</template>

<script>
import mixCarousel from "../components/mix-Carousel.cmp.vue";
import mixVideoPlayer from "../components/mix-video-player.cmp.vue";


export default {
  props:{
   
  },
  data(){
    return{
     
    }
  },
  methods: {
 
  },
  components: {
     mixCarousel,
     mixVideoPlayer
  },
  computed : {
   
  },
  created(){
    console.log('hero')
  }
}
</script>

<style>

</style>