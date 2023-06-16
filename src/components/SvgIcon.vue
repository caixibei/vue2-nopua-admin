<template>
    <svg :class="getIconClass" aria-hidden="true" :viewBox="viewBox">
        <use :xlink:href="getIconName" />
    </svg>
</template>

<script>
export default {
	name: "SvgIcon",
	props: {
		iconName: {
			type: String,
			required: true,
		},
		iconClass: {
			type: String,
			default: "",
			required: false,
		},
		viewBox: {
			type: String,
			default: "0,0,1920,1080",
			required: false,
		},
	},
	computed: {
		getIconName() {
			return `#icon-${this.iconName}`;
		},
		getIconClass() {
			if (this.iconClass) {
				return "svg-icon-" + this.iconClass;
			} else {
				return "svg-icon";
			}
		},
	}
};
</script>

<style scoped>
.svg-icon {
	fill: currentColor;
	overflow: hidden;
	width: 100%;
	height: 100%;
    cursor: pointer;
}
</style>
