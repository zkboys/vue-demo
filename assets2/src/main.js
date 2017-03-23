import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './all-routes';
import store from './store';
import 'normalize.css';
import './main.less';
import Pagehead from './components/page-head/index.vue';
import Pagenav from './components/page-nav/index.vue';
import Error404 from './pages/error404';


Vue.use(ElementUI);
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

// 前端路由最终未捕获的，显示404页面
routes.push({path: '**', component: Error404});
const router = new VueRouter({
    mode: 'history',
    routes,
});

NProgress.configure({showSpinner: false});

// 全局eventBus，类似发布订阅，实现跨组件通信，实例中使用方法如下：
// https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
// this.$eventBus.$emit('id-selected', 1);
// this.$eventBus.$on('id-selected', id => console.log(id));
Vue.prototype.$eventBus = new Vue(); // 直接扩展

new Vue({
    router,
    store,
    components: {
        'page-head': Pagehead,
        'page-nav': Pagenav,
    },
    template: `
        <div id="main-frame">
            <page-head></page-head>
            <page-nav></page-nav>
            <section id="page-container">
                <router-view class="main-view"></router-view>
            </section>
        </div>
    `,
    created() {
        this.$store.dispatch('syncStateFromLocalStorage');
    },
}).$mount('#app');
