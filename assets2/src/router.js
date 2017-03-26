import Vue from 'vue';
import VueRouter from 'vue-router';
import Error404 from './components/error404';
import routes from './all-routes';

Vue.use(VueRouter);

// 前端路由最终未捕获的，显示404页面
routes.push({path: '**', component: Error404});
const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    // console.log(to, from);
    // TODO 页面判断，是否有权限进入、跳转到登录页面等等
    next();
});

router.afterEach(route => {
    // 这个nextTick解决第一次进入页面，$on('router.afterEach')尚未执行的问题
    Vue.nextTick(() => {
        (new Vue()).$eventBus.$emit('router.afterEach', route);
    });
});

export default router;
