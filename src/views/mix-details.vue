
<template>
  <div class="mix-details flex" v-if="mix">
    <div class="mix-chat">
      <h1 class="title">Mix chat</h1>
    </div>
    <div class="mix-full-info flex">
      <section class="search-song">
      <el-input type="text" placeholder="Search in mix" clearable></el-input>
      </section>
      <section class="header-mix-info flex">
        <section class="mix-img flex start">
          <!-- <img :src="mix.imgUrl" /> -->
        </section>
        <section class="mix-info">
          <h1>{{ mix.name }}</h1>
          <p>{{ mix.desc }}</p>
          <h4>{{ mix.genre }}</h4>
          <h5>
            Created by: <span><img :src="mix.createdBy.imgUrl" /></span>
            {{ mix.createdBy.fullName }}
          </h5>
          <section class="general-info">
            <!-- <h4>50 Likes</h4> -->
          </section>
        </section>
      </section>
      <section class="mix-actions-social flex space-between">
        <div class="btn-actions flex space-evenly">
          <span class="add-song"><i class="far fa-heart"></i></span> 
          <span class="mix-like"><i class="fas fa-plus-circle"></i></span>
          <input class="search-song" type="text" />
        </div>
        <!-- <button>shaffle</button> -->
        <div class="share-container flex">
          <div class="invite">
            <p>invite a friend to join you:</p>
          </div>
          <div class="mix-social-nav flex space-evenly">
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-whatsapp"></i>
          </div>
          <!-- <button>facebook share</button> -->
          <!-- <button>whatsapp share</button> -->
        </div>
      </section>
      <section class="songs-list">
        <ul>
          <li
            class="songs-details flex"
            v-for="song in mix.songs"
            :key="song.id"
          >
            <i class="far fa-play-circle"></i>
            <img :src="song.imgUrl" />
            <p>{{ song.title }}</p>
            <!-- Todo (add song-length) -->
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  computed: {
    mix() {
      return this.$store.getters.getMix;
    }
  },
  components: {
  },
  created() {
    const mixId = this.$route.params.mixId;
    //  console.log('mixId', mixId);
    this.$store.dispatch({ type: "getMixById", mixId });
  }
}

</script>
