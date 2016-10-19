const Hello = resolve => require(['./components/hello'], resolve);
const Home = resolve => require(['./components/home'], resolve);
// const Login = resolve => require(['./components/login'], resolve);
const Login = (resolve) => {
    // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
    // （代码分块）
    // 请求开始之前代码写到这里 console.log('start');
    require.ensure([], () => {
        // 请求结束之后的代码写到这里 console.log('end');
        resolve(require('./components/login'));
    });
};

export default [
    {path: '/', component: Home},
    {path: '/hello', component: Hello},
    {path: '/login', component: Login},
];
