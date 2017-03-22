<template>
    <div>
        <h1>Home</h1>
        <p>{{msg}}</p>
        <div class="text" @click="testEmit"></div>
        <router-link to="/hello">hello</router-link>
        <router-link to="/login">login</router-link>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>
