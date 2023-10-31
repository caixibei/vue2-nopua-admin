<template>
	<div id="home">
		<el-container class="home-body">
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
							<el-menu-item index="2-3">用户管理</el-menu-item>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title"><i class="el-icon-help"></i>功能</template>
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

			<el-container>
				<el-header class="main-header">
					<div class="user-setting">
						<el-avatar
							class="user-avatar"
							size="small"
							fit="fill"
							src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
						>
							<img src="../../assets/img/avator_error.png" />
						</el-avatar>
						<el-dropdown>
							<span class="user-span">{{ username }}</span>
							<i class="el-icon-setting custom-setting"></i>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									><i class="el-icon-s-custom"></i>详细信息</el-dropdown-item
								>
								<el-dropdown-item
									><i class="el-icon-edit"></i>修改密码</el-dropdown-item
								>
								<el-dropdown-item
									><i class="el-icon-warning"></i>退出登录</el-dropdown-item
								>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</el-header>

				<el-main>
                    <router-view></router-view>
                </el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon.vue";
export default {
	data() {
		return {
			username: "蔡*贝",
			isCollapse: false,
		};
	},
	components: {
		SvgIcon,
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
.home-aside {
	background: #303f5b;
	transition: all 1.8s;
}

.main-header {
	display: flex;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.user-setting {
	display: flex;
	margin-left: auto;
	gap: 8px;
	justify-content: center;
	line-height: 60px;
}

.user-span {
	margin-right: 20px;
}

.user-span:hover {
	cursor: pointer;
	color: #3d73ff;
}

.custom-setting:hover {
	cursor: pointer;
	color: #3d73ff;
}

.user-avatar {
	position: relative;
	inset: 15px 0px;
}

.user-avatar:hover {
	cursor: pointer;
	animation: rotate-avatar 3s linear forwards infinite;
}

.home-body {
	height: 100vh;
	width: 100vw;
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
	transition: all 1.8s;
}

@keyframes rotate-avatar {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
