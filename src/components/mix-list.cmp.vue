<template>
  <section class="mixList container">
           <nav class="mixesNav">
                <ul class="mixesNavUl">
                    <li class="mixLink" v-on:click="onListSetFilter('pop')">Pop</li>
                    <li class="mixLink" v-on:click="onListSetFilter('elctro')">Elctro</li>
                    <li class="mixLink" v-on:click="onListSetFilter('rock')">Rock</li>
                </ul>            
            </nav>
            <ul class="ulMixes"> 
              <!--  -->
                <li class="mix" v-for="mix in mixes" :key="mix._id" > 
                  <!-- <pre>{{mix.genre}}</pre> -->
                   <mixPreview :mix="mix"/>
                </li>
            </ul> 
           
  </section>
</template>

<script>
import mixPreview from '../components/mix-preview.cmp.vue';

export default {
    name:'mix-list',
    props:{
        genre:{
            type:String,
            default: null
        }
    },
  	data(){
		return{
			 a:null,
		}
	},
  computed : {
        mixes(){
            var mixes = this.$store.getters.getMixesForDisplay
            if(!mixes) return
            //console.log('this.genre',this.getGenreToDisplay)
            if (!this.getGenreToDisplay) return mixes
            //console.log('filter')
            var res = mixes.filter(item =>{
                //console.log('item',item.genre)
                return item.genre.toLowerCase() === this.getGenreToDisplay.toLowerCase()
            })
            console.log('res',res)
            return res
        },
        getGenreToDisplay(){
            console.log('this.$store.getters.getGenre',this.$store.getters.getGenreToDisplay)
            return this.$store.getters.getGenreToDisplay
        }
  },
  methods: {
     onListSetFilter(genre){
        console.log('genre',genre)
        this.$store.commit({type: 'setGenre',genre })
        console.log('genre',genre)
        //this.$router.push(`mix/list$`) 
      },  
     showList(genre){
        this.genre = genre
        console.log('genre', this.genre)
        this.$router.push(`mix/list`) 
      },  
  },
  components: {
    mixPreview
  },
  created(){
    console.log('mix data genre',this.getGenreToDisplay)

  }
} // end of export default
</script>

<style>

</style>