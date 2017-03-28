<template>
    <div :class="classStr" v-show="show">
        <slot></slot>
    </div>
</template>
<style lang="less">
    ._operator_ {
        display: inline-block;
    }
</style>
<script lang="babel">
    import {mapState} from 'vuex';
    export default{
        name: 'operator',
        props: {
            className: {
                type: String,
                default: ''
            },
            permissions: {
                type: Array,
                default: () => [],
            },
            permission: {
                type: String,
                required: true,
            }
        },
        computed: mapState({
            allPermissions: state => state.app.permissions,
        }),
        data() {
            return {
                classStr: '',
                show: true,
            }
        },
        created() {
            this.classStr = `_operator_ ${this.className}`;
            let permissions = this.permissions || this.allPermissions || [];
            // FIXME 测试数据
            permissions = ['detail', 'delete', 'edit'];
            this.show = permissions.indexOf(this.permission) > -1;
        },
    }
</script>
