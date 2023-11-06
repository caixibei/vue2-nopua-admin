<template>
	<div id="user">
		<el-form :inline="true" :model="queryForm" class="pua-user-form">
			<el-form-item label="姓名" size="small">
				<el-input
					v-model="queryForm.username"
					size="small"
					placeholder="请输入姓名..."
				></el-input>
			</el-form-item>
			<el-form-item size="small">
				<el-button type="primary" size="small" @click="query">查询</el-button>
			</el-form-item>
		</el-form>
		<pua-table
			:loading="tableLoading"
			:data="tableData"
			:columns="columns"
			:total="total"
			:height="clientHeight - 161 + 'px'"
			@limitChange="
				(val) => {
					queryForm.limit = val;
				}
			"
			@startChange="
				(val) => {
					queryForm.start = val;
				}
			"
			:start="queryForm.start"
			:limit="queryForm.limit"
		>
			<template slot="enabled" slot-scope="{ scope }">
				{{ scope.enabled ? "是" : "否" }}
			</template>
			<template slot="accountNonExpired" slot-scope="{ scope }">
				{{ scope.accountNonExpired ? "是" : "否" }}
			</template>
			<template slot="accountNonLocked" slot-scope="{ scope }">
				{{ scope.accountNonLocked ? "是" : "否" }}
			</template>
			<template slot="credentialsNonExpired" slot-scope="{ scope }">
				{{ scope.credentialsNonExpired ? "是" : "否" }}
			</template>
		</pua-table>
	</div>
</template>

<script>
import PuaTable from "@/components/PuaTable.vue";
import { queryUsers } from "@/api/index";
export default {
	components: {
		PuaTable,
	},
	watch: {
		"queryForm.start": {
			handler(val) {
				this.queryForm.limit = val;
				this.query();
			},
			deep: true,
			immediate: true,
		},
		"queryForm.limit": {
			handler(val) {
				this.queryForm.limit = val;
				this.query();
			},
			deep: true,
			immediate: true,
		},
	},
	data() {
		return {
			clientHeight: 0,
			total: 0,
			queryForm: {
				username: "",
				start: 1,
				limit: 20,
			},
			tableLoading: false,
			tableData: [],
			columns: [
				{
					prop: "id",
					label: "编码",
					minWidth: 240,
				},
				{
					prop: "username",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账户",
					minWidth: 140,
				},
				{
					prop: "password",
					label: "密码",
					minWidth: 120,
				},
				{
					prop: "accountNonExpired",
					label: "账号未过期",
					minWidth: 120,
					slot: true,
				},
				{
					prop: "accountNonLocked",
					label: "账号未锁定",
					minWidth: 120,
					slot: true,
				},
				{
					prop: "credentialsNonExpired",
					label: "认证未过期",
					minWidth: 120,
					slot: true,
				},
				{
					prop: "enabled",
					label: "状态",
					minWidth: 120,
					slot: true,
				},
				{
					prop: "create_time",
					label: "创建时间",
					minWidth: 120,
				},
				{
					prop: "update_time",
					label: "变更时间",
					minWidth: 120,
				},
			],
		};
	},
	mounted() {
		this.getClientHeight();
		this.query();
	},
	methods: {
		getClientHeight() {
			this.clientHeight = document.body.clientHeight;
			window.addEventListener("resize", () => {
				this.clientHeight = document.body.clientHeight;
			});
		},
		query() {
			this.tableLoading = true;
			queryUsers(this.queryForm).then(({ data: res }) => {
				this.tableData = res.data.records;
				this.total = res.data.total;
				this.tableLoading = false;
			});
		},
	},
};
</script>

<style scoped>
.el-form-item {
	margin-bottom: 10px;
}
.pua-user-form {
	padding: 0 10px;
}
</style>
