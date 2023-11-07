<template>
	<div id="pua-table">
		<el-table
			:data="data"
			stripe
			v-loading="loading"
			border
			:height="height"
			show-header
			size="small"
			header-cell-class-name="pua-table-header"
		>
			<el-table-column type="selection" width="39"></el-table-column>
			<template v-for="(item, index) in columns">
				<el-table-column
					:key="item.prop + index"
					show-overflow-tooltip
					:prop="item.prop"
					:label="item.label"
					:min-width="item.minWidth"
					:width="item.width"
					align="center"
					v-if="item.slot"
				>
					<template slot-scope="scope">
						<slot :name="item.prop" :scope="{ ...scope.row }"> </slot>
					</template>
				</el-table-column>
				<el-table-column
					:key="item.prop + index"
					show-overflow-tooltip
					:prop="item.prop"
					:label="item.label"
					:min-width="item.minWidth"
					:width="item.width"
					align="center"
					v-else
				>
				</el-table-column>
			</template>
		</el-table>
		<div class="pua-pagination">
			<el-pagination
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@current-change="currentChange"
				@size-change="sizeChange"
				:current-page="start"
				:page-sizes="[10, 20, 50, 100, 500]"
				:page-size="limit"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		loading: Boolean,
		data: {
			type: Array,
			required: true,
		},
		height: [String, Number],
		columns: {
			type: Array,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		start: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
	},
	methods: {
		currentChange(val) {
			this.$emit("startChange", val);
		},
		sizeChange(val) {
			this.$emit("limitChange", val);
		},
	},
};
</script>

<style scoped>
::v-deep .el-table--border {
	border-radius: 3px;
}
::v-deep .pua-table-header {
	background-color: rgb(214, 214, 214) !important;
	color: rgb(112, 112, 112);
}
::v-deep .pua-pagination {
	display: flex;
	justify-content: flex-end;
	padding: 5px 0;
}
</style>
