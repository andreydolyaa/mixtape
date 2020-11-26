<template>
	<section>
		<div class="mixHome">
			<!-- <h1>mix Home</h1> -->
			<!-- <mixVideo /> -->
			<mixHero />
    		<ul class="mixesList container"> 
              <!--  -->
			   <!-- <h2> Mixes </h2>  -->
                <li class="mixesListLi" v-for="(item, index) in geners" :key="item" > 
                   	<mixListHome v-bind:genre="geners[index]"/>
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