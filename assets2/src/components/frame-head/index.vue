<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
    <div id="head">
        <div class="head-left">
            <img class="logo" src="./logo.png" alt="logo">
            <h1 class="title"></h1>
        </div>
        <div class="head-right">
            <div class="menu user">
                <Avatar :user="currentUser"/>
                {{currentUser.name}}
            </div>
            <Popover text="您确定要退出登录吗？" @ok="handleLogout">
                <div class="menu logout">
                    退出登录
                </div>
            </Popover>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>
