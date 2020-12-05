<template>
  <div id="app">
    <mix-login v-if="isLogin" class="centered" />
    <mix-signup v-if="isSignup" class="centered" />
    <appHeader />
    <img
      v-if="isLoading"
      class="loader"
      src="https://res.cloudinary.com/hw-projects/image/upload/v1606477296/appmixes/logo_r_animated_v3.gif"
    />
    <div v-else>
      <router-view />
      <div class="global">
        <globalPlayer />
      </div>
    </div>
  </div>
</template>
    
<script>
import mixLogin from '@/views/mix-login.vue';
import mixSignup from '@/views/mix-signup.vue';
import appHeader from "@/components/app-header.cmp.vue";
import appFooter from "@/components/app-footer.cmp.vue";
import { mixService } from "@/services/mixService.js";
import globalPlayer from '@/components/global-player.cmp.vue';


export default {
  props: {

  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    this.isLoading = true
    this.$store.dispatch({
      type: 'loadMixes'
    })

  },
  mounted() {
    setInterval(() => {
      this.isLoading = false;
    }, 2000);
  },
  computed: {
    currentRouteName() {
      return this.$store.getters.currentRouteName
    },
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
    isSignup() {
      return this.$store.getters.getIsSignup;
    },
  },
  components: {
    mixLogin,
    mixSignup,
    appHeader,
    appFooter,
    globalPlayer
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  .loader {
    img {
      width: 50px;
    }
  }
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
// }
// }
</style>
