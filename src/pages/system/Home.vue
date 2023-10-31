<template>
    <div>
        {{property}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            property: 'hello world!',
        };
    },
    mounted() {
        
    },
    methods: {
        test:function(){
            this.$hhtp()
        }
    },
}
</script>

<style scoped>

</style>