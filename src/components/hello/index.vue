<template>
    <div class="hello">
        <img src="./logo.png">
        <h2>hello.message from state: {{ hello.message }}</h2>
        <h2>message from getters: {{message}}</h2>
        <h2>{{helloMessage.message}}</h2>
        <h2>{{good}}</h2>
        <h2>Essential Links</h2>
        <button @click="changeHelloMessage(0)">改变信息11</button>
        <button @click="changeHelloMessage(1)">改变信息22</button>
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