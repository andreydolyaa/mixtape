<template>
  <section class="video">
   <h1>video</h1>
   <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars"  @playing="playing"></youtube>
  <button @click="playVideo">play</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA',
      playerVars: {
        autoplay: 1
      }
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      console.log('\o/ we are watching!!!')
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  }
}
</script>

<style>

</style>