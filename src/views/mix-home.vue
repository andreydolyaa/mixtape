<template> 
	<section>
		<div class="mix-home">
			<mixHero />
    		<ul class="mixes-list container"> 
			   <!-- <h2> Mixes </h2>  -->
                <li class="mixes-list-li" v-for="(item, index) in geners" :key="item" > 
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

export default {
	name:'mix-home',
	data(){
		return{
			geners:['funk','pop','rock','elctro','classic']
		}
	},
   components: {
		mixHero,
		mixListHome,
		mixVideo
  },
};
</script>

<style>
</style>