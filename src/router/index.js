import Vue from 'vue'
import VueRouter from 'vue-router'
import mixApp from '../views/mix-app.vue';
import mixDetails from '../views/mix-details.vue';
import mixEdit from '../views/mix-edit.vue';
import mixLogin from '../views/mix-login.vue';
import mixSignup from '../views/mix-signup.vue';

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
    path:'/details/:mixId',
    component:mixDetails
  },
  {
    path:'/edit/:mixId',
    component:mixEdit
  }
  
]

const router = new VueRouter({
  routes
})

export default router
