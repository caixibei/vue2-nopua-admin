<template>
	<div id="login_app">
		<div>
			<svg-icon icon-name="login_dh" icon-class="login_dh"></svg-icon>
		</div>
		<div class="login_form">
			<svg-icon icon-name="logo" icon-class="logo"></svg-icon>
			<div class="login_form_title">nopua-admin</div>
			<el-form :model="formData" :rules="formRules" ref="loginForm" status-icon>
				<el-form-item prop="account">
					<el-input
						type="text"
						size="medium"
						clearable
						v-model.trim="formData.account"
						prefix-icon="el-icon-user-solid"
						placeholder="账号"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						size="medium"
						clearable
						show-password
						v-model.trim="formData.password"
						prefix-icon="el-icon-lock"
						placeholder="密码"
					></el-input>
				</el-form-item>
				<el-form-item prop="validateCode">
					<el-input
						type="text"
						size="medium"
						clearable
						v-model.trim="formData.validateCode"
						prefix-icon="el-icon-key"
						maxlength="4"
						placeholder="验证码"
					>
						<template slot="append">
							<code-canvas
								canvas-id="validate_code"
								canvas-width="100"
								canvas-height="32"
								@draw-code="validate_code = $event"
							></code-canvas>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item class="login_forget">
					<el-checkbox v-model="formData.rememberPassword"
						>记住密码</el-checkbox
					>
					<el-link
						type="primary"
						class="forget_link"
						:underline="false"
						@click.native="noserver"
						>忘记密码？</el-link
					>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						size="small"
						class="login_btn"
						@click="login('loginForm')"
						>登录</el-button
					>
				</el-form-item>
				<el-form-item class="login_way_btns">
					<el-button size="small" @click.native="noserver">手机登录</el-button>
					<el-button size="small" @click.native="noserver"
						>二维码登录</el-button
					>
					<el-button size="small" @click.native="noserver">注册</el-button>
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
							@click.native="noserver"
						></svg-icon>
						<svg-icon
							icon-name="alipay_icon"
							icon-class="alipay_icon"
							@click.native="noserver"
						></svg-icon>
						<svg-icon
							icon-name="qq_icon"
							icon-class="qq_icon"
							@click.native="noserver"
						></svg-icon>
						<svg-icon
							icon-name="weibo_icon"
							icon-class="weibo_icon"
							@click.native="noserver"
						></svg-icon>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon.vue";
import CodeCanvas from "@/components/CodeCanvas.vue";
export default {
	components: { SvgIcon, CodeCanvas },
	name: "login-u",
	data() {
		// 账号校验
		const accountValidation = (rule, value, fn) => {
			const emialPattern =
				/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			const qqEmailPattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@qq.com$/;
			if (value === "") {
				fn(new Error("请输入账号"));
			} else if (!emialPattern.test(value)) {
				fn(new Error("账号格式为邮箱格式"));
			} else if (!qqEmailPattern.test(value)) {
				fn(new Error("仅支持QQ邮箱登录"));
			} else {
				fn();
			}
		};
		// 密码校验
		const passwordValidation = (rule, value, fn) => {
			const passwordValidation =
				/^.*(?=.{8,18})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
			if (value === "") {
				fn(new Error("请输入密码"));
			} else if (!passwordValidation.test(value)) {
				fn(new Error("密码格式应为8-18位数字、大小写字母、特殊符号的组合"));
			} else {
				fn();
			}
		};
		return {
			validate_code: "",
			// 表单数据
			formData: {
				account: "nopua@qq.com",
				password: "Abcd123@!",
				validateCode: "",
				rememberPassword: false,
			},
			// 表单规则校验
			formRules: {
				account: [{ validator: accountValidation, trigger: "blur" }],
				password: [{ validator: passwordValidation, trigger: "blur" }],
				validateCode: [
					{ required: true, message: "请输入验证码", trigger: "blur" },
					{ min: 4, max: 4, message: "请输入4位验证码", trigger: "blur" },
				],
			},
		};
	},
	mounted() {
		this.notice();
	},
	methods: {
		/**
		 * 站点通知消息
		 */
		notice: function () {
			const cfgtmp = {
				icon: "https://img1.imgtp.com/2023/06/16/25EpErei.svg",
				body: `源码地址：https://github.com/caixibei/vue2-nopua-admin (前台服务) \t\n https://github.com/caixibei/nopua-server （后台服务）`,
				image: "https://img1.imgtp.com/2023/06/16/TZQohVdJ.svg",
			};
			var permission = window.Notification.permission;
			if (permission != "granted") {
				Notification.requestPermission();
			} else {
				new Notification("温馨提示", cfgtmp);
			}
		},
		/**
		 * 登录事件
		 * @param {string} refName
		 */
		login: function (refName) {
			let _this = this;
			_this.$refs[refName].validate((valid) => {
				if (valid) {
					this.$message({
						message: "服务接口暂未接入，敬请期待！",
						type: "success",
					});
				} else {
					return false;
				}
			});
		},
		noserver: function () {
			this.$message({
				message: "服务接口暂未接入，敬请期待！",
				type: "warning",
			});
		},
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
	margin-bottom: 18px;
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
	cursor: pointer;
}

.login_form:deep(.el-input-group__append) {
	padding: 0;
	cursor: pointer;
}

.login_form:deep(.el-icon-circle-check) {
	color: #409eff;
}

/* 深度选择器（vue3已废弃） */
/* .login_form >>> .el-icon-circle-check{
	color:#409EFF;
}
.login_form /deep/ .el-icon-circle-check{
	color:#409EFF;
} */

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
