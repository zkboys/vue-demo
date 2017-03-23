<template>
    <nav id="nav" ref="nav">
        <div class="nav-inner" ref="navInner" :style="navInnerStyle">
            <el-menu
                    router
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose"
                    theme="dark">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="/">首页</el-menu-item>
                        <el-menu-item index="/hello">hello</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="login">login</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
            </el-menu>
        </div>
    </nav>
</template>

<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>
