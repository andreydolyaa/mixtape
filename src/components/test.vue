




<template>
	<section v-if="getMixes">
		<div>
			<h1>test</h1>


            <div class="list1">
                <ul>
					<li v-for="mixes in getMixes[0].songs" :key="mixes.id">
						{{mixes.title}}
                        <button @click="play">play</button>

                        <div>
                            <iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+mixes.songUrlId+'?enablejsapi=1&autoplay=0&showinfo=0'" frameborder="0" allow="accelerometer; autoplay; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>


					</li>
				</ul>
            </div>


			<!-- <div class="list1">
                <h1>list 1</h1>
				<ul>
					<li v-for="mixes in getSongs[0].mixes" :key="mixes.id">
						<iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+mixes.songUrlId+'?autoplay=0&showinfo=0'" frameborder="0" allow="accelerometer; autoplay; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</li>
				</ul>
			</div>
            </div> -->

                 <!-- <div class="container-audio">
                    <audio controls  loop autoplay>
                   <source src="" type="audio/ogg" @click="play">      
                    </audio>
                 </div>  -->

                 



		</div>
	</section>
</template>

<script>
import {mixService} from '@/services/mixService.js';
export default {
	data() {
		return {
            playOn:'0'
		};
	},
	computed: {
		getMixes() {
			return this.$store.getters.getMixesForDisplay;
        },
	},
	methods: {
        play(){
            var btn = document.querySelector('.ytp-large-play-button');
        }
    },
};
</script>

<style>
</style>

// .ytp-large-play-button