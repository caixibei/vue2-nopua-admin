<template>
    <svg :class="getIconClass" aria-hidden="true">
        <use :xlink:href="getIconName"/>
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            required: true
        },
        iconClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        getIconName() {
            return `#icon-${this.iconName}`
        },
        getIconClass() {
            if (this.iconClass) {
                return 'svg-icon ' + this.iconClass
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
    fill: currentColor;
    overflow: hidden;
}
</style>

