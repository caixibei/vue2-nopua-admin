<template>
	<div id="home">
		<el-container class="home-body">
			<pua-aside></pua-aside>
			<el-container class="layout-body">
				<pua-header></pua-header>
				<pua-main></pua-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon.vue";
import { puaAside, puaMain, puaHeader } from "./components";
export default {
	data() {
		return {
			username: "蔡*贝",
			isCollapse: false,
		};
	},
	components: {
		SvgIcon,
		puaAside,
		puaMain,
		puaHeader,
	},
	mounted() {},
	methods: {},
};
</script>

<style scoped>
div {
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
#home {
	height: 100vh;
	width: 100vw;
}
.home-body {
	height: 100vh;
	width: 100vw;
}

.layout-body {
	display: flex;
	flex-direction: column;
}
</style>
