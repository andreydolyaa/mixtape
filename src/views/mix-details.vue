
<template>
  <section class="mix-details flex" v-if="mix">
    <!-- <h2>mix details </h2> -->
    <div class="mix-chat">
      
      <!-- <h2 class="title">Mix chat</h2> -->
      <mix-chat :mixId="roomId" />
    </div>
    <div class="mix-full-info flex">
      <section class="header-mix-info flex">
        <section class="mix-img flex start">
          <form>
            <template v-if="!isLoading">
              <div class="update-img-mix">
                <label class="imgUploader" for="imgUploader">
                  <img :src="currMix.imgUrl" />
                  <span class="image-edit-button"><i class="fas fa-pen"></i></span>
                </label>
              </div>
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
            <h2 class="mix-title" v-if="!isTitleHide">
              {{ currMix.name
              }}<span @click="toggleEditTitle" class="edit-txt"
                ><i class="edit fas fa-pen"></i
              ></span>
            </h2>
            <div v-else>
              <input v-model="currMix.name" type="text" /><span
                @click.prevent="saveChange(currMix)"
                ><i class="far fa-save"></i
              ></span>
            </div>
            <p class="description" v-if="!isDescHide">
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
            <div class="mix-genre">
              <h4>{{ currMix.genre }}</h4>
              <mix-select-genre
                class="select-genre"
                v-on:selectType="setGenre"
                selectType
              />
            </div>
            <div class="stats">
              <div class="mix-views">
                <h4>{{ currMix.views }}</h4>
                <i class="fas fa-eye"></i>
              </div>
              <div class="mix-like">
                <div class="like-song">
                  <span class="likes-count">{{ currMix.likes }}</span>
                  <i @click="addLike" :class="heartMode" class="far fa-heart"></i>
                </div>
              </div>
            </div>
          </section>
          <section class="user-info">
            <h5>
              Created by: <img :src="currMix.createdBy.imgUrl" />
              {{ currMix.createdBy.fullName }}
            </h5>
          </section>
          <section class="general-info"></section>
        </section>
      </section>
      <div class="search-and-social">
          <!-- v-if="currMix.songs" -->
          <div class="songs">
            <mix-song-list 
              :songs="currMix.songs"
              :mix="currMix"
              @emitRemoveSong="removeSongFromMix"
              @emitSongPos="changeSongPos"
              @updateMix="saveChange"
            />
          </div>
          
      </div>
    </div>
  </section>
</template>

<script>
import mixPlayer from "@/components/mix-player.cmp.vue";
import mixChat from "@/components/mix-chat.cmp.vue";
import mixSongList from "@/components/mix-song-list.cmp.vue";
import mixSelectGenre from "@/components/mix-select-genre.cmp.vue";
import { uploadImg } from "@/services/imgUploadService.js";
import mixSocial from '@/components/social-mix.cmp.vue'

