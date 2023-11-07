import Vue from "vue"
import VueRouter from "vue-router"
import Layout from '../layout/Layout.vue'

Vue.use(VueRouter)
const routes = [
	{
		path: "/",
		component: () => import('@/pages/system/Login.vue'),
		name: 'login',
		hidden: true
	},
	{
		path: "/layout",
		component: Layout,
		name: 'layout',
	},
	{
		path: "/system",
		component: Layout,
		redirect: '/system',
		name: 'login',
		meta: {
			title: '系统管理',
			icon: 'system',
			roles: []
		},
		children: [{
			path: '/system/user',
			component: () => import('@/pages/system/User.vue'),
			name: 'user',
			meta: {
				title: '用户管理',
				roles: ['']
			}
		},{
			path: '/system/dict',
			component: () => import('@/pages/system/Dict.vue'),
			name: 'dict',
			meta: {
				title: '字典管理',
				roles: ['']
			}
		}]
	},
	{
		path: "*",
		component: Layout,
		redirect: '/error',
		name: 'error',
		children: [{
			path: '*',
			component: () => import('@/pages/error/404.vue'),
			name: '404',
			meta: {
				title: '404'
			}
		}],
		hidden:true
	},
]

const router = new VueRouter({
	routes
})

export default router

