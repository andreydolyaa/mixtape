<template>
  <section>
    <div class="mix-app">
      <!-- <h1>mix app</h1> -->

      <mix-login v-if="isLogin" class="centered" />
      <mix-signup v-if="isSignup" class="centered" />
      <mix-home />
    </div>
  </section>
</template>

<script>
import mixHome from '../views/mix-home.vue';
import mixLogin from '../views/mix-login.vue';
import mixSignup from './mix-signup.vue';


export default {
	data(){
		return{
		
		}
	},
	computed:{
		isLogin(){
			return this.$store.getters.getIsLogin;
		},
		isSignup(){
			return this.$store.getters.getIsSignup;
		},
	},
  components: {
    mixHome,
    mixLogin,
    mixSignup
  },
};
</script>

<style>
</style>