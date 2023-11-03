<template>
	<div id="user">
		<el-form :inline="true" :model="queryForm">
			<el-form-item label="姓名" size="small">
				<el-input
					v-model="queryForm.name"
					size="small"
					placeholder="请输入姓名..."
				></el-input>
			</el-form-item>
			<el-form-item size="small">
				<el-button type="primary" size="small" @click="query">查询</el-button>
			</el-form-item>
		</el-form>
		<pua-table
			:data="tableData"
			:columns="columns"
			:total="200"
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
		</pua-table>
	</div>
</template>

<script>
import PuaTable from "@/components/PuaTable.vue";
import {queryUsers} from '@/api/index'
export default {
	components: {
		PuaTable,
	},
	data() {
		return {
			clientHeight: 0,
			queryForm: {
				name: "",
				start: 1,
				limit: 20,
			},
			tableData: new Array(15).fill({
				id: 1,
				name: "蔡熙贝",
				account: "caixibei@139.com",
			}),
			columns: [
				{
					prop: "id",
					label: "ID",
					minWidth: 80,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "id",
					label: "ID",
					minWidth: 80,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "id",
					label: "ID",
					minWidth: 80,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
				{
					prop: "name",
					label: "姓名",
					minWidth: 120,
				},
				{
					prop: "account",
					label: "账号",
					minWidth: 120,
				},
			],
		};
	},
	mounted() {
		this.getClientHeight()
        this.query()
	},
	methods: {
		getClientHeight() {
			this.clientHeight = document.body.clientHeight;
			window.addEventListener("resize", () => {
				this.clientHeight = document.body.clientHeight;
			});
		},
		query() {
            queryUsers().then(res=>{
                console.log(res)
            })
		},
	},
};
</script>

<style scoped>
.el-form-item {
	margin-bottom: 10px;
}
</style>
