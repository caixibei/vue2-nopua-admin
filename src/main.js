import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


import '@/icons'
import axios from 'axios'

import router from './router'
import i18n from './i18n'

import App from './App.vue'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(axios)



new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
