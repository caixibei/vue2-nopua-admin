import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import '@/icons'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueI18n);

//! 国际化配置
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': require('./lang/zh-CN'),
    'en-US': require('./lang/en-US')
  }
});

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app');
