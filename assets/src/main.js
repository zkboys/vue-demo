import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import routes from './all-routes';
import store from './store';

Vue.use(MintUI);

// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
});

// 全局eventBus，类似发布订阅，实现跨组件通信，实例中使用方法如下：
// https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
// this.$eventBus.$emit('id-selected', 1);
// this.$eventBus.$on('id-selected', id => console.log(id));
Vue.prototype.$eventBus = new Vue(); // 直接扩展

new Vue({
    router,
    store,
    template: `
        <div id="main-frame">
            <router-view class="main-view"></router-view>
        </div>
    `,
    created() {
        this.$store.dispatch('syncStateFromLocalStorage');
    },
}).$mount('#app');
