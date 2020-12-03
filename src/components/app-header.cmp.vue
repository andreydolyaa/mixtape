
<template>
  <section>
    <div class="app-header">
      <!-- <h1>app header</h1> -->
      <div class="logo" :class="isPlaying" @click="resetIcon">
        <router-link to="/">
          <img
            class="reflect"
            src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame"
          />
          
        </router-link>
        <router-link to="/">
        <h2 class="brand-name">mixTape</h2>
         </router-link>
      </div>
      <div class="user-display" v-if="user">Hello {{ user.username }}</div>
      <nav class="main-nav">
        <!-- <div class="nav-mix"> -->
          <!-- <router-link to="/genres">Genres</router-link>
            <router-link to="/mixes">Mixes</router-link> -->
          <!-- <router-link to="/newMix">Create Mix</router-link> -->
        <!-- </div> -->
        <div class="nav-user">
          <el-menu
            default-active="2"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <span class="user-avater"
                  ><i class="fas fa-user-circle"></i
                ></span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-if="!user" @click="onSetLogin" index="1-1"
                  >Login</el-menu-item
                >
                <el-menu-item v-else @click="onSetLogout" index="1-1"
                  >Logout</el-menu-item
                >
                <el-menu-item v-if="!user" @click="onSetSignup" index="1-2"
                  >Signup</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <!-- <span v-if="!user" class="nav-display" @click="onSetLogin"
            >Login</span
          > -->
          <!-- <span v-else class="nav-display" @click="onSetLogout">Logout</span> -->
          <!-- <span v-if="!user" class="nav-display" @click="onSetSignup"
            >Signup</span
          > -->
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { eventBus } from '@/main.js'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    resetIcon() {
      eventBus.$emit('reset-icons');
    },
    onSetLogin() {
      this.$store.commit({
        type: 'setLogin'
      })
    },
    onSetSignup() {
      this.$store.commit({
        type: 'setSignup'
      })
    },
    onSetLogout() {
      this.$store.dispatch({
        type: 'logout'
      })
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  },
  computed: {
    getCurrMix() {
      return this.$store.getters.getMix;
    },
    user() {
      return this.$store.getters.getLoggedinUser;
    },
    getCurrSong() {
      return this.$store.getters.getCurrSongPlaying;
    },
    isPlaying() {
      var currSong = this.$store.getters.getCurrSongIsPlaying;
      //return currSong
      return currSong ? 'logo-playing' : 'logo-stop'
    },
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
  }
}
</script>

<style s>
.user-display {
  color: white;
}
</style>