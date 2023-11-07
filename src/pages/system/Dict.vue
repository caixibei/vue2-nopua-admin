<template>
	<div class="pua-dict">
		<!-- 筛选条件 -->
		<el-form
			size="small"
			:inline="true"
			:model="queryForm"
			class="pua-dict-form"
		>
			<el-form-item label="编码">
				<el-input
					v-model="queryForm.code"
					placeholder="请输入字典组编码..."
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="add">新增</el-button>
				<el-button type="danger" @click="del">删除</el-button>
				<el-button type="warning" @click="edit">编辑</el-button>
				<el-button type="primary" @click="query">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格组件 -->
		<pua-table
			:columns="columns"
			:height="clientHeight - 170 + 'px'"
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
			<template slot="operation" slot-scope="{ scope }">
				<div class="dict-column-operation">
					<i class="el-icon-view" @click="viewItems"></i>
					<el-divider direction="vertical"></el-divider>
					<i class="el-icon-edit" @click="editItems"></i>
				</div>
			</template>
		</pua-table>

		<!-- 弹窗组件 -->
		<dict-dialog
			:visible="dictDialogVisiable"
			:title="dictDialogTitle"
			:editable="editable"
			@update:visiable="
				(val) => {
					dictDialogVisiable = val;
				}
			"
		></dict-dialog>
		<form-dialog
			:visible="formDialogVisiable"
			:title="formDialogTitle"
            formType="01"
			@update:visiable="
				(val) => {
					formDialogVisiable = val;
				}
			"
		></form-dialog>
	</div>
</template>

<script>
import PuaTable from "@/components/PuaTable.vue";
import DictDialog from "@/components/dict/TableDialog.vue";
import FormDialog from "@/components/dict/FormDialog.vue";
import { queryDicts } from "@/api/index";
export default {
	components: { PuaTable, DictDialog,FormDialog },
	data() {
		return {
			queryForm: {
				code: "",
				type: "01",
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
					prop: "type",
					label: "类型",
					minWidth: 120,
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
				{
					prop: "operation",
					label: "操作",
					minWidth: 60,
					slot: true,
				},
			],
			tableLoading: false,
			tableData: [],
			total: 0,
			clientHeight: 0,
			dictDialogVisiable: false,
			dictDialogTitle: "字典项维护",
			editable: false,
            formDialogVisiable:false,
            formDialogTitle:'字典组新增',
		};
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
			queryDicts(this.queryForm).then(({ data: res }) => {
				this.tableData = res.data.records;
				this.total = res.data.total;
				this.tableLoading = false;
			});
		},
		del() {

        },
		edit() {
            this.formDialogTitle = '字典组修改'
            this.formDialogVisiable = true
        },
		add() {
            this.formDialogTitle = '字典组新增'
            this.formDialogVisiable = true
        },
		editItems() {
			this.editable = true;
			this.dictDialogTitle = "字典项维护";
			this.dictDialogVisiable = true;
		},
		viewItems() {
			this.dictDialogTitle = "字典项查看";
			this.editable = false;
			this.dictDialogVisiable = true;
		},
	},
};
</script>

<style scoped>
.pua-dict-form {
	padding: 0 10px;
}
.dict-column-operation {
	display: flex;
	gap: 3px;
	justify-content: center;
}

.dict-column-operation i:hover {
	color: #409eff !important;
	cursor: pointer;
}

.dict-column-operation > i:nth-of-type(3) {
	color: #f78787;
}
.dict-column-operation > i:nth-of-type(2) {
	color: #e6a23c;
}
</style>
