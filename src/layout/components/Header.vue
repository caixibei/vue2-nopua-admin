<template>
	<div id="header">
		<el-header class="main-header">
			<el-carousel
				class="pua-carousel"
				height="60px"
				indicator-position="none"
				direction="vertical"
				:autoplay="true"
			>
				<el-carousel-item
					v-for="item in 3"
					:key="item"
					:style="
						'background:' +
						' url(' +
						require('@/assets/img/header_gg_0' + item + '.png') +
						')'
					"
					class="pua-carousel-item"
				>
				</el-carousel-item>
			</el-carousel>
			<div class="user-setting">
				<el-avatar
					class="user-avatar"
					size="small"
					fit="fill"
					src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
				>
					<img src="@/assets/img/avator_error.png" />
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
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "蔡*贝",
		};
	},
};
</script>

<style scoped>
.pua-carousel {
	width: 90%;
}

.pua-carousel-item {
	background-size: contain !important;
	background-repeat: no-repeat;
}

.main-header {
	display: flex;
	width: 100%;
	padding: 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.user-setting {
	display: flex;
	margin-left: auto;
	gap: 8px;
	width: 10%;
	justify-content: center;
	line-height: 60px;
}

.user-span {
	margin-right: 20px;
	font-weight: bolder;
	font-family: Fire Code,STSong;
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
	animation: rotate-avatar 1s linear forwards infinite;
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
