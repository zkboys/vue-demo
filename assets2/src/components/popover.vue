<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
    <span v-popover:popover class="popover-wrap">
        <el-popover
                ref="popover"
                :placement="placement"
                :width="width"
                v-model="visible">
            <p class="popover-text"><i class="el-icon-information"/>{{text}}</p>
            <div class="popover-buttons">
                <el-button size="mini" type="text" @click="handleCancel">取消</el-button>
                <el-button type="primary" size="mini" @click="handleOk">确定</el-button>
            </div>
        </el-popover>

        <slot></slot>
    </span>
</template>

<style scoped lang="less">
    @import '../themes/current/variables.less';

    .popover-wrap {
        display: inline-block;
    }

    .popover-text {
        line-height: 1.5;
        i {
            margin-right: 8px;
            color: #58B7FF;
        }
    }

    .popover-buttons {
        text-align: right;
        margin: 0;
    }
</style>

<script lang="babel">

    /*
     * 用法：
     *
     <Popover text="您确定要退出登录吗？" @ok="handleLogout">
     <div class="menu logout">
     退出登录
     </div>
     </Popover>
     *
     * */

    export default {
        name: 'popover',
        props: {
            placement: {
                type: String,
                default: 'bottom'
            },
            width: {
                type: Number,
                default: 160
            },
            text: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                visible: false,
            };
        },
        methods: {
            handleOk() {
                this.visible = false;
                this.$emit('ok')
            },
            handleCancel() {
                this.visible = false;
                this.$emit('cancel')
            }
        },
        mounted() {
        }
    };
</script>
