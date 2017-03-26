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
function getComponentString(componentPath) {
    return "component: (resolve) => { "
        + "require.ensure([], () => { "
        + "resolve(require('" + componentPath + "'));"
        + " });"
        + " },";
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