<template>
  <section class="mixList container">
           <nav class="mixesNav">
                <div class="genreTitle"> {{genre}}</div>
                <ul class="navShowAllUl" >
                    <li class="mixLinkShowAll" v-on:click="showList(genre)">Show all</li>     
                </ul>
            </nav>

            
            <ul class="ulMixes"> 
                <li class="mix" v-for="mix in mixes" :key="mix._id" >          
                   <mixPreview :mix="mix"/>
                </li>
            </ul> 
           
  </section>
</template>

<script>
import mixPreview from '../components/mix-preview.cmp.vue';

export default {
    name:'mix-list-home',
    props:{
        genre:{
            type:String,
            default: null
        }
    },
  	data(){
	    return{
          a:null,
          videoId:'BubwLnPcQjc',
	    }
	},
  computed : {
        mixes(){
            var mixes = this.$store.getters.getMixesForDisplay
            if(!mixes) return
            //console.log('this.genre',this.getGenreToDisplay)
            if (!this.genre) return mixes
            //console.log('filter')
            var res = mixes.filter(item =>{
                //console.log('item',item.genre)
                return item.genre.toLowerCase() === this.genre.toLowerCase()
            })
            console.log('res',res)
            return res
        },
  },
  methods: {
     showList(genre){
        this.$store.commit({type: 'setGenre',genre })
        //this.genre = genre
        //console.log('genre', this.genre)
        this.$router.push(`mix/list`) 
      },  

  },
  components: {
    mixPreview
  },
  created(){
    console.log('mix data genre',this.genre)

  }
} // end of export default
</script>

<style>

</style>