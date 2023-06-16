<template>
	<div id="login_app">
		<div>
			<svg-icon icon-name="login_dh" icon-class="login_dh"></svg-icon>
		</div>
		<div class="login_form">
			<svg-icon icon-name="logo" icon-class="logo"></svg-icon>
			<div class="login_form_title">nopua</div>
			<el-form :label-position="labelPosition" :model="formLabelAlign">
				<el-form-item>
					<el-input
						type="text"
						size="medium"
						clearable
						v-model="formLabelAlign.name"
						prefix-icon="el-icon-user-solid"
						placeholder="账号"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						type="password"
						size="medium"
						clearable
						show-password
						v-model="formLabelAlign.name"
						prefix-icon="el-icon-lock"
						placeholder="密码"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						type="text"
						size="medium"
						clearable
						v-model="formLabelAlign.name"
						prefix-icon="el-icon-key"
						placeholder="验证码"
					>
						<template slot="append">3723</template>
					</el-input>
				</el-form-item>
				<el-form-item class="login_forget">
					<el-checkbox v-model="checked">记住密码</el-checkbox>
					<el-link type="primary" class="forget_link" :underline="false"
						>忘记密码？</el-link
					>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" class="login_btn"
						>登录</el-button
					>
				</el-form-item>
				<el-form-item class="login_way_btns">
					<el-button size="small">手机登录</el-button>
					<el-button size="small">二维码登录</el-button>
					<el-button size="small">注册</el-button>
				</el-form-item>
				<el-form-item>
					<el-divider content-position="center" class="linear_line"
						>第三方登录</el-divider
					>
				</el-form-item>
				<el-form-item>
					<div class="other_way_btns">
						<svg-icon
							icon-name="wechat_icon"
							icon-class="wechat_icon"
						></svg-icon>
						<svg-icon
							icon-name="alipay_icon"
							icon-class="alipay_icon"
						></svg-icon>
						<svg-icon icon-name="qq_icon" icon-class="qq_icon"></svg-icon>
						<svg-icon icon-name="weibo_icon" icon-class="weibo_icon"></svg-icon>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon.vue";
export default {
	components: { SvgIcon },
	name: "login-u",
	data() {
		return {
			labelPosition: "left",
			formLabelAlign: {
				name: "",
				region: "",
				type: "",
			},
			checked: false,
		};
	},
};
</script>

<style scoped>
#login_app {
	background: url("../../assets/img/login_bg.png") no-repeat;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15%;
}
.login_form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: -10%;
	position: relative;
	background-color: rgba(255, 255, 255, 1);
	padding: 40px;
	border-radius: 5px;
}
.logo_login {
	height: 100%;
	width: 50%;
}
.logo_login:hover {
	animation: rotateLogo 3s ease-in-out forwards alternate infinite;
}
.login_form_title {
	color: #999;
	font: 700 120% Fira Code, Consolas, Monaco, monospace;
	margin: 15px 0;
	text-transform: uppercase;
	letter-spacing: 0.2vw;
	transform: rotateX(45deg);
}
.login_forget {
	gap: 50%;
	flex-direction: row;
	justify-content: flex-end;
}
.forget_link {
	margin-left: auto;
	float: right;
}
.login_btn {
	width: 100%;
}
.login_way_btns button {
	width: 30%;
}
.login_way_btns .el-button + .el-button {
	margin-left: 5%;
}
.login_form .el-form-item {
	margin-bottom: 10px;
}
.linear_line .el-divider__text {
	color: rgba(0, 0, 0, 0.3);
	font-size: 12px;
	background: rgba(255, 255, 255, 1);
}
.other_way_btns {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10%;
}
.svg-icon-login_dh {
	width: 550px;
}
.svg-icon-logo {
	width: 50%;
}

.svg-icon-wechat_icon,
.svg-icon-weibo_icon,
.svg-icon-qq_icon,
.svg-icon-alipay_icon {
	width: 36px;
	color: #6b7280;
}

.svg-icon-wechat_icon:hover,
.svg-icon-weibo_icon:hover,
.svg-icon-qq_icon:hover,
.svg-icon-alipay_icon:hover {
	color: #60a5fa;
}

/* 适配移动设备-手机端 */
@media (min-width: 320px) and (max-width: 480px) {
	#login_app {
		gap: 0;
	}
	.login_form {
		top: 0;
		padding: 10px;
	}
	.svg-icon-login_dh {
		display: none;
	}
}
</style>
