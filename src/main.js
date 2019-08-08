import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/common/styles/index.scss'
import '@/icons'
import VueLazyload from 'vue-lazyload'
import img_loading from '@/assets/loading.png'
Vue.use(VueLazyload, {
  loading: img_loading
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
