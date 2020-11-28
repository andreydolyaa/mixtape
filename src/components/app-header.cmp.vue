
<template>
  <section>
    <div class="app-header">
      <!-- <h1>app header</h1> -->
        <div class="logo" :class="isPlaying" >
          <span style="color:#fff">{{isPlaying}}</span>
          <router-link to="/" ><img class="reflect" src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame" ></router-link> 
        </div>
        <nav>   
          <div class="nav-mix">
            <router-link to="/genres">Genres</router-link>
            <router-link to="/mixes">Mixes</router-link>
            <!-- <router-link to="/newMix">Create Mix</router-link> -->
          </div>
          <div class="nav-user">
            <router-link to="/login">Login</router-link>
            <router-link to="/signup">Signup</router-link>
          </div>
        </nav>
    </div>
  </section>
</template>

<script>
export default {
   data() {
    return{
      
    }
  },
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