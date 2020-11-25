

<template>
  <section v-if="mix" class="details">
   <div class="mix">
      <!-- <pre>{{mix}}</pre> -->
      <img :src="mixImg" />
      <div class="info name">{{mix.name}} </div>

   </div>
  </section>
</template>

<script>
export default {
  props:{
    mix:Object
  },
  computed : {
    mixImg(){
            if(!this.mix) return
            console.log(this.mix)
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