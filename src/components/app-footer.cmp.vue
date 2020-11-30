
<template>
  
  <section>
    <div class="app-footer">
       <div class="logo" :class="isPlaying" >
          <router-link to="/" ><img class="reflect" src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame" ></router-link> 
        </div>
      <h2>Created by: Andery Dolya | Eilon Shetrit | Weingarten Harel</h2>

    </div>
  </section>
</template>

<script>
export default {
 computed: {
    isPlaying() {
      var currSong = this.$store.getters.getCurrSongIsPlaying;
      console.log('currSong',currSong)
      //return currSong
      return currSong ? 'logo-playing' : 'logo-stop'
    },
  }
}
</script>

<style>

</style>