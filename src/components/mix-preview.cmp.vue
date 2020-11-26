

<template>
  <section v-if="mix" class="details">
   <div class="mix" v-on:click="onMixView(mix._id)">
      <!-- <pre>{{mix}}</pre> -->
      <img :src="mixImg" />
      <div class="info-name">
          <span>{{mix.name}}</span>
          <span>{{mix.likes}}<i class="fas fa-heart"></i></span>
      </div>
   </div>
  </section>
</template>

<script>
export default {
  name:'mix-preview',
  props:{
    mix:Object
  },
  methods:{
     onMixView(mixId){
       console.log('mixId',mixId)
       this.$router.push(`mix/details/${mixId}`) 
      },      
  },
  computed : {
    mixImg(){
            if(!this.mix) return
            //console.log(this.mix)
             var max = this.mix.songs.length 
             var songIdx = Math.floor(Math.random() * (max - 0) + 0);
             var song = this.mix.songs[songIdx]
             var img = song.imgUrl
             //console.log('img',max,songIdx,img)
             return img
             
         },
  },
  created(){
    //console.log('mix data',this.mix)
  }
}
</script>

<style>

</style>