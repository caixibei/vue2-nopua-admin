import Vue from "vue"
import VueRouter from "vue-router"

//!vue3.0+
//import {createRouter,createWebHistory} from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: ()=>import('@/pages/system/Login.vue')
	},
	{
		path: "/home",
		component: ()=>import('@/pages/system/Home.vue')
	},
]

const router = new VueRouter({
    routes
});

//!vue3.0+
// const router = createRouter({
//     routes,
//     history:createWebHistory()
// })

export default router

