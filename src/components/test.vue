




<template>
	<section v-if="getSongs">
		<div>
			<h1>test</h1>


            <div class="list1">
                <ul>
					<li v-for="songs in getSongs[0].songs" :key="songs.id">
						{{songs.title}}
                        <div>
                            <iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+songs.songUrlId+'?autoplay=0&showinfo=0'" frameborder="0" allow="accelerometer; autoplay; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
					</li>
				</ul>
            </div>





			<!-- <div class="list1">
                <h1>list 1</h1>
				<ul>
					<li v-for="songs in getSongs[0].songs" :key="songs.id">
						<iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+songs.songUrlId+'?autoplay=0&showinfo=0'" frameborder="0" allow="accelerometer; autoplay; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</li>
				</ul>
			</div>
            </div> -->



                 <div class="container-audio">
                    <audio controls  loop autoplay>
                   <source src="" type="audio/ogg" @click="play">      
                    </audio>
                 </div> 

                 


			<!-- <div class="list2">
                <h1>list 2</h1>
				<ul>
					<li v-for="songs in getSongs[1].songs" :key="songs.id">
						<iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+songs.songUrlId" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</li>
				</ul>
			</div> -->



            <!-- <div>
                <ul>
					<li v-for="songs in getSongs[0].songs" :key="songs.id">
                        
						<h1>{{songs.title}}</h1>
                        {{songs.id}}
                        <button @click="getSongById(songs.id)">PLAY</button>
					</li>
				</ul>
            </div>
            {{getSong}} -->
			<!-- <pre>

                {{getSongs.songs}}

			</pre>-->
		</div>
	</section>
</template>

<script>
import songService from '@/services/songService.js';
export default {
	data() {
		return {
            txt: "ff",
            song:null,
		};
	},
	computed: {
		getSongs() {
			return this.$store.getters.getSongsForDisplay;
        },
        getSong(){
            return this.$store.getters.getSongForDisplay;
        }
	},
	methods: {
        play(){
            console.log('play');
        },
        getSongById(songId){
            this.$store.dispatch({
                type:'getSong',
                songId:songId,
                
            })
        }
    },
};
</script>

<style>
</style>