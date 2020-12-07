
<template>
  
  <section>
    <div class="app-footer">
       <div class="logo" :class="isPlaying" >
          <router-link to="/" ><img class="reflect" src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame" ></router-link> 
        </div>
      <h2>Created by: Andery Dolya <span><i class="fab fa-linkedin"></i></span> <span><i class="fab fa-github"></i></span> | Eilon Shetrit <span><i class="fab fa-linkedin"></i></span> <span><i class="fab fa-github"></i></span> | Harel Weingarten <span><i class="fab fa-linkedin"></i></span> <span><i class="fab fa-github"></i></span></h2>

    </div>
  </section>
</template>

<script>
export default {
 computed: {
    isPlaying() {
      var currSong = this.$store.getters.getCurrSongIsPlaying;
      //return currSong
      return currSong ? 'logo-playing' : 'logo-stop'
    },
  }
}
</script>

<style>

</style>