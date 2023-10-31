<template>
    <div>
        {{property}}
    </div>
</template>

<script>
import {testAxios} from '@/api'
export default {
    data() {
        return {
            property: 'hello world!',
        };
    },
    mounted() {
        testAxios()
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