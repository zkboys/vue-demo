<template>
    <div :class="classStr" v-show="show">
        <slot></slot>
    </div>
</template>
<style lang="less">
    ._pagination_ {
        display: inline-block;
        float: right;
        padding-top: 16px;
    }
</style>
<script lang="babel">
    export default{
        name: 'pagination',
        props: {
            className: {
                type: String,
                default: ''
            },
            show: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                classStr: '',
            }
        },
        created() {
            this.classStr = `_pagination_ ${this.className}`;
        },
    }
</script>
