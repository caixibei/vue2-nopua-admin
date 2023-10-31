import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

const req = require.context('@/assets/icons', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req);

// ! 3种写法都是注册全局组件
// 第一种
Vue.component('svg-icon', SvgIcon)

// 第二种
// Vue.use(SvgIcon)

// 第三种
// export default{
//     install (Vue,options){
//         Vue.component('svg-icon', SvgIcon);
//         console.info(options,'options');
//     }
// }
