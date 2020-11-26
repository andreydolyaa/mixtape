<template>
   <section class="songs-list">
        <ul>
          <li
            class="songs-details-main flex"
            v-for="song in songs"
            :key="song.id"
          >
          <div class="songs-details">
            <i class="far fa-play-circle"></i>
            <img :src="song.imgUrl" />
            <p>{{ song.title }}</p>
            <span>{{ song.duration }}</span>
          </div>
            <span class="delete-song" @click="emitSongId(song.id)"><i class="far fa-trash-alt"></i></span>
          </li>
        </ul>
      </section>
</template>

<script>

export default {
  name: 'mix-song',
  props: {
    songs: Array,
    mix: Object

  },
  data() {
    return {


    }
  },
  computed: {

  },
  methods: {
    emitSongId(songId){
        this.$emit('emitRemoveSong',songId)
    }
  },
  created() {
    // console.log('mix data', this.mixes)

  }
} 
</script>

