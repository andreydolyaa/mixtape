import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import './styles/styles.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueYoutube from 'vue-youtube';
import VueCarousel from 'vue-carousel';

Vue.use(VueYoutube);
Vue.use(ElementUI);


var bus = new Vue()
export const eventBus = bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

