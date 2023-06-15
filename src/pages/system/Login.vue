<template>
	<div id="login_app">
		<div>
			<svg-icon icon-class="login_dh"></svg-icon>
        </div>
		<div class="login_form">
			<svg>
                <use xlnik:href="#logo"></use>
            </svg>
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
					<div class="linear_line"></div>
				</el-form-item>
				<el-form-item class="other_way_btns">
					
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
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
}
.logo_login {
	height: 100%;
	width: 20%;
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
.linear_line {
	width: 100%;
	height: 0px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	padding-top: 10px;
}
.linear_line::before {
	content: "第三方登录";
	position: absolute;
	color: rgba(0, 0, 0, 0.3);
	transform: translate(170%) translateY(-50%);
	font-size: 12px;
	background-color: #fff;
	padding: 0px 10px 0 10px;
}
.other_way_btns {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
