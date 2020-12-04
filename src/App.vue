<template>
	<div id="app">
		<mix-login v-if="isLogin" class="centered" />
      	<mix-signup v-if="isSignup" class="centered" />
		<appHeader />
		<router-view />
		<div class="global">
        	<globalPlayer />
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
	props:{
		
	},
	created(){
		this.$store.dispatch({
			type:'loadMixes'
		})
		
	},
	computed:{
		currentRouteName() {
        	return this.$store.getters.currentRouteName
		},
		isLogin(){
			return this.$store.getters.getIsLogin;
		},
		isSignup(){
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
