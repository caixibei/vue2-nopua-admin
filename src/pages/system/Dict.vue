<template>
	<div class="pua-dict">
		<!-- 筛选条件 -->
		<el-form size="small" :inline="true" :model="queryForm" class="pua-dict-form">
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
		</pua-table>
	</div>
</template>

<script>
import PuaTable from "@/components/PuaTable.vue";
import { queryDicts } from "@/api/index";
export default {
	components: { PuaTable },
	data() {
		return {
			queryForm: {
				code: "",
				start: 1,
				limit: 20,
			},
			columns: [
				{
					prop: "id",
					label: "序列",
					minWidth: 120,
				},

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
					prop: "parent_id",
					label: "所属分组",
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
			],
			tableLoading: false,
			tableData: [],
			total: 0,
			clientHeight: 0,
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
            this.tableLoading = true
			queryDicts(this.queryForm).then(({ data:res })=>{
                this.tableData = res.data.records
                this.total = res.data.total
                this.tableLoading = false
            });
		},
        del(){

        },
        edit(){

        },
        add(){

        }
	},
};
</script>

<style scoped>

.pua-dict-form {
	padding: 0 10px;
}
</style>
