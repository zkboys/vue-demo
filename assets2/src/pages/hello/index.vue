<template>
    <div class="hello">
        <img src="./logo.png">
        <div>{{pendingMessage}}</div>
        <h2>hello.message from state: {{ hello.message }}</h2>
        <h2>Essential Links</h2>
        <button @click="changeMessage(0)">改变信息11</button>
        <button @click="changeMessage(1)">改变信息22</button>
        <button @click="showADiv">显示一个动态添加的div</button>
        <div style="width: 3000px; height: 200px; background: red;"></div>
        <ul>
            <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
            <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
            <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
            <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
            <br>
            <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
            <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
            <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
        </ul>
    </div>
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>