<template>
	<section>
		<div class="mixHome">
			<!-- <h1>mix Home</h1> -->
			<mixHero />
    		<ul> 
              <!--  -->
			   <h2> Mixes </h2> 
                <li v-for="mix in 8" :key="mix._id" >
                    
                   	<mixList/>
                </li>
            </ul> 
			

		</div>
	</section>
</template>

<script>

import mixList from '../components/mix-list.cmp.vue'
import mixHero from '../components/mix-hero.cmp.vue'

export default {
	name:'mix-home',
   components: {
		mixHero,
		mixList,
  },
};
</script>

<style>
</style>