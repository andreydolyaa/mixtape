import Vue from 'vue'
import VueRouter from 'vue-router'
import mixApp from '../views/mix-app.vue';
import mixDetails from '../views/mix-details.vue';
import mixEdit from '../views/mix-edit.vue';
import mixLogin from '../views/mix-login.vue';
import mixSignup from '../views/mix-signup.vue';
import test from '../components/test.vue';
import searchTest from '../components/searchTest.vue';
import mixList from '../components/mix-list.cmp.vue';
import mixPlayer from '../components/mix-player.cmp.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component:mixApp
  },
  {
    path:'/login',
    component:mixLogin
  },
  {
    path:'/signup',
    component:mixSignup
  },
  {
    path:'/mix/list',
    component:mixList
  },
  {
    path:'/test',
    component:mixPlayer
  },
  {
    path:'/test1',
    component:searchTest
  },
  {
    path:'/mix/details/:mixId',
    component:mixDetails
  },
  {
    path:'/mix/edit/:mixId',
    component:mixEdit
  },
  
]

const router = new VueRouter({
  routes
})

export default router
