<template>
  <section class="hero">
    <h2>Pick a mix and join the mixTape</h2>
    <mixCarousel />
  </section>
</template>

<script>
import mixCarousel from "../components/mix-Carousel.cmp.vue";


export default {
  props:{
   
  },
  components: {
     mixCarousel
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