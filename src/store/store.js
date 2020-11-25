import Vue from 'vue'
import Vuex from 'vuex'


import mixStore from '../store/mixStore.js';
import songStore from '../store/songStore.js';

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
    songStore
  }
})
