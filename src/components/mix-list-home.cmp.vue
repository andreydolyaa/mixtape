<template>
  <section  ref="mix-list-home" class="mix-list-home container">
          <!-- <h2>Home mix list </h2> -->
          <div ref="mix-list-home container">
            <h2>test</h2>
            <mix-preview v-if="mixTopA" :mix="mixTopA"/>

            <nav class="mixes-nav">
                  <div class="genre-title"> {{genre}}</div>
                  <ul class="nav-show-all-ul" >
                      <li class="mix-link-show-all" v-on:click="showList(genre)">
                      Show all <span><i class="fas fa-angle-double-right"></i></span></li>     
                  </ul>
              </nav>
              
              <ul class="ul-mixes"> 
                  <li class="mix" v-for="mix in mixes" :key="mix._id" >          
                    <mix-preview :mix="mix" @click.native="startAutoPlay(mix)"/>
                  </li>
              </ul>         
          </div>
  </section>
</template>

<script>
import mixPreview from '../components/mix-preview.cmp.vue';
import { eventBus } from "@/main.js";
export default {
    name:'mix-list-home',
    props:{
        genre:{
            type:String,
            default: null
        },
    },
  	data(){
	    return{
          a:null,
          videoId:'BubwLnPcQjc',
          mixTopA:null,
      }
	},
  computed : {
        mixes(){
            var mixes = this.$store.getters.getMixesForDisplay
            if(!mixes) return
            //console.log('this.genre',this.genre)
            if (!this.genre) return mixes
            //console.log('filter')
            var res = mixes.filter(item =>{
                //console.log('item',item.genre)
                return item.genre.toLowerCase() === this.genre.toLowerCase()
            })
            //console.log('res',res)
            return res
        },
       
  },
  methods: {
    startAutoPlay(mix){
      this.$store.commit({type:'setMix',mix})
      eventBus.$emit('play-music');
      this.$store.commit({type: "startSongPlaying"});
    },
     showList(genre){
        this.$store.commit({type: 'setGenre',genre })
        //this.genre = genre
        //console.log('genre', this.genre)
        this.$router.push(`mix/list`) 
      },
      startAutoPlay(){
        console.log('START AUTO PLAY');
      } , 
        getMixTopA(){
          var mix =  this.$store.dispatch({type: 'getMixByIdPrivate',mixId:'5c013' })
          console.log('mixTop',mix)
          this.mixTopA = mix
        }

  },
  components: {
    mixPreview
  },
  created(){
    //console.log('mix data genre',this.genre)
     this.getMixTopA();
  }
} // end of export default
</script>

<style>

</style>