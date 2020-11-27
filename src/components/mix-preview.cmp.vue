<template>
  <section v-if="mix" class="details shadow">
   <div class="mix" v-on:click="onMixView(mix._id)">
      <!-- <pre>{{mix}}</pre> -->
      <img :src="mixImg" />
      <div class="info">
          <span class="mix-name">{{mix.name}}</span>
          <span class="mix-likes">{{mix.likes}}<i class="fas fa-heart"></i></span>
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

             //random image not in use
             //var max = this.mix.songs.length 
             //var songIdx = Math.floor(Math.random() * (max - 0) + 0);
             
             // 
             var song = this.mix.songs[0]
             var img = song.imgUrl
             console.log('img',img)
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