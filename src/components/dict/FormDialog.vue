<template>
	<el-dialog
		:title="title"
		:visible="visible"
		:width="width"
		:close-on-click-modal="false"
		:destroy-on-close="true"
		ref="formDialog"
		@close="closeDialog"
	>
		<el-form
			label-position="right"
			:rules="rules"
			label-width="80px"
			:model="form"
			ref="dictForm"
		>
			<el-form-item label="类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择" disabled>
					<el-option
						v-for="item in typeOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="编码" prop="code">
				<el-input v-model="form.code"></el-input>
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="顺序" prop="list_order">
				<el-input type="number" v-model="form.list_order"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="closeDialog">取 消</el-button>
			<el-button type="primary" @click="insertSingleDict">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { insertSingleDict } from '@/api';
const rules = {
	type: [{ required: true, message: "请选择类型", trigger: "change" }],
	code: [{ required: true, message: "请输入字典编码", trigger: "blur" }],
	name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
	list_order: [{ required: true, message: "请输入顺序", trigger: "blur" }],
};
const typeOptions = [
	{
		label: "",
		value: "",
	},
	{
		label: "字典组",
		value: "01",
	},
	{
		label: "字典项",
		value: "02",
	},
];
export default {
	props: {
		title: {
			type: String,
			required: false,
			default: "新增",
		},
		visible: {
			type: Boolean,
			required: false,
			default: false,
		},
		width: {
			type: [String, Number],
			required: false,
			default: "30%",
		},
		formType: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			form: {
				type: "",
				name: "",
				code: "",
				list_order: "",
			},
			rules: rules,
			typeOptions: typeOptions,
		};
	},
	mounted() {
		this.form.type = this.formType;
	},
	methods: {
		closeDialog() {
			this.$emit("update:visiable", false);
		},
		insertSingleDict() {
			this.$refs['dictForm'].validate((valid) => {
				if (valid) {
					insertSingleDict(this.form).then((res)=>{
						console.log(res,'res');
					})
				} else {
					return false;
				}
			});
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
	padding: 5vh 3vw !important;
	height: 20vh !important;
}

::v-deep .el-dialog__title,
::v-deep .el-icon-close:before {
	color: #fff !important;
}

::v-deep .el-select {
	width: 100%;
}
</style>
