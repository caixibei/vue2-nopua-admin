<template>
	<div>
		<el-dialog
			:title="title"
			:visible="visible"
			:width="width"
			:close-on-click-modal="false"
			:destroy-on-close="true"
			ref="dictDialog"
			@close="closeDialog"
		>
			<!-- 筛选条件 -->
			<el-form
				size="small"
				:inline="true"
				:model="queryForm"
				class="pua-dict-form"
			>
				<el-form-item>
					<el-button type="primary" @click="add" :disabled="!editable"
						>新增</el-button
					>
					<el-button type="danger" @click="del" :disabled="!editable"
						>删除</el-button
					>
					<el-button type="warning" @click="edit" :disabled="!editable"
						>编辑</el-button
					>
					<el-button type="primary" @click="query">刷新</el-button>
				</el-form-item>
			</el-form>

			<!-- 表格组件 -->
			<pua-table
				:columns="columns"
				height="43vh"
				:loading="tableLoading"
				:data="tableData"
				:start="queryForm.start"
				:limit="queryForm.limit"
				:total="total"
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
			>
			</pua-table>
		</el-dialog>

		<form-dialog
			:visible="formDialog2Visiable"
			:title="formDialog2Title"
			formType="02"
			@update:visiable="
				(val) => {
					formDialog2Visiable = val;
				}
			"
		></form-dialog>
	</div>
</template>

<script>
import { queryDicts } from "@/api/index";
import PuaTable from "../PuaTable.vue";
import FormDialog from "./FormDialog.vue";
export default {
	components: { PuaTable, FormDialog },
	props: {
		title: {
			type: String,
			required: true,
		},
		visible: {
			type: Boolean,
			required: true,
		},
		editable: {
			type: Boolean,
			required: false,
			default: false,
		},
		width: {
			type: [String, Number],
			required: false,
			default: "50%",
		},
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
			queryForm: {
				code: "",
				type: "02",
				start: 1,
				limit: 20,
			},
			columns: [
				{
					prop: "name",
					label: "名称",
					minWidth: 120,
				},
				{
					prop: "code",
					label: "编码",
					minWidth: 120,
				},
				{
					prop: "list_order",
					label: "顺序",
					minWidth: 80,
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
			tableLoading: false,
			tableData: [],
			total: 0,
			formDialog2Title: "字典项新增",
			formDialog2Visiable: false,
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		closeDialog() {
			this.$emit("update:visiable", false);
		},
		query() {
			this.tableLoading = true;
			queryDicts(this.queryForm).then(({ data: res }) => {
				this.tableData = res.data.records;
				this.total = res.data.total;
				this.tableLoading = false;
			});
		},
		del() {},
		edit() {
			this.formDialog2Title = '字典项修改'
			this.formDialog2Visiable = true;
		},
		add() {
			this.formDialog2Visiable = true;
		},
	},
};
</script>

<style scoped>
::v-deep .el-dialog__header {
	background-color: #303f5b;
	padding: 15px 15px 15px;
}

::v-deep .el-dialog__body {
	padding: 10px 15px;
	height: 50vh;
}

::v-deep .el-dialog__title,
::v-deep .el-icon-close:before {
	color: #fff !important;
}
</style>
