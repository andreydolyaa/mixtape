
<template>
  <div class="mix-details flex" v-if="mix">
    <div class="mix-chat">
      <h1 class="title">Mix chat</h1>
    </div>
    <div class="mix-full-info flex">
      <section class="search-song">
      <el-input type="text" placeholder="Search in mix"></el-input>
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
          <!-- <span class="add-song"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg></span>  -->
          <!-- <span class="mix-like"><svg width="24" height="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg></span> -->
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
