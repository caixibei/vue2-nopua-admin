<template>
	<div class="aside">
		<el-aside class="home-aside" :class="{ 'is-collapse': isCollapse }">
			<div class="aside-tbar">
				<div class="tbar-logo" v-if="!isCollapse">
					<svg-icon icon-name="logo" icon-class="logo"></svg-icon>
					<span class="menu-title cls1"
						><h4 class="text-nowrap">NoPua Admin</h4></span
					>
				</div>
				<span class="menu-title cls2">
					<h4 @click="isCollapse = true">
						<i class="el-icon-s-fold" v-if="!isCollapse"></i>
					</h4>
					<h4 @click="isCollapse = false">
						<i class="el-icon-s-unfold" v-if="isCollapse"></i>
					</h4>
				</span>
			</div>
			<div v-if="!isCollapse">
				<el-menu
					unique-opened
					router
					background-color="#303F5B"
					text-color="#fff"
					active-text-color="#ffd04b"
				>
					<el-submenu index="1">
						<template slot="title"
							><i class="el-icon-s-marketing"></i>首页</template
						>
						<el-menu-item index="1-1">首页</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"
							><i class="el-icon-menu"></i>系统管理</template
						>
						<el-menu-item index="2-1">菜单配置</el-menu-item>
						<el-menu-item index="2-2">字典管理</el-menu-item>
						<el-menu-item index="/system/user">用户管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-help"></i>功能</template>
						<el-menu-item index="3-1">开发文档</el-menu-item>
						<el-menu-item index="3-2">SQL监控</el-menu-item>
						<el-menu-item index="3-3">操作日志</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"
							><i class="el-icon-s-shop"></i>外部页面</template
						>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"
							><i class="el-icon-data-line"></i>多级菜单</template
						>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"
							><i class="el-icon-guide"></i>结果页面</template
						>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"
							><i class="el-icon-odometer"></i>列表页</template
						>
					</el-submenu>
					<el-submenu index="8">
						<template slot="title"
							><i class="el-icon-thumb"></i>权限管理</template
						>
					</el-submenu>
					<el-submenu index="9">
						<template slot="title"
							><i class="el-icon-collection"></i>标签页操作</template
						>
					</el-submenu>
					<el-submenu index="10">
						<template slot="title"
							><i class="el-icon-c-scale-to-original"></i>表单设计器</template
						>
					</el-submenu>
				</el-menu>
			</div>
		</el-aside>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isCollapse: false,
		};
	},
};
</script>

<style scoped>
.home-aside {
	background: #303f5b;
	transition: all 800ms;
	height: 100%;
}
.tbar-logo {
	display: flex;
	justify-content: center;
	margin-left: auto;
}

.aside-tbar {
	padding: 10px 10px;
	display: flex;
	justify-content: center;
	gap: 3px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: rgba(255, 255, 255, 0.3);
}

.svg-icon-logo {
	width: 20%;
}

.menu-title {
	color: #fff;
}

.menu-title.cls2 {
	margin-left: auto;
	cursor: pointer;
}

.text-nowrap {
	white-space: nowrap;
	text-overflow: ellipsis;
}

.is-collapse {
	width: 2vw !important;
	transition: all 800ms;
}


</style>
