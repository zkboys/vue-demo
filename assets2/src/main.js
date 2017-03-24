import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store';
import 'normalize.css';
import './main.less';
import FrameHead from './components/frame-head/index.vue';
import Navigation from './components/navigation/script.jsx';
import router from './router';

Vue.use(ElementUI);
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components


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
        FrameHead,
        Navigation,
    },
    template: `
        <div id="main-frame">
            <FrameHead></FrameHead>
            <Navigation></Navigation>
            <section id="page-container">
                <router-view class="main-view"></router-view>
            </section>
        </div>
    `,
    created() {
        this.$store.dispatch('syncStateFromLocalStorage');
        this.$eventBus.$on('router.afterEach', (route) => {
            const path = route.path;
            this.$store.dispatch('setActiveSystemMenu', path);
        });
    },
}).$mount('#app');
