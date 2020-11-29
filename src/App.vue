<template>
	<div id="app">
		<appHeader />
		<router-view />
					
					
		<appFooter />
		<div class="global">
          				<globalPlayer />
    				</div>
	</div>
</template>
 
<script>
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
		
	},
	components: {
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
