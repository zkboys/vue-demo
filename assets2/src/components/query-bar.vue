<template>
    <div class="query-bar">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
    .query-bar {
        padding: 22px 8px 0 8px;
        margin-bottom: 16px;
        background: #f8f8f8;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }
</style>
<script lang="babel">
    export default{
        data() {
            return {
                msg: 'hello vue'
            }
        },
    }
</script>
