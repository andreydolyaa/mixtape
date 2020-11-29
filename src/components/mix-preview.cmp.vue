<template>
  <section v-if="mix" class="details">
    <div class="mix shadow" v-on:click="onMixView(mix._id)">
      <!-- <pre>{{checkTitleLang}}</pre> -->
      <img :src="mix.imgUrl" />
      <img
        class="img-frame"
        src="https://res.cloudinary.com/hw-projects/image/upload/v1606518099/appmixes/logo_frame.png"
      />
      <div class="info">
        <span class="mix-name"  :class="checkLang">{{ mix.name }}</span>
        <span class="mix-views">{{ mix.views }}</span>
        <span class="mix-likes"
          >{{ mix.likes }}<i class="fas fa-heart"></i></span>
      </div>
    </div>
  </section>
</template>
 
<script>
export default {
  name: 'mix-preview',
  props: {
    mix: Object
  },
  methods: {
    onMixView(mixId) {
      //console.log('mixId',mixId)
      this.$router.push(`/mix/details/${mixId}`)
    },
  },
  computed: {
    checkLang() {
      //console.log('this.mix.genre',this.mix.genre)
      return this.mix.genre === 'israeli' ? 'mix-name isreali' : 'mix-name'
    },
    // mixImg() {
    //   if (!this.mix) return
    //   //console.log(this.mix)

    //   //random image not in use
    //   //var max = this.mix.songs.length 
    //   //var songIdx = Math.floor(Math.random() * (max - 0) + 0);

    //   // 
    //   var song = this.mix.songs[0]
    //   var img = song.imgUrl
    //   //console.log('img',img)
    //   return img

    // },
  },
  created() {
    //console.log('mix data',this.mix)
  }
}
</script>

<style>
</style>