/*
 * 自定义路由loader
 * asyncComponent: './index.vue',
 * ===>
 * component: (resolve) => {
 *      require.ensure([], () => {
 *          resolve(require('./index.vue'));
 *      });
 * },
 * */
// TODO 添加回调处理异步加载页面loading；页面href与页面js对应关系，防止异步请求页面js窜页问题
function getComponentString(componentPath) {
    return "component: (resolve) => {"
        + "require.ensure([], () => {"
        + "resolve(require('" + componentPath + "'));"
        + "});"
        + "},";
}

module.exports = function (source, other) {
    this.cacheable();
    var routesStrTemp = source;
    var patt = /asyncComponent:[ ]*['"]([^'"]+)['"][,]/gm;
    var isRoutes = false;
    var block = null;
    while ((block = patt.exec(source)) !== null) {
        isRoutes = block[0] && block[1];
        if (isRoutes) {
            routesStrTemp = routesStrTemp.replace(block[0], getComponentString(block[1]));
        }
    }
    if (isRoutes) {
        this.callback(null, routesStrTemp, other);
    } else {
        this.callback(null, source, other);
    }
};