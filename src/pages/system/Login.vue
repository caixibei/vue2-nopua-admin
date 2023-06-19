<template>
	<div id="login_app" ref="data-theme">
		<!-- 主题切换 -->
		<el-switch
			class="switchTheme"
			v-model="dataTheme"
			active-value="dark"
			inactive-value="light"
			inactive-icon-class="el-icon-sunny"
			active-icon-class="el-icon-moon-night"
			@change="themeChange"
		></el-switch>
		<!-- 国际化按钮 -->
		<el-dropdown
			trigger="click"
			class="translate-dropdown"
			@command="translateCommand"
		>
			<!-- ! 说明：这里必须使用span包裹下 svg 图标，因为 dropdown渲染时候会 给里面的元素添加 className -->
			<!-- ! 但是svg的图标元素不允许class属性（只读），所以会造成控制台报错 -->
			<span>
				<svg-icon icon-name="translate" icon-class="translate"></svg-icon>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item
					command="zh-CN"
					:icon="translateCheckIcon('zh-CN')"
					:class="{ 'dropdown-item': dropdownActive }"
					>简体中文</el-dropdown-item
				>
				<el-dropdown-item
					command="en-US"
					:icon="translateCheckIcon('en-US')"
					:class="{ 'dropdown-item': !dropdownActive }"
					>English</el-dropdown-item
				>
			</el-dropdown-menu>
		</el-dropdown>
		<!-- 登录表单左侧的大头 -->
		<div>
			<svg-icon icon-name="login_dh" icon-class="login_dh"></svg-icon>
		</div>
		<!-- 登录表单 -->
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
						@click="throttleLogin"
						>{{ $t('lang.login_btn_text') }}</el-button
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
import _ from "loadsh";
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
			// 主题色
			dataTheme: "light",
			// 验证码
			validate_code: "",
			// 国际化选择
			translateData: this.$i18n.locale,
			dropdownActive: true,
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
		this.$refs["data-theme"].setAttribute("data-theme", this.dataTheme);
		this.notice();
	},
	methods: {
		/**
		 * 国际化语言切换
		 */
		translateCommand: function (command) {
			this.translateData = command;
			this.dropdownActive = command == "zh-CN";
			this.$i18n.locale = command;
		},
		/**
		 * 国际化按钮选项的图标
		 */
		translateCheckIcon: function (command) {
			return this.translateData === command ? "el-icon-check" : "el-icon-none";
		},
		/**
		 * 主题色变更
		 */
		themeChange: function () {
			this.$refs["data-theme"].setAttribute("data-theme", this.dataTheme);
		},
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
		/**
		 * 登录限流
		 */
		throttleLogin: _.throttle(
			function () {
				this.login("loginForm");
			},
			3000,
			{
				leading: true,
				trailing: false,
			}
		),
		/**
		 * 无服务接入
		 */
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
/* 深色主题 */
#login_app[data-theme="dark"] {
	--text-color: #999;
	--linear-text-color: #555;
	--linear-color: #555;
	--bg-color: #121212;
	--btn-border-color: #393a3c;
	--btn-color: #999;
	--btn-hover-color: #409eff;
	--btn-hover-bg-color: #060f19;
	--btn-hover-border-color: #204f7f;
	--translate-border-color: #2e2e2e;
}
/* 浅色主题 */
#login_app[data-theme="light"] {
	--text-color: #999;
	--linear-color: rgba(0, 0, 0, 0.3);
	--linear-text-color: rgba(0, 0, 0, 0.3);
	--bg-color: #fff;
	--btn-border-color: #999;
	--btn-color: #999;
	--btn-hover-color: #409eff;
	--btn-hover-bg-color: #c5e1ff;
	--btn-hover-border-color: #9fceff;
	--translate-border-color: #3a3a3a;
}

#login_app {
	background: url("../../assets/img/login_bg.png") no-repeat;
	background-size: cover;
	width: 100vw;
	background-color: var(--bg-color);
	color: var(--text-color);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15%;
}

.switchTheme {
	position: fixed;
	right: 3%;
	top: 2%;
}

.login_form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: -10%;
	position: relative;
	background-color: var(--bg-color);
	color: var(--text-color);
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
	color: var(--text-color);
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
	background-color: var(--bg-color);
	border: 1px solid var(--btn-border-color);
	color: var(--btn-color);
}

.login_way_btns button:hover {
	color: var(--btn-hover-color);
	background-color: var(--btn-hover-bg-color);
	border: 1px solid var(--btn-hover-border-color);
}

.login_way_btns .el-button + .el-button {
	margin-left: 5%;
}
.login_form .el-form-item {
	margin-bottom: 18px;
}
.linear_line .el-divider__text {
	font-size: 12px;
	background-color: var(--bg-color);
	color: var(--linear-text-color);
}
.login_form:deep(.el-divider) {
	background-color: var(--linear-color);
	margin: 12px 0;
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

.svg-icon-translate {
	width: 30px;
	position: fixed;
	top: 2%;
	right: 1%;
	cursor: pointer;
}

.translate-dropdown {
	position: fixed;
	top: 4%;
	right: 1.7%;
}

.login_form:deep(.el-input-group__append) {
	padding: 0;
	cursor: pointer;
}

.login_form:deep(.el-icon-circle-check) {
	color: #409eff;
}

.el-dropdown-menu {
	padding: 0;
}

.el-dropdown-menu__item:not(.is-disabled):hover {
	color: #409eff;
}

.dropdown-item {
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

	.switchTheme {
		right: 14%;
	}
	.translate-dropdown {
		right: 7%;
	}

	.svg-icon-translate {
		right: 4%;
	}
}
</style>
