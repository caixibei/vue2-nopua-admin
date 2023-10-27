//!fixed: export 'default' (imported as 'VueRouter') was not found in 'vue-router' 
// import VueRouter from "vue-router"

import { createRouter,createWebHistory } from "vue-router"
import Home from "@/pages/system/Home"
import Login from "@/pages/system/Login"

//!fixed: export 'default' (imported as 'VueRouter') was not found in 'vue-router' 
// Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: Login,
	},
	{
		path: "/home",
		component: Home,
	},
]

//!fixed: export 'default' (imported as 'VueRouter') was not found in 'vue-router' 
// const router = new VueRouter({
//     routes
// });

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router

