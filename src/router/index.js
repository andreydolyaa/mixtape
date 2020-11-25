import Vue from 'vue'
import VueRouter from 'vue-router'
import mixApp from '../views/mix-app.vue';
import mixDetails from '../views/mix-details.vue';
import mixEdit from '../views/mix-edit.vue';
import mixLogin from '../views/mix-login.vue';
import mixSignup from '../views/mix-signup.vue';
import test from '../components/test.vue';
import mixList from '../components/mix-list.cmp.vue';
import test from '../components/test1.vue';

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
    path:'/mix/details/:mixId',
    component:mixDetails
  },
  {
    path:'/mix/edit/:mixId',
    component:mixEdit
  },
  {
    path:'/test',
    component:test
  }
  
]

const router = new VueRouter({
  routes
})

export default router
