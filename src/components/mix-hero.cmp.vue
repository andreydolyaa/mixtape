<template>
  <section class="hero">
    <div class="hero-text-area">
    <h2>Pick a mix and join the mixTape</h2>
    <div class="buttons">
      <a class="button start-listening" @click="scrollMeTo('mix-list-home')">Start listening</a>
      <a class="button create-playlist" @click="createNewPlaylist()">Create PLaylist</a>
    </div>
    </div>
    <!-- <mix-video-player /> -->
    <mix-carousel />
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
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      console.log('element',element,this.$refs)
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
    createNewPlaylist(){
      this.$router.push(`mix/details`) 
    }
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