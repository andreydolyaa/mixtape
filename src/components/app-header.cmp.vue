
<template>
  <section>
    <div class="app-header">
      <!-- <h1>app header</h1> -->
        <div class="logo" :class="isPlaying" @click="resetIcon">
          <router-link to="/" ><img class="reflect" src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame" ></router-link> 
        </div>
      <div class="user-display" v-if="user">
        Hello {{user.username}}
      </div>
        <nav>   
          <div class="nav-mix">
            <!-- <router-link to="/genres">Genres</router-link>
            <router-link to="/mixes">Mixes</router-link> -->
            <!-- <router-link to="/newMix">Create Mix</router-link> -->
          </div>
          <div class="nav-user">
            <span v-if="!user" class="nav-display" @click="onSetLogin">Login</span>
            <span v-else class="nav-display" @click="onSetLogout">Logout</span>
            <span v-if="!user" class="nav-display" @click="onSetSignup">Signup</span>
          </div>
        </nav>
    </div>
  </section>
</template>

<script>
import {eventBus} from '@/main.js'
export default {
   data() {
    return{
      
    }
  },
  methods:{
   resetIcon(){
     eventBus.$emit('reset-icons');
   },
   onSetLogin(){
     this.$store.commit({
       type: 'setLogin'
     })
   },
   onSetSignup(){
     this.$store.commit({
       type: 'setSignup'
     })
   },
   onSetLogout(){
     this.$store.dispatch({
       type: 'logout'
     })
   }
  },
  computed: {
    getCurrMix(){
      return this.$store.getters.getMix;
    },
    user(){
      return this.$store.getters.getLoggedinUser;
    },
    getCurrSong(){
      return this.$store.getters.getCurrSongPlaying;
    },
    isPlaying() {
      var currSong = this.$store.getters.getCurrSongIsPlaying;
      //return currSong
      return currSong ? 'logo-playing' : 'logo-stop'
    },
    	isLogin(){
			return this.$store.getters.getIsLogin;
		},
  }
}
</script>

<style>
.nav-display{
  color: white;
  cursor: pointer;
}
.user-display{
  color: white;
}
</style>