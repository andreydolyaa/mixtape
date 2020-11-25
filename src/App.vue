<template>
	<div id="app">
		<appHeader />
		<router-view />
		<appFooter />
	</div>
</template>

<script>
import appHeader from "@/components/app-header.vue";
import appFooter from "@/components/app-footer.vue";
import { mixService } from "@/services/mixService.js";
import {songService} from '@/services/songService.js'

export default {
	created(){
		this.$store.dispatch({
			type:'loadSongs'
		})
	},
	components: {
		appHeader,
		appFooter,
	},
};
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #b9cee2;
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
