import Vue from 'vue'
import App from './App.vue'

import router from './router'
import i18n from './i18n'

import '@/element'
import '@/icons'

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