export default {
  data() {
    return {
      isTitleHide: false,
      isDescHide: false,
      isLoading: false,
      songTxt: '',
      currMix: '',
      newMix: {
        _id: "cerateNewId()",
        name: "Mix Name",
        desc: "Mix description",
        genre: "genre",
        isLiked: false,
        imgUrl: "https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame.jpg",
        likes: 0,
        tags: [
          "Funk",
          "Happy"
        ],
        createdBy: {
          "_id": "u101",
          "fullName": "Puki Ben David",
          "imgUrl": "http://some-photo/"
        },
        likedByUsers: [

        ],
        songs: [
          {
            title: "Mac Miller - Good News",
            id: "i6Hdm",
            songUrlId: "aIHF7u9Wwiw",
            imgUrl: "https://i.ytimg.com/vi/aIHF7u9Wwiw/default.jpg",
            addedBy: "minimal-user",
            duration: "3:21",
            isPlaying: false
          },

        ]
      }
    }
  },
  computed: {
    roomId(){
      return this.$route.params.mixId;
    },
    currSongPlaying(){
      return this.$store.getters.getCurrSongPlaying;
    },
    mix() {
      if (this.$store.getters.getMix) {
        this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));

        // this.currMix.songs[0].isPlaying = true;
        this.startSongOnPreview();
     
        return this.$store.getters.getMix;
      } else {
        this.currMix = this.newMix;
        console.log('this.currMix',this.currMix)
        return this.currMix;
      }
    },
    user() {
      var newUser = this.$store.getters.getUser;
      return newUser;
    },
    heartMode() {
      return this.currMix.isLiked ? 'fas fa-heart' : 'far fa-heart'
    },
  },
  methods: {
    startSongOnPreview(){
      if(!this.currSongPlaying){
        this.currMix.songs.forEach(song => song.isPlaying = false)
        this.currMix.songs[0].isPlaying = true
        this.$store.commit({type: "setCurrSong",song:this.currMix.songs[0]});
      }else{
        // var currSongId = this.currMix.songs.find(song => song.id === this.currSongPlaying.id);
        this.currMix.songs.forEach(song => song.isPlaying = false)
        this.currMix.songs.forEach(song => {
          if(song.id === this.currSongPlaying.id){
            song.isPlaying = true;
          }
        })
      }
    },
    changeSongPos(songNewPos) {
      var lastSong = this.currMix.songs.length
      if (songNewPos.songIdx === 0 && songNewPos.diff === -1) return
      if (songNewPos.songIdx === lastSong && songNewPos.diff === 1) return
      //console.log('songNewPos', songNewPos)
      var input = this.currMix.songs
      var from = songNewPos.songIdx
      var to = songNewPos.songIdx + songNewPos.diff
      console.log('changeSongPos', input, from, to)
      let numberOfDeletedElm = 1;
      const elm = input.splice(from, numberOfDeletedElm)[0];
      numberOfDeletedElm = 0;
      input.splice(to, numberOfDeletedElm, elm);

      this.$store.dispatch({
        type: "saveMix",
        mix:this.currMix
      });
    },
    setGenre(genre) {
      this.currMix.genre = genre;
    },
    toggleEditTitle() {
      this.isTitleHide = !this.isTitleHide;
    },
    toggleEditDesc() {
      this.isDescHide = !this.isDescHide;
    },
    saveChange(mix) {
      this.$store.dispatch({
        type: "saveMix",
        mix,
      }); 
      // const el = this.$createElement;
      // this.$notify({
      //   message: el('i', { style: 'color: green' }, 'You updated the mix')
      // });
      this.isTitleHide = false;
      this.isDescHide = false;
    },
    removeSongFromMix(songId) {
      var songIdx = this.currMix.songs.findIndex((song) => song.id === songId);
      this.currMix.songs.splice(songIdx, 1);
      this.$store.dispatch({
        type: "saveMix",
        mix: this.currMix,
      });
    },
    addLike() {
      if (this.currMix.isLiked) {
        this.currMix.isLiked = false;
        this.currMix.likes--;
        // console.log(this.currMix.likes);
        this.$store.dispatch({
          type: "saveMix",
          mix: this.currMix,
        });
      } else {
        this.currMix.isLiked = true;
        this.currMix.likes++;
        this.$store.dispatch({
          type: 'saveMix',
          mix: this.currMix
        })
        
        // const el = this.$createElement;
        // this.$notify({
        //   message: el('i', { style: 'color: green' }, 'You liked the mix')
        // });
      }
    },
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.imgUrls.push(res.url)
      if (this.currMix) {
        console.log('updating item img url')
        this.currMix.imgUrl = res.url
      }
      this.isLoading = false;
      this.$store.dispatch({
        type: 'saveMix',
        mix: this.currMix
      })
    },
    updateViews() {
      this.currMix.views++;
      this.$store.dispatch({
        type: 'saveMix',
        mix: this.currMix
      })
    }
  },
  components: {
    mixChat,
    mixSongList,
    mixPlayer,
    mixSelectGenre,
    mixSocial
  },
  async created() {
    if(this.$route.params.mixId){
      const mixId = this.$route.params.mixId;
      await this.$store.dispatch({ type: "getMixById", mixId });
      this.updateViews();
    }
    
  },
  mounted() {
  }
}

</script>

