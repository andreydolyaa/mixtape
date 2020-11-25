import Vue from 'vue'
import Vuex from 'vuex'


import mixStore from '../store/mixStore.js';
import userStore from '../store/userStore.js';

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    mixStore,
    userStore
  }
})
