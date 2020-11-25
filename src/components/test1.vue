


<template>
  
  <section>
      <youtube video-id="NudJxxOg4Go" ref="youtube" ></youtube>
<button @click="playVideo">play</button>
  </section>
</template>

<script>
export default {
  // ...
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  },
  methods: {
    async playVideo() {
      await this.player.playVideo()
      // Do something after the playVideo command
    }
  }
}
</script>

<style>

</style>