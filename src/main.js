import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import SideBar from './components/sidebar';
import Header from './components/header';

// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    router,
    components: {
        sideBar: SideBar,
        headerBar: Header,
    },
    template: `
        <div id="app">
            <header-bar></header-bar>
            <side-bar></side-bar>
            <router-view class="view"></router-view>
        </div>
    `,
}).$mount('#app');
