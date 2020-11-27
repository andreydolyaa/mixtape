
<template>
  <div class="mix-details flex" v-if="mix">
    <div class="mix-chat">
      <!-- <h2 class="title">Mix chat</h2> -->
      <mix-chat />
    </div>
    <div class="mix-full-info flex">
      <mixApiSearch />
      <section class="header-mix-info flex">
        <section class="mix-img flex start">
          <form>
            <template v-if="!isLoading">
              <label for="imgUploader">
                <img :src="currMix.imgUrl" />
              </label>
              <input
                type="file"
                name="img-uploader"
                id="imgUploader"
                @change="onUploadImg"
                hidden
              />
            </template>
            <img
              class="loader"
              v-else
              src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            />
            <!-- <i class="fas fa-pen"></i> -->
          </form>
        </section>
        <section class="mix-info-main">
          <section class="mix-info">
            <h2 v-if="!isTitleHide">
              {{ currMix.name
              }}<span @click="toggleEditTitle" class="edit-txt"
                ><i class="fas fa-pen"></i
              ></span>
            </h2>
            <div v-else>
              <input v-model="currMix.name" type="text" /><span
                @click.prevent="saveChange(currMix)"
                ><i class="far fa-save"></i
              ></span>
            </div>
            <p v-if="!isDescHide">
              {{ currMix.desc }}
              <span @click="toggleEditDesc"><i class="fas fa-pen"></i></span>
            </p>
            <div v-else>
              <textarea
                v-model="currMix.desc"
                name="desc"
                id="desc"
                cols="30"
                rows="10"
              ></textarea
              ><span @click="saveChange(currMix)"
                ><i class="far fa-save"></i
              ></span>
            </div>
            <h4>{{ currMix.genre }}</h4>
            <div class="like">
              <div class="like-song">
                <i @click="addLike" :class="heartMode" class="far fa-heart"></i>
              </div>
            </div>
            <span>{{ currMix.likes }}</span>
          </section>
          <section class="user-info">
            <h5>
              Created by: <img :src="currMix.createdBy.imgUrl" />
              {{ currMix.createdBy.fullName }}
            </h5>
          </section>
          <section class="general-info">
          </section>
        </section>
      </section>
      <div class="seach-song-and-social">
        <section class="search-song">
          <el-input
            type="text"
            placeholder="Search song..."
            clearable
          ></el-input>
        </section>
        <section class="mix-actions-social flex space-between">
          <!-- <div class="btn-actions flex space-evenly">
          <span class="mix-like"><i class="fas fa-plus-circle"></i></span>
          <el-input class="search-song" type="text" placeholder="Search in mix" clearable></el-input>
          </div> -->
          <!-- <button>shaffle</button> -->
          <div class="share-container flex">
            <div class="invite">
              <p>invite a friend to join you:</p>
            </div>
            <div class="mix-social-nav flex space-evenly">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-whatsapp"></i>
            </div>
          </div>
        </section>
      </div>
      <mix-song
        :songs="currMix.songs"
        :mix="currMix"
        @emitRemoveSong="removeSongFromMix"
      />
    </div>

  </div>
</template>

<script>
import mixPlayer from '@/components/mix-player.cmp.vue';
import mixApiSearch from '@/components/mix-api-search.cmp.vue';
import mixChat from '@/components/mix-chat.cmp.vue';
import mixSong from '@/components/mix-song.cmp.vue';
import { uploadImg } from '@/services/imgUploadService.js';
export default {
  data() {
    return {
      isTitleHide: false,
      isDescHide: false,
      // isLiked: false,
      isLoading: false,
      songTxt: '',
      currMix: '',
    }
  },
  computed: {
    mix() {
      this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
      return this.$store.getters.getMix
    },
    user() {
      var newUser = this.$store.getters.getUser;
      console.log(newUser)
      return newUser
    },
    heartMode() {
      return this.currMix.isLiked ? 'fas fa-heart' : 'far fa-heart'
    }
  },
  methods: {
    toggleEditTitle() {
      this.isTitleHide = !this.isTitleHide;
    },
    toggleEditDesc() {
      this.isDescHide = !this.isDescHide;
    },
    saveChange(mix) {
      this.$store.dispatch({
        type: 'saveMix',
        mix
      });
      this.isTitleHide = false;
      this.isDescHide = false;
    },
    removeSongFromMix(songId) {
      var songIdx = this.currMix.songs.findIndex(song => song.id === songId);
      this.currMix.songs.splice(songIdx, 1);
      this.$store.dispatch({
        type: 'saveMix',
        mix: this.currMix
      })
    },
    addLike() {
      if (this.currMix.isLiked) {
        this.currMix.isLiked = false;
        this.currMix.likes--;
        console.log(this.currMix.likes);
        this.$store.dispatch({
          type: 'saveMix',
          mix: this.currMix
        })
      }
      else {
        this.currMix.isLiked = true;
        this.currMix.likes++;
        this.$store.dispatch({
          type: 'saveMix',
          mix: this.currMix
        })
      }
    },
    async onUploadImg(ev) {
        this.isLoading = true;
        const res = await uploadImg(ev);
        console.log('res:', res.url)
        this.imgUrls.push(res.url)
        if(this.currMix){
            console.log('updating item img url')
            this.currMix.imgUrl = res.url
        }
        this.isLoading = false;
         this.$store.dispatch({
          type: 'saveMix',
          mix: this.currMix
        })
    },
  },
  components: {
    mixApiSearch,
    mixChat,
    mixSong,
    mixPlayer,

  },
  created() {
    const mixId = this.$route.params.mixId;
    this.$store.dispatch({ type: "getMixById", mixId });
  },
}

</script>

<style lang="css" scoped>
.mix-details {
  color: #ffffff;
}
</style>