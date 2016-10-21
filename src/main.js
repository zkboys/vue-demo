import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './all-routes';
import store from './store';

// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    router,
    store,
    template: `
        <div id="main-frame">
            <router-view class="main-view"></router-view>
        </div>
    `,
}).$mount('#app');
