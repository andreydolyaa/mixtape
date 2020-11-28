<template> 
	<section>
		<div class="mix-home">
			<mixHero />
			<!-- <h1>Home</h1> -->
    		<ul class="mixes-list container" v-if="geners"> 
			   <!-- <h2> Mixes </h2> class="mix-list-home" -->
                <li  v-for="(item, index) in geners" :key="item" > 
                   	<mix-list-Home v-bind:genre="geners[index]"/>
                </li>
            </ul> 

		</div>
	</section>
</template>
 
<script>
import mixListHome from '../components/mix-list-home.cmp.vue'
import mixHero from '../components/mix-hero.cmp.vue'
import mixVideo from '../components/mix-video-player.cmp.vue'
import globalPlayer from '@/components/global-player.cmp.vue';

export default {
	name:'mix-home',
	data(){
		return{
			//geners:['funk','pop','rock','electro','classic','israeli','techno','trance']
		}
	},
   components: {
		mixHero,
		mixListHome,
		mixVideo,
		globalPlayer
  },
  computed : {
	  geners(){
		  return this.$store.getters.getGeners
		  console.log('geners',this.$store.getters.getGeners)

	  } 
  },
	watch: {
			status(newValue, oldValue) {
		//console.log(`Updating from ${oldValue} to ${newValue}`);

		// Do whatever makes sense now
			if (getCurrSongPlaying.isPlaying) {
						console.log('playing')
			}else{
				console.log('Not Playing')
			}
		},
	}

};
</script>

<style>
</style>