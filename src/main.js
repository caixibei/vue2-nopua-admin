import Vue from 'vue'
import App from './App.vue'


import '@/icons'  
import router from './router'
import i18n from './i18n'
import '@/axios'
import '@/element'

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
